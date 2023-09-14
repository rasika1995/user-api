import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as AWS from "aws-sdk";
import pool from "src/core/dbs";
import config from "src/config";

// Configure AWS SES
AWS.config.update({
  accessKeyId: config.aws.ses.accessKeyId,
  secretAccessKey: config.aws.ses.secretAccessKey,
  region: config.aws.ses.region, // Replace with your AWS region
});

const ses = new AWS.SES();

export const userSignUp = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    console.log(existingUser);

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Email address is already registered." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database with isVerifiedEmail set to false
    const newUser = await pool.query(
      "INSERT INTO users(email, password, isVerifiedEmail, createdAt, updatedAt) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [email, hashedPassword, false, new Date(), new Date()],
    );

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.rows[0].id }, config.jwt.secretKey, {
      expiresIn: "24h", // Token expiration time
    });

    // Send a verification email
    const verificationLink = `${config.baseUrl}/verify?token=${token}`;
    const emailParams = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `Verify your Mortru account user email address \nHi ${email}, \nClick the link to verify your email: <a href="${verificationLink}">Verify Email</a>`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Verify your Mortru account user email address",
        },
      },
      Source: config.aws.ses.verifedEmailOrDomain, // Replace with your SES verified email address
    };

    ses.sendEmail(emailParams, (err, data) => {
      if (err) {
        console.error("Error sending verification email:", err);
        return res
          .status(500)
          .json({ error: "Error sending verification email" });
      } else {
        console.log("Verification email sent:", data);
        res.status(200).json({ message: "Verification email sent" });
      }
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default userSignUp;

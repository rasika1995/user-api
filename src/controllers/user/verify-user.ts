import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "src/config";
import pool from "src/core/dbs";

const verifyUser = (req: Request, res: Response) => {
  try {
    console.log(req.query.token);
    const token = `${req.query.token}`;

    const decodedToken = jwt.verify(token, config.jwt.secretKey) as JwtPayload;

    // Update isVerifiedEmail in the database
    pool.query("UPDATE users SET isVerifiedEmail = true WHERE id = $1", [
      decodedToken.userId,
    ]);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default verifyUser;

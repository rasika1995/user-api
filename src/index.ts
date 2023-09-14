import config from "./config";
import express from "express";
import bodyParser from "body-parser";
import pool from "./core/dbs";
import router from "./routes/index";

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(router);

// Check database connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the application on database connection failure
  } else {
    console.log("Connected to the database");
    startServer(); // Start the server after successful database connection
  }
});

// Start the server
function startServer() {
  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

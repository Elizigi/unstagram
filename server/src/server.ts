import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const cookieParser = require("cookie-parser");
export const saltRounds=process.env.SALT ?? 10;
// Create the Express application
const app = express();
const PORT = process.env.PORT ?? 3000;
export const SECRET = process.env.SECRET ?? "dddddddddddddddddddddd";

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PASSWORD = process.env.PASSWORD ?? "";
export const secret = "xxx";
//password From .env file With your local mysql password

// Create MySQL connection pool
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: PASSWORD,
  database: "unstagram",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

import userRoutes from "./routes/user/userRoutes";
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

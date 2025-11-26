import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { Request, Response } from "express";
import { pool, saltRounds } from "../../server";

async function userRegister(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashedPass =await bcrypt.hash(password, saltRounds);
    const [result] = await pool.execute(
      "INSERT INTO users (user_name,user_email,user_password) VALUES (?,?,?)",
      [username, email, hashedPass]
    );

    const insertResult = result as mysql.ResultSetHeader;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: insertResult.insertId,
    });
  } catch (error) {
    console.error("register error", error);
    res.status(500).json({
      success: false,
      message: "Error Registering User",
      error: (error as Error).message,
    });
  }
}

export default userRegister;

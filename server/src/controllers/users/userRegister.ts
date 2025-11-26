import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { Request, Response } from "express";
import { pool, saltRounds } from "../../server";
import { infoValidation } from "../validator/infoValidator";

async function userRegister(req: Request, res: Response) {
  try {
    const { username, email, password, rePassword } = req.body;
    const salt = Number.parseInt(saltRounds as string, 10);
    const invalidUsername = infoValidation.isNameValid(username);
    const invalidEmail = infoValidation.isEmailValid(email);
    const invalidPassword = infoValidation.isPasswordValid(password);
    const invalidRePassword = infoValidation.isRePasswordValid(
      rePassword,
      password
    );

    if (
      invalidUsername ||
      invalidEmail ||
      invalidPassword ||
      invalidRePassword
    ) {
      throw new Error(
        "not valid" +
          invalidUsername +
          invalidEmail +
          invalidPassword +
          invalidRePassword
      );
    }
    const hashedPass = await bcrypt.hash(password, salt);
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

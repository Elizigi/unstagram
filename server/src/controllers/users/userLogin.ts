import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { pool, SECRET } from "../../server";
import { infoValidation } from "../validator/infoValidator";
const jwt = require("jwt-simple");

async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const invalidEmail = infoValidation.isEmailValid(email);
    const invalidPassword = infoValidation.isPasswordValid(password);

    if (invalidEmail || invalidPassword) {
      throw new Error("not valid" + invalidEmail + invalidPassword);
    }
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE user_email=?`,
      [email]
    );
    const users = rows as any[];
    if (users.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.encode({ user_id: user.user_id }, SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ success: true, message: "Login successful", user_id: user.user_id });
  } catch (error) {
    console.error("login error", error);
    res.status(500).json({
      success: false,
      message: "Error Login User",
      error: (error as Error).message,
    });
  }
}

export default userLogin;

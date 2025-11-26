import { NextFunction, Request, Response } from "express";
import { pool, SECRET } from "../../server";
const jwt = require("jwt-simple");

async function userAuth(req: Request, res: Response, Next: NextFunction) {
  try {
    const { user } = req.cookies;
    if (!user) throw new Error("user not logged in ");

    const decoded = jwt.decode(user, SECRET);

    if (!decoded) throw new Error("error decoding user");

    const id = decoded.user_id;
    if (!id) throw new Error("error getting id");
    const [rows] = await pool.execute(`SELECT * FROM users WHERE user_id=?`, [
      id,
    ]);
    const users = rows as any[];
    if (users.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    Next();
  } catch (error) {
    console.error("Auth error", error);
    res.status(500).json({
      success: false,
      message: "Error Authenticating User",
      error: (error as Error).message,
    });
  }
}
export default userAuth;

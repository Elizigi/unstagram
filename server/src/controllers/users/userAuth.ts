import { NextFunction, Request, Response } from "express";
import { pool, SECRET } from "../../server";
const jwt = require("jwt-simple");
declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
  }
}
async function userAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("user not logged in ");

    const decoded = jwt.decode(token, SECRET);

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
    req.userId = decoded.user_id;
    next();
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

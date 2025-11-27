import { NextFunction, Request, Response } from "express";
import { pool, SECRET } from "../../server";
const jwt = require("jwt-simple");

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;
    if (!token) return next(); 

    const decoded = jwt.decode(token, SECRET);
    if (!decoded?.user_id) return next();

    const [rows] = await pool.execute(`SELECT * FROM users WHERE user_id=?`, [
      decoded.user_id,
    ]);
    const users = rows as any[];
    if (users.length === 0) return next();

    req.userId = decoded.user_id;
    next();
  } catch (error) {
    console.error("Optional auth error", error);
    next(); 
  }
}

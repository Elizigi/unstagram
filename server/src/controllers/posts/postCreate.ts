import { Request, Response } from "express";
import { pool } from "../../server";
import mysql from "mysql2/promise";

async function createPost(req: Request, res: Response) {
  try {
    const { postTitle, postDescription, postUrl } = req.body;
    if (!postTitle) {
      throw new Error("Post Title Is Required!");
    }

    const [result] = await pool.execute(
      "INSERT INTO posts(post_title,post_description,post_img_url)VALUES(?,?,?)",
      [postTitle, postDescription, postUrl]
    );
    const insertResult = result as mysql.ResultSetHeader;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: insertResult.insertId,
    });
  } catch (error) {
    console.error("Post error", error);
    res.status(500).json({
      success: false,
      message: "Error Creating Post",
      error: (error as Error).message,
    });
  }
}
export default createPost;

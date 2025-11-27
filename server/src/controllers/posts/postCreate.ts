import { Request, Response } from "express";
import { pool } from "../../server";
import { FieldPacket, ResultSetHeader } from "mysql2/promise";
async function createPost(req: Request, res: Response) {
  try {
    const { userId, postTitle, postDescription, postUrl } = req.body;
    if (!postTitle) {
      throw new Error("Post Title Is Required!");
    }

    const [postResult]: [ResultSetHeader, FieldPacket[]] = await pool.execute(
      "INSERT INTO posts(post_title,post_description,post_img_url,user_id)VALUES(?,?,?,?)",
      [postTitle, postDescription, postUrl, userId]
    );
    const insertResult = postResult.insertId;

    res.status(201).json({
      success: true,
      message: "Post Created successfully",
      userId: insertResult,
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

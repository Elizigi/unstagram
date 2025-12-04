import { Request, Response } from "express";
import { pool } from "../../server";
import { ResultSetHeader, RowDataPacket } from "mysql2";

async function deletePost(req: Request, res: Response) {
  try {
    const { post_id } = req.body;
    const userId = req.userId;
    if (!userId) {
      throw new Error(`no user id: ${userId}`);
    }
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT user_id FROM posts WHERE post_id = ?",
      [post_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "post does not exist",
      });
    }
    if (rows[0].user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: "no access to delete this post",
      });
    }
    await pool.execute<ResultSetHeader>("DELETE FROM posts WHERE post_id = ?", [
      post_id,
    ]);
    res.status(200).json({ success: true, message: "post deleted", post_id });
  } catch (error) {
    console.error("Error Deleting Post", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching posts", error });
  }
}

export default deletePost;

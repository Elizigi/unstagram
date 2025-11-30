import { Request, Response } from "express";
import { pool } from "../../server";
import { ResultSetHeader } from "mysql2";

async function deletePost(req: Request, res: Response) {
  try {
    const { post_id } = req.body;

    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM posts WHERE post_id=?",
      [post_id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`post does not exists post id: ${post_id}`);
    }
    res.status(200).json({ success: true, message: "post deleted", post_id });
  } catch (error) {
    console.error("Error Deleting Post", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching posts", error });
  }
}

export default deletePost;

import { Request, Response } from "express";
import { pool } from "../../server";
import { RowDataPacket } from "mysql2";

async function changeLikeStatus(req: Request, res: Response) {
  try {
    const { postId } = req.body;
    const userId = req.userId;
    const [foundPost] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM post_likes WHERE user_id=? AND post_id=?",
      [userId, postId]
    );
    if (foundPost.length === 0) {
      const likeCreated = await pool.execute<RowDataPacket[]>(
        "INSERT INTO post_likes(user_id,post_id)VALUES(?,?)",
        [userId, postId]
      );
      return res
        .status(201)
        .json({ success: true, message: "liked", post: likeCreated });
    } else {
      const unlikePost = await pool.execute<RowDataPacket[]>(
        "DELETE FROM post_likes WHERE user_id=? AND post_id=?",
        [userId, postId]
      );
      res
        .status(200)
        .json({ success: true, message: "unlike successfully", unlikePost });
    }
  } catch (error) {
    console.error("Error liking post", error);
    return res
      .status(500)
      .json({ success: false, message: "Error liking post", error });
  }
}

export default changeLikeStatus;

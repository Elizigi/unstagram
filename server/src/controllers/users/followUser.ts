import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { pool } from "../../server";

async function followUser(req: Request, res: Response) {
  try {
    const { followed_id } = req.body;
    const userId = req.userId;
    if (!userId) {
      throw new Error(`no user id: ${userId}`);
    }
    const [foundPost] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM user_followers WHERE user_id=? AND follower_id=?",
      [followed_id, userId]
    );
    if (foundPost.length === 0) {
      const likeCreated = await pool.execute<RowDataPacket[]>(
        "INSERT INTO user_followers(user_id,follower_id)VALUES(?,?)",
        [followed_id, userId]
      );
      return res
        .status(201)
        .json({ success: true, message: "liked", post: likeCreated });
    } else {
      const unlikePost = await pool.execute<RowDataPacket[]>(
        "DELETE FROM user_followers WHERE user_id=? AND follower_id=?",
        [followed_id, userId]
      );
      res
        .status(200)
        .json({ success: true, message: "unlike successfully", unlikePost });
    }
  } catch (error) {
    console.error("error following user", error);
    res
      .status(500)
      .json({ success: false, message: "error following user", error });
  }
}

export default followUser;

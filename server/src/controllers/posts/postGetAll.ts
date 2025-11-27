import { Request, Response } from "express";
import { pool } from "../../server";
import { RowDataPacket } from "mysql2";

async function getAllPosts(req: Request, res: Response) {
  try {
    const userId = req.userId;
    if (!userId) {
      const [result] = await pool.execute<RowDataPacket[]>(
        "SELECT * FROM posts"
      );
      const allPosts = result;
      if (allPosts.length === 0) {
        return res
          .status(200)
          .json({ success: true, message: "No posts yet :/", allPosts: [] });
      }
      return res.status(200).json({ success: true, allPosts });
    }
    const [posts] = await pool.execute<RowDataPacket[]>(
      `SELECT 
      p.*,
      COUNT(pl.user_id) AS likes_count,
      SUM(pl.user_id = ?) AS liked_by_me
   FROM posts p
   LEFT JOIN post_likes pl ON p.post_id = pl.post_id
   GROUP BY p.post_id;`,
      [userId]
    );
    if (posts.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No posts yet :/", allPosts: [] });
    }
    return res.status(200).json({ success: true, allPosts: posts });
  } catch (error) {
    console.error("Get Posts Error", error);
    res.status(500).json({
      success: false,
      message: "Error Getting Posts",
      error: (error as Error).message,
    });
  }
}

export default getAllPosts;

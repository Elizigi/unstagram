import { Request, Response } from "express";
import { pool } from "../../server";

async function getAllPosts(req: Request, res: Response) {
  try {
    const [result] = await pool.execute("SELECT * FROM posts");
    const allPosts = result as any[];
    if (allPosts.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No posts yet :/" });
    }
    return res.status(200).json({ success: true, allPosts });
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

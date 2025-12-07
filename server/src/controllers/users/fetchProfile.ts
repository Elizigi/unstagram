import { Request, Response } from "express";
import { pool } from "../../server";
import { RowDataPacket } from "mysql2";
import { ProfileData } from "../../types/types";

export async function fetchProfile(req: Request, res: Response) {
  try {
    const userId = req.params.id;

    if (!userId) throw new Error("user not sent");
    const [rows] = await pool.execute<RowDataPacket[]>(
      `
      SELECT 
        users.user_id,
        users.user_name,
        posts.post_id,
        posts.post_title,
        posts.post_description,
        posts.post_img_url
      FROM users
      LEFT JOIN posts ON users.user_id = posts.user_id
      WHERE users.user_id = ?
      `,
      [userId]
    );

    const profile: ProfileData = {
      user_id: rows[0]?.user_id || null,
      user_name: rows[0]?.user_name || null,
      posts: [],
    };
    if (rows.length > 0) {
      profile.posts = rows
        .filter((r) => r.post_id !== null)
        .map((r) => ({
          post_id: r.post_id,
          post_title: r.post_title,
          post_description: r.post_description,
          post_img_url: r.post_img_url,
        }));
    }

    res.json({ success: true, profile });
  } catch (error) {
    console.error("error following user", error);
    res
      .status(500)
      .json({ success: false, message: "error following user", error });
  }
}

export default fetchProfile;

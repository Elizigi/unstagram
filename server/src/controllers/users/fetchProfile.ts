import { Request, Response } from "express";
import { pool } from "../../server";
import { RowDataPacket } from "mysql2";
import { ProfileData } from "../../types/types";

export async function fetchProfile(req: Request, res: Response) {
  try {
    const viewerId = req.userId;
    const profileId = req.params.id;
    if (!profileId || !viewerId) throw new Error("user not sent");
    const [rows] = await pool.execute<RowDataPacket[]>(
      `
  SELECT 
    u.user_id,
    u.user_name,
    p.post_id,
    p.post_title,
    p.post_description,
    p.post_img_url,
    EXISTS(
      SELECT 1 
      FROM user_followers f 
      WHERE f.user_id = u.user_id AND f.follower_id = ?
    ) AS followed_by_me
  FROM users u
  LEFT JOIN posts p ON u.user_id = p.user_id
  WHERE u.user_id = ?
  `,
      [viewerId, profileId]
    );

    const profile: ProfileData = {
      user_id: rows[0]?.user_id || null,
      user_name: rows[0]?.user_name || null,
      followed_by_me: rows[0]?.followed_by_me === 1,
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

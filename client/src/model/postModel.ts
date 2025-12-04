export interface Post {
  post_id: number;
  post_title: string;
  user_name: string;
  user_id: string;
  is_followed_by_me: string;
  post_description?: string;
  post_img_url?: string;
  likes_count?: number;
  liked_by_me?: number;
}

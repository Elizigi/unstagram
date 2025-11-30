export interface Post {
  post_id: number;
  post_title: string;
  user_name: string;
  post_description?: string;
  post_img_url?: string;
  likes_count?: number;
  liked_by_me?: number;
}

type PostData = {
  post_id: number;
  post_title: string;
  post_description: string;
  post_img_url: string;
};

export type ProfileData = {
  user_id: number | null;
  user_name: string | null;
  followed_by_me: boolean;
  posts: PostData[];
};
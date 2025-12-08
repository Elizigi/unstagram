import styles from "./PostComp.module.scss";
import type { Post } from "../../model/postModel";
import { useGlobal } from "../../hooks/useGlobal";
import LikeButton from "../likeButton/LikeButton";
import type { FC } from "react";
import PostCompMv from "./PostCompMV";
import { currentTabOptions, type CurrentTab } from "../../model/tabModel";

interface PostProps {
  posts: Post[];
  isLogged: boolean;
  currentTab: CurrentTab;
  fetchPosts: () => void;
  fetchFollowed: () => void;

  setPosts: (posts: Post[]) => void;
  setProfileId: (profileId: number) => void;
}
const PostComp: FC<PostProps> = ({
  posts,
  isLogged,
  currentTab,
  setPosts,
  setProfileId,
  fetchPosts,
  fetchFollowed,
}) => {
  const { deletePost, followUser, likePost } = PostCompMv(
    posts,
    currentTab,
    setPosts,
    fetchPosts,
    fetchFollowed
  );
  const { userId } = useGlobal();

  return (
    <div className={styles.postsContainer}>
      {[...posts].reverse().map((post) => (
        <div className={styles.post} key={post.post_id + post.post_title}>
          <div
            className={styles.postCreator}
            onClick={() => setProfileId(Number(post.user_id))}
            role="toolbar"
            onKeyDown={() => {}}
          >
            <div className={styles.fakeImg}></div>

            <h3>{post.user_name}</h3>
            {Number(userId) === Number(post.user_id) ? (
              <button
                className={styles.deleteBtn}
                onClick={() => deletePost(Number(post.post_id))}
              >
                Too Cringe
              </button>
            ) : (
              <button
                className={styles.followBtn}
                onClick={() => followUser(Number(post.user_id))}
              >
                {post.is_followed_by_me ||
                currentTab === currentTabOptions.following
                  ? "unfollow"
                  : "Follow"}
              </button>
            )}
          </div>
          <h2 className={styles.postTitle}>{post.post_title}</h2>
          {post.post_img_url && (
            <img src={post.post_img_url} alt={post.post_title} />
          )}
          <p>{post.post_description}</p>
          {isLogged && (
            <LikeButton
              likes={post.likes_count}
              liked={post.liked_by_me as number}
              likePost={() => likePost(post.post_id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostComp;

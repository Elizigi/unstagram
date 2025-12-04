import type { FC } from "react";
import styles from "./Main.module.scss";
import MainMV from "./MainMV";
import LikeButton from "../components/likeButton/LikeButton";
import { useGlobal } from "../hooks/useGlobal";
interface MainProps {
  isLogged: boolean;
  setIsLoginPage: (isLoginPage: boolean) => void;
}
const Main: FC<MainProps> = ({ isLogged, setIsLoginPage }) => {
  const {
    posts,
    postStatus,
    createPost,
    likePost,
    logOut,
    deletePost,
    followUser,
  } = MainMV();
  const { userId } = useGlobal();
  return (
    <div className={styles.mainContainer}>
      <button onClick={logOut} className={styles.logOutBtn}>
        Logout
      </button>
      <div className={styles.sendPost}>
        {isLogged ? (
          <form onSubmit={(e) => createPost(e)}>
            <div className={styles.textFields}>
              <h3>{postStatus}</h3>
              <input
                required
                type="text"
                name="title"
                placeholder=" whats on your mind"
              />
              <textarea
                name="description"
                placeholder=" expand on it ?"
              ></textarea>
            </div>
            <div className={styles.urlPost}>
              <input type="url" name="url" placeholder=" img url" />
              <button type="submit">POST</button>
            </div>
          </form>
        ) : (
          <div>
            <h2>Login to post</h2>
            <button onClick={() => setIsLoginPage(true)}>Login</button>
          </div>
        )}
      </div>
      <div className={styles.discoverFollow}>
        <button>Discover</button>
        <button>Following</button>
      </div>
      <div className={styles.postsContainer}>
        {[...posts].reverse().map((post) => (
          <div className={styles.post} key={post.post_id + post.post_title}>
            <div className={styles.postCreator}>
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
                  {post.is_followed_by_me ? "unfollow" : "Follow"}
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
    </div>
  );
};

export default Main;

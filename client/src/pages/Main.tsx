import type { FC } from "react";
import styles from "./Main.module.scss";
import MainMV from "./MainMV";
import LikeButton from "../components/likeButton/LikeButton";
interface MainProps {
  isLogged: boolean;
  setIsLoginPage: (isLoginPage: boolean) => void;
}
const Main: FC<MainProps> = ({ isLogged, setIsLoginPage }) => {
  const { posts, postStatus, createPost, likePost, logOut } = MainMV();
  return (
    <div className={styles.mainContainer}>
      <button onClick={logOut}>Logout</button>
      <div className={styles.sendPost}>
        {isLogged ? (
          <form onSubmit={(e) => createPost(e)}>
            <div className={styles.textFields}>
              <h3>{postStatus}</h3>
              <input
                required
                type="text"
                name="title"
                placeholder="whats on your mind"
              />
              <textarea
                name="description"
                placeholder="expand on it ?"
              ></textarea>
            </div>
            <div className={styles.urlPost}>
              <input type="url" name="url" placeholder="img url" />
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
      <div className={styles.postsContainer}>
        {[...posts].reverse().map((post) => (
          <div className={styles.post} key={post.post_id + post.post_title}>
            <div className={styles.postCreator}>
              <h3>{post.user_name}</h3>
              <div className={styles.fakeImg}></div>
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

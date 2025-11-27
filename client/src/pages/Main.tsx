import type { FC } from "react";
import styles from "./Main.module.scss";
import MainMV from "./MainMV";
interface MainProps {
  isLogged: boolean;
  setIsLoginPage: (isLoginPage: boolean) => void;
}
const Main: FC<MainProps> = ({ isLogged, setIsLoginPage }) => {
  const { posts, createPost } = MainMV();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sendPost}>
        {isLogged ? (
          <form onSubmit={(e) => createPost(e)}>
            <div className={styles.textFields}>
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
            <h2 className={styles.postTitle}>{post.post_title}</h2>
            {post.post_img_url && (
              <img src={post.post_img_url} alt={post.post_title} />
            )}
            <p>{post.post_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

import type { FC } from "react";
import styles from "./Main.module.scss";
import MainMV from "./MainMV";
interface MainProps {
  isLogged: boolean;
  setIsLoginPage: (isLoginPage: boolean) => void;
}
const Main: FC<MainProps> = ({ isLogged, setIsLoginPage }) => {
  const { posts } = MainMV();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sendPost}>
        {isLogged ? (
          <form action="">
            <input type="text" />
            <textarea name="" id=""></textarea>
            <input type="url" />
          </form>
        ) : (
          <div>
            <h2>Login to post</h2>
            <button onClick={() => setIsLoginPage(true)}>Login</button>
          </div>
        )}
      </div>
      <div className={styles.postsContainer}>
        {posts.map((post) => (
          <div className={styles.post} key={post.postId + post.postTitle}>
            <h2>{post.postTitle}</h2>
            <img src={post.postUrl} alt={post.postTitle} />
            <p>{post.postDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;

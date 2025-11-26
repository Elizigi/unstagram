import styles from "./Main.module.scss";
import MainMV from "./MainMV";
const Main = () => {
  const { posts } = MainMV();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.sendPost}>
        <form action="">
          <input type="text" />
          <textarea name="" id=""></textarea>
          <input type="url" />
        </form>
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

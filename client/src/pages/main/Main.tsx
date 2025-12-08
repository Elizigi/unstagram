import type { FC } from "react";
import styles from "./Main.module.scss";
import MainMV from "./MainMV";
import { pageTypes, type PageType } from "../../model/pageTypes";
import PostComp from "../../components/post/PostComp";

interface MainProps {
  isLogged: boolean;
  setPage: (page: PageType) => void;
  setProfileId: (profileId: number) => void;
}
const Main: FC<MainProps> = ({ isLogged, setPage, setProfileId }) => {
  const {
    posts,
    postStatus,
    currentTab,
    currentTabOptions,
    fetchPosts,
    fetchFollowed,
    setPosts,
    createPost,
    logOut,
    setCurrentTab,
  } = MainMV(setProfileId);
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
            <button onClick={() => setPage(pageTypes.login)}>Login</button>
          </div>
        )}
      </div>
      <div className={styles.discoverFollow}>
        <button
          className={
            currentTab === currentTabOptions.discover ? styles.selectedBtn : ""
          }
          onClick={() => setCurrentTab(currentTabOptions.discover)}
        >
          Discover
        </button>
        <button
          className={
            currentTab === currentTabOptions.following ? styles.selectedBtn : ""
          }
          onClick={() => setCurrentTab(currentTabOptions.following)}
        >
          Following
        </button>
      </div>
      <PostComp
        posts={posts}
        isLogged={isLogged}
        setPosts={setPosts}
        setProfileId={setProfileId}
        fetchFollowed={fetchFollowed}
        fetchPosts={fetchPosts}
        currentTab={currentTab}
      />
    </div>
  );
};

export default Main;

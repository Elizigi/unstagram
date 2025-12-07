import type { FC } from "react";
import styles from "./UserProfile.module.scss";
import UserProfileMV from "./UserProfileMV";

interface UserProfileProps {
  userId: number;
}
const UserProfile: FC<UserProfileProps> = ({ userId }) => {
  const { profileName,posts } = UserProfileMV(userId);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userCard}>
        <div className={styles.fakeImg}></div> <h2>{profileName}</h2>
        {[...posts].reverse().map((post) => (
          <div className={styles.post} key={post.post_id + post.post_title}>
            <div
              className={styles.postCreator}
              role="toolbar"
              onKeyDown={() => {}}
            >
              <div className={styles.fakeImg}></div>

              <h3>{post.user_name}</h3>
              {Number(userId) === Number(post.user_id) ? (
                <button className={styles.deleteBtn}>Too Cringe</button>
              ) : (
                <button
                  className={styles.followBtn}
                >
                 
                </button>
              )}
            </div>
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

export default UserProfile;

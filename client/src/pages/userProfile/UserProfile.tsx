import styles from "./UserProfile.module.scss";
import UserProfileMV from "./UserProfileMV";

const UserProfile = (userId: number) => {
  const { profileName } = UserProfileMV(userId);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userCard}>
        <div className={styles.fakeImg}></div> <h2>{profileName}</h2>
      </div>
    </div>
  );
};

export default UserProfile;

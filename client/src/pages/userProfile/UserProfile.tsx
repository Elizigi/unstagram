import type { FC } from "react";
import styles from "./UserProfile.module.scss";
import UserProfileMV from "./UserProfileMV";

interface UserProfileProps {
  userId: number;
}
const UserProfile: FC<UserProfileProps> = ({ userId }) => {
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

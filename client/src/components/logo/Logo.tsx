import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <h1 className={styles.logoTitle}>UNSTAGRAM</h1>
    </div>
  );
};

export default Logo;

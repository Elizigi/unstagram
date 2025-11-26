import styles from "./LoginRegisterForm.module.scss";
import LoginRegisterFormMV from "./loginRegisterFormMV";
const LoginRegisterForm = () => {
  const { isRegister, setIsRegister } = LoginRegisterFormMV();
  return (
    <div className={styles.formContainer}>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Login →" : "← Register"}
      </button>
      <form onSubmit={() => {}} className={styles.regForm}>
        {isRegister && (
          <input type="text" name="username" placeholder="username" />
        )}
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        {isRegister && (
          <input type="password" name="password" placeholder="password" />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginRegisterForm;

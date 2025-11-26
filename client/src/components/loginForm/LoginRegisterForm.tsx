import type { FC } from "react";
import styles from "./LoginRegisterForm.module.scss";
import LoginRegisterFormMV from "./LoginRegisterFormMV";
interface LoginRegProps {
  setIsLogged: (isLogged: boolean) => void;
  setIsLoginPage: (isLoginPage: boolean) => void;
}
const LoginRegisterForm: FC<LoginRegProps> = ({ setIsLogged,setIsLoginPage }) => {
  const { isRegister, setIsRegister, error, checkForm } =
    LoginRegisterFormMV(setIsLogged,setIsLoginPage);
  return (
    <div className={styles.formContainer}>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Login →" : "← Register"}
      </button>
      <form onSubmit={(e) => checkForm(e)} className={styles.regForm}>
        {isRegister && (
          <input required type="text" name="username" placeholder="username" />
        )}
        <input required type="email" name="email" placeholder="email" />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
        />
        {isRegister && (
          <input
            required
            type="password"
            name="rePassword"
            placeholder="rePassword"
          />
        )}
        <h2>{error}</h2>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginRegisterForm;

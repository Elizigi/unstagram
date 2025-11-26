import { useState } from "react";
import { infoValidation } from "../../validation/formValidator";

const LoginRegisterFormMV = (setIsLogged: (isLogged: boolean) => void) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const checkLogin = (email: string, password: string) => {
    const invalidEmail = infoValidation.isEmailValid(email);
    const invalidPassword = infoValidation.isPasswordValid(password);
    return invalidEmail + invalidPassword;
  };
  const checkRegister = (
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) => {
    const invalidUsername = infoValidation.isNameValid(username);
    const invalidEmail = infoValidation.isEmailValid(email);
    const invalidPassword = infoValidation.isPasswordValid(password);
    const invalidRePassword = infoValidation.isRePasswordValid(
      rePassword,
      password
    );
    return invalidUsername + invalidEmail + invalidPassword + invalidRePassword;
  };

  const checkForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const rePassword = data.get("rePassword") as string;
    const invalidInput = isRegister
      ? checkRegister(username, email, password, rePassword)
      : checkLogin(email, password);
    if (invalidInput) {
      setError("not valid" + invalidInput);
      return;
    }
    sendReq(username, email, password, rePassword);
  };

  const sendReq = async (
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) => {
    try {
      const endpoint = isRegister ? "register" : "login";
      const response = await fetch(
        `http://localhost:3000/api/users/user-${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ username, email, password, rePassword }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error("Error:", data.message);
      }
      console.log(data);
      if (isRegister) {
        setIsRegister(false);
        return;
      }
      setIsLogged(true);
    } catch (error) {
      console.error("Error:", error);
      setError(String(error));
    }
  };
  return { isRegister, setIsRegister, error, checkForm };
};

export default LoginRegisterFormMV;

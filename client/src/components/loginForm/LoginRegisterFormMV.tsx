import { useState } from "react";
import { infoValidation } from "../../validation/formValidator";
import { useGlobal } from "../../hooks/useGlobal";
import { pageTypes, type PageType } from "../../model/pageTypes";

const LoginRegisterFormMV = (
  setIsLogged: (isLogged: boolean) => void,
  setPage: (page: PageType) => void
) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const { setUserId } = useGlobal();

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
    const form = e.currentTarget;

    const data = new FormData(form);
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
    sendReq(username, email, password, rePassword, form);
  };

  const sendReq = async (
    username: string,
    email: string,
    password: string,
    rePassword: string,
    form: EventTarget & HTMLFormElement
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
      if (isRegister) {
        form.reset();
        setIsRegister(false);
        return;
      }
      setUserId(data.user_id);
      setIsLogged(true);
      setPage(pageTypes.home);
    } catch (error) {
      console.error("Error:", error);
      setError(String(error));
    }
  };
  return { isRegister, setIsRegister, error, checkForm };
};

export default LoginRegisterFormMV;

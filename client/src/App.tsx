import { useEffect, useState } from "react";
import "./App.css";
import LoginRegisterForm from "./components/loginForm/LoginRegisterForm";
import Main from "./pages/Main";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/user-logged",
          { credentials: "include" }
        );
        const data = await response.json();
        if (data.user) {
          setIsLogged(true);
        }
      } catch (error) {
        console.error("something went wrong", error);
      }
    };

    checkUserAuth();
  }, []);
  return (
    <>
      {isLoginPage && (
        <LoginRegisterForm
          setIsLoginPage={setIsLoginPage}
          setIsLogged={setIsLogged}
        />
      )}
      {!isLoginPage && (
        <Main isLogged={isLogged} setIsLoginPage={setIsLoginPage} />
      )}
    </>
  );
}

export default App;

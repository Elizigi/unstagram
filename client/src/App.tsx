import { useState } from "react";
import "./App.css";
import LoginRegisterForm from "./components/loginForm/LoginRegisterForm";
import Main from "./pages/Main";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

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

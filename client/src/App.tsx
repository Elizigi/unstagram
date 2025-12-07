import { useEffect, useState } from "react";
import "./App.css";
import LoginRegisterForm from "./components/loginForm/LoginRegisterForm";
import Main from "./pages/main/Main";
import Logo from "./components/logo/Logo";
import { useGlobal } from "./hooks/useGlobal";
import { pageTypes, type PageType } from "./model/pageTypes";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [pageSelected, setPageSelected] = useState<PageType>(pageTypes.Home);

  const { setUserId } = useGlobal();
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/user-logged",
          { credentials: "include" }
        );
        const data = await response.json();
        if (data.user_id) {
          setIsLogged(true);
          setUserId(data.user_id);
        }
      } catch (error) {
        console.error("something went wrong", error);
      }
    };

    checkUserAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Logo></Logo>
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

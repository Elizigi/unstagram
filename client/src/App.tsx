import { useEffect, useState } from "react";
import "./App.css";
import LoginRegisterForm from "./components/loginForm/LoginRegisterForm";
import Main from "./pages/main/Main";
import Logo from "./components/logo/Logo";
import { useGlobal } from "./hooks/useGlobal";
import { pageTypes, type PageType } from "./model/pageTypes";
import UserProfile from "./pages/userProfile/UserProfile";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [pageSelected, setPageSelected] = useState<PageType>(pageTypes.home);
  const [profileId, setProfileId] = useState(-1);

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
  useEffect(() => {
    if (profileId >= 0) {
      setPageSelected(pageTypes.profile);
    }
  }, [profileId]);
  return (
    <>
      <Logo></Logo>
      {pageSelected === pageTypes.login && (
        <LoginRegisterForm
          setIsLogged={setIsLogged}
          setPage={setPageSelected}
        />
      )}
      {pageSelected === pageTypes.home && (
        <Main isLogged={isLogged} setPage={setPageSelected} setProfileId={setProfileId}/>
      )}
      {pageSelected === pageTypes.profile && <UserProfile userId={profileId} />}
    </>
  );
}

export default App;

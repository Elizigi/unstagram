import { useState } from "react";
import "./App.css";
import LoginRegisterForm from "./components/loginForm/LoginRegisterForm";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return <>{!isLogged && <LoginRegisterForm setIsLogged={setIsLogged} />}</>;
}

export default App;

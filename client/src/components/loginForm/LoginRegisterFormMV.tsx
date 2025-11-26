import { useState } from "react";

const LoginRegisterFormMV = () => {
  const [isRegister, setIsRegister] = useState(false);
  return { isRegister, setIsRegister };
};

export default LoginRegisterFormMV;

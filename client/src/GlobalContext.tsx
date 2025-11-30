import { useMemo, useState, type ReactNode } from "react";
import { GlobalContext } from "./GlobalContextCore";

export interface GlobalContextType {
  user_id: number | null;
  setUser_id: (user_id: number) => void;
}

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user_id, setUser_id] = useState("initial value");
  const obj = useMemo(() => ({ user_id, setUser_id }), [user_id, setUser_id]);

  return (
    <GlobalContext.Provider value={obj}>{children}</GlobalContext.Provider>
  );
};

import { useMemo, useState, type ReactNode } from "react";
import { GlobalContext } from "./GlobalContextCore";

export interface GlobalContextType {
  userId: number | null;
  setUserId: (userId: number) => void;
}

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState("initial value");
  const obj = useMemo(() => ({ userId, setUserId }), [userId, setUserId]);

  return (
    <GlobalContext.Provider value={obj}>{children}</GlobalContext.Provider>
  );
};

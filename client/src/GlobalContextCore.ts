import { createContext } from "react";

export interface GlobalContextType {
  user_id: string;
  setUser_id: (user_id: string) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

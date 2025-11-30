import { createContext } from "react";

export interface GlobalContextType {
  userId: string;
  setUserId: (user_id: string) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

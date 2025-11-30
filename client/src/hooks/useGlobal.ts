import { useContext } from "react";
import { GlobalContext, type GlobalContextType } from "../GlobalContextCore";

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used inside GlobalProvider");
  return context;
};

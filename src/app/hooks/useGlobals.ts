import { useContext } from "react";
import { GlobalContext, GlobalInterface } from "../context/GlobalProvider";

export const useGlobals = (): GlobalInterface => {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("useGlobals GlobalProvider ichida chaqirilishi kerak");
  return context;
};

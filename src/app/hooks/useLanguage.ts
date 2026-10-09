import { useContext } from "react";
import { LanguageContext, LanguageInterface } from "../context/LanguageProvider";

export const useLanguage = (): LanguageInterface => {
  const context = useContext(LanguageContext);
  if (context === undefined)
    throw new Error("useLanguage LanguageProvider ichida chaqirilishi kerak");
  return context;
};

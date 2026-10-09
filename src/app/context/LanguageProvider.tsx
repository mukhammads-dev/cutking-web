import React, { createContext, ReactNode, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import {
  DEFAULT_LANG,
  LANG_LABELS,
  LangCode,
  SUPPORTED_LANGS,
  isSupportedLang,
  translate,
  translateEnum,
} from "../../lib/i18n/dictionary";

export interface LanguageInterface {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  langs: LangCode[];
  langLabels: Record<LangCode, string>;
  t: (key: string) => string;
  te: (value?: string | null) => string;
}

export const LanguageContext = createContext<LanguageInterface | undefined>(
  undefined
);

const readStoredLang = (): LangCode => {
  try {
    const cookies = new Cookies();
    const stored = cookies.get("lang");
    return stored && isSupportedLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
};

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LangCode>(readStoredLang);

  const setLang = (code: LangCode) => {
    setLangState(code);
    try {
      const cookies = new Cookies();
      cookies.set("lang", code, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    } catch {
      // cookie yozib bo'lmasa ham, UI shu session uchun ishlashda davom etadi
    }
  };

  const t = useMemo(() => (key: string) => translate(lang, key), [lang]);
  const te = useMemo(
    () => (value?: string | null) => translateEnum(lang, value),
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        langs: SUPPORTED_LANGS,
        langLabels: LANG_LABELS,
        t,
        te,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

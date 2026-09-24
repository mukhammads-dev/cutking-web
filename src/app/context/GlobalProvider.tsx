import React, { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { registerUnauthorizedHandler } from "../services/apiClient";

export interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  bookingBuilder: Date;
  setBookingBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

const readStoredMember = (): Member | null => {
  try {
    const raw = localStorage.getItem("memberData");
    return raw ? (JSON.parse(raw) as Member) : null;
  } catch {
    localStorage.removeItem("memberData");
    return null;
  }
};

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = useState<Member | null>(readStoredMember);
  const [bookingBuilder, setBookingBuilder] = useState<Date>(new Date());

  useEffect(() => {
    registerUnauthorizedHandler(() => setAuthMember(null));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, bookingBuilder, setBookingBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authMember } = useGlobals();
  const location = useLocation();

  if (!authMember) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }
  return children;
}

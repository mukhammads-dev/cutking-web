import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLanguage } from "../../hooks/useLanguage";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text }: LoaderProps) {
  const { t } = useLanguage();
  const resolvedText = text ?? t("common.loading");

  return (
    <div className="ck-loader">
      <CircularProgress size={26} thickness={4.5} color="primary" />
      <span>{resolvedText}</span>
    </div>
  );
}

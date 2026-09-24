import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Loading…" }: LoaderProps) {
  return (
    <div className="ck-loader">
      <CircularProgress size={26} thickness={4.5} color="primary" />
      <span>{text}</span>
    </div>
  );
}

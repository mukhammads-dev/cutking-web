import { TypographyOptions } from "@mui/material/styles/createTypography";
import { tokens } from "./palette";

const typography: TypographyOptions = {
  fontFamily: tokens.fontBody,

  h1: { fontFamily: tokens.fontHead, fontWeight: 800, fontSize: "44px", lineHeight: 1.1, letterSpacing: "-0.5px" },
  h2: { fontFamily: tokens.fontHead, fontWeight: 800, fontSize: "32px", lineHeight: 1.15, letterSpacing: "-0.3px" },
  h3: { fontFamily: tokens.fontHead, fontWeight: 700, fontSize: "24px", lineHeight: 1.2 },
  h4: { fontFamily: tokens.fontHead, fontWeight: 700, fontSize: "18px", lineHeight: 1.25 },
  h5: { fontFamily: tokens.fontHead, fontWeight: 700, fontSize: "15px", lineHeight: 1.3 },
  h6: { fontFamily: tokens.fontHead, fontWeight: 700, fontSize: "13px", lineHeight: 1.3 },

  subtitle1: { fontWeight: 600, fontSize: "14px" },
  subtitle2: { fontWeight: 600, fontSize: "12.5px" },

  body1: { fontSize: "14.5px", lineHeight: 1.55 },
  body2: { fontSize: "13px", lineHeight: 1.55 },

  caption: { fontSize: "11px", color: tokens.muted },

  button: {
    fontWeight: 700,
    fontSize: "12px",
    letterSpacing: "0.3px",
    textTransform: "none",
  },

  overline: {
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.6px",
    textTransform: "uppercase",
    lineHeight: 1.6,
  },
};

export default typography;

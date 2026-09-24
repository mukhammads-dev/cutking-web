import { Shadows } from "@mui/material/styles";

const sm = "0 1px 3px rgba(28, 27, 26, .06), 0 1px 2px rgba(28, 27, 26, .04)";
const md = "0 6px 20px rgba(28, 27, 26, .08)";
const lg = "0 16px 40px rgba(28, 27, 26, .12)";

const shadow: Shadows = [
  "none",
  sm, sm, sm, sm, sm, sm, sm,
  md, md, md, md, md, md, md, md,
  lg, lg, lg, lg, lg, lg, lg, lg, lg,
];

export default shadow;

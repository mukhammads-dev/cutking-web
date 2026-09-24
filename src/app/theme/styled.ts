import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { tokens } from "./palette";

export const RippleBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: tokens.coral,
    color: tokens.white,
    fontWeight: 700,
    fontSize: "10px",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.4s infinite ease-in-out",
      border: `1px solid ${tokens.coral}`,
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(.9)", opacity: 1 },
    "100%": { transform: "scale(2.2)", opacity: 0 },
  },
}));

export const SurfaceCard = styled(Box)(() => ({
  background: tokens.white,
  border: `1px solid ${tokens.light2}`,
  borderRadius: tokens.radiusLg,
  boxShadow: "0 1px 3px rgba(28, 27, 26, .06), 0 1px 2px rgba(28, 27, 26, .04)",
  overflow: "hidden",
  transition: "transform .16s ease, box-shadow .16s ease",
}));

export const HoverCard = styled(SurfaceCard)(() => ({
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 6px 20px rgba(28, 27, 26, .08)",
  },
}));

export const SectionLabel = styled(Box)(() => ({
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: tokens.coral,
}));

import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import shadow from "./shadow";
import { tokens } from "./palette";

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: tokens.light,
      paper: tokens.white,
    },
    primary: {
      main: tokens.coral,
      dark: tokens.coralHover,
      contrastText: tokens.white,
    },
    secondary: {
      main: tokens.gold,
      dark: tokens.goldHover,
      contrastText: tokens.white,
    },
    success: { main: tokens.green },
    warning: { main: tokens.amber },
    error: { main: tokens.red },
    info: { main: tokens.blue },
    text: {
      primary: tokens.dark,
      secondary: tokens.muted,
    },
    divider: tokens.light2,
  },
  shape: { borderRadius: tokens.radius },
  typography,
  shadows: shadow,
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%", scrollBehavior: "smooth" },
        body: {
          height: "100%",
          background: tokens.light,
          color: tokens.dark,
          WebkitFontSmoothing: "antialiased",
        },
        "#root": { minHeight: "100%", display: "flex", flexDirection: "column" },
        a: { textDecoration: "none", color: "inherit" },
        img: { display: "block", maxWidth: "100%" },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: { paddingLeft: 24, paddingRight: 24 },
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: { maxWidth: "1220px" },
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius,
          padding: "10px 20px",
          fontWeight: 700,
          transition: "all .16s ease",
        },
        containedPrimary: {
          boxShadow: "0 2px 8px rgba(255, 90, 90, .28)",
          "&:hover": {
            backgroundColor: tokens.coralHover,
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(255, 90, 90, .34)",
          },
        },
        outlinedPrimary: {
          backgroundColor: tokens.white,
          borderWidth: "1.5px",
          borderColor: tokens.coralLine,
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: tokens.coral,
            backgroundColor: tokens.coralBg,
          },
        },
        sizeSmall: { padding: "7px 14px", fontSize: "11px", borderRadius: tokens.radiusSm },
        sizeLarge: { padding: "14px 30px", fontSize: "13px" },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        outlined: { borderColor: tokens.light2 },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radiusSm,
          fontWeight: 700,
          fontSize: "10.5px",
          letterSpacing: ".4px",
          textTransform: "uppercase",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.white,
          borderRadius: tokens.radius,
          "& fieldset": { borderColor: tokens.light2, borderWidth: "1.5px" },
          "&:hover fieldset": { borderColor: "#DCD7CF" },
          "&.Mui-focused fieldset": { borderColor: tokens.coral, borderWidth: "1.5px" },
        },
        input: { padding: "12px 14px", fontSize: "13.5px" },
      },
    },

    MuiInputLabel: {
      styleOverrides: { root: { fontSize: "13.5px" } },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "12px",
          letterSpacing: ".6px",
          textTransform: "uppercase",
          minHeight: 46,
          color: tokens.muted,
          "&.Mui-selected": { color: tokens.dark },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: { height: 3, borderRadius: 3, backgroundColor: tokens.coral },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.dark,
          fontSize: "11px",
          fontWeight: 600,
          borderRadius: tokens.radiusSm,
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: "12.5px",
          borderRadius: tokens.radiusSm,
          "&.Mui-selected": {
            backgroundColor: tokens.coral,
            color: tokens.white,
            "&:hover": { backgroundColor: tokens.coralHover },
          },
        },
      },
    },
  },
});

export default theme;

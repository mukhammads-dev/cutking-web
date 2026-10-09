import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LoginIcon from "@mui/icons-material/Login";
import LanguageIcon from "@mui/icons-material/Language";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

import Logo from "./Logo";
import BookingCart, { BookingCartProps } from "./BookingCart";
import { useGlobals } from "../../hooks/useGlobals";
import { useLanguage } from "../../hooks/useLanguage";
import { LANG_NAMES } from "../../../lib/i18n/dictionary";
import { buildImageUrl } from "../../../lib/config";

export interface NavbarProps extends BookingCartProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

const LINK_DEFS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/services", key: "nav.services", end: false },
  { to: "/masters", key: "nav.masters", end: false },
  { to: "/booking", key: "nav.booking", end: false },
  { to: "/help", key: "nav.help", end: false },
];

export default function Navbar(props: NavbarProps) {
  const { onOpenLogin, onOpenSignup, onLogout, ...cartProps } = props;

  const { authMember } = useGlobals();
  const { lang, setLang, langs, langLabels, t } = useLanguage();
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  const langMenuOpen = Boolean(langAnchorEl);
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const onHome = location.pathname === "/";

  const handleAvatarClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const goTo = (path: string) => {
    handleMenuClose();
    setDrawerOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  const handleLangClick = (e: React.MouseEvent<HTMLElement>) =>
    setLangAnchorEl(e.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);
  const chooseLang = (code: typeof lang) => {
    setLang(code);
    handleLangClose();
  };

  const avatar = buildImageUrl(
    authMember?.memberImage,
    "/icons/default-user.svg"
  );

  const navLinks = (onClick?: () => void) =>
    LINK_DEFS.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        onClick={onClick}
        className={({ isActive }) =>
          isActive ? "ck-nav-link active" : "ck-nav-link"
        }
      >
        {t(link.key)}
      </NavLink>
    ));

  const langSwitch = (
    <>
      <button type="button" className="ck-lang-trigger" onClick={handleLangClick}>
        <LanguageIcon sx={{ fontSize: 17 }} />
        <span>{langLabels[lang]}</span>
        <KeyboardArrowDownIcon
          sx={{ fontSize: 16, transform: langMenuOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }}
        />
      </button>
      <Menu
        anchorEl={langAnchorEl}
        open={langMenuOpen}
        onClose={handleLangClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              minWidth: 160,
              border: "1px solid var(--light2)",
              borderRadius: "var(--r)",
              boxShadow: "var(--sh)",
            },
          },
        }}
      >
        {langs.map((code) => (
          <MenuItem key={code} selected={code === lang} onClick={() => chooseLang(code)}>
            <ListItemIcon sx={{ minWidth: 28, color: "var(--coral)" }}>
              {code === lang ? <CheckIcon fontSize="small" /> : null}
            </ListItemIcon>
            {LANG_NAMES[code]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <header className={onHome ? "ck-navbar on-home" : "ck-navbar"}>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <div className="ck-navbar-inner">
          <Logo />

          <nav className="ck-nav-links">{navLinks()}</nav>

          <div className="ck-nav-right">
            {langSwitch}
            <BookingCart {...cartProps} />

            {authMember ? (
              <>
                <img
                  className="ck-nav-avatar"
                  src={avatar}
                  alt={authMember.memberNick}
                  onClick={handleAvatarClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        mt: 1,
                        minWidth: 210,
                        border: "1px solid var(--light2)",
                        borderRadius: "var(--r)",
                        boxShadow: "var(--sh)",
                      },
                    },
                  }}
                >
                  <MenuItem onClick={() => goTo("/profile")}>
                    <ListItemIcon>
                      <PersonOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    {t("nav.profile")}
                  </MenuItem>
                  <MenuItem onClick={() => goTo("/my-bookings")}>
                    <ListItemIcon>
                      <EventNoteIcon fontSize="small" />
                    </ListItemIcon>
                    {t("nav.myBookings")}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "var(--red)" }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: "var(--red)" }} />
                    </ListItemIcon>
                    {t("nav.logout")}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="text"
                  sx={{ color: "var(--muted)", display: { xs: "none", sm: "inline-flex" } }}
                  onClick={onOpenLogin}
                >
                  {t("nav.login")}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<LoginIcon sx={{ fontSize: 16 }} />}
                  onClick={onOpenSignup}
                >
                  {t("nav.signup")}
                </Button>
              </>
            )}

            <IconButton
              className="ck-burger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="ck-drawer">
          <div style={{ marginBottom: 18 }}>
            <Logo static />
          </div>
          {navLinks(() => setDrawerOpen(false))}
        </div>
      </Drawer>
    </header>
  );
}

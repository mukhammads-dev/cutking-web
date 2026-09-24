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

import Logo from "./Logo";
import BookingCart, { BookingCartProps } from "./BookingCart";
import { useGlobals } from "../../hooks/useGlobals";
import { buildImageUrl } from "../../../lib/config";

export interface NavbarProps extends BookingCartProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onLogout: () => void;
}

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services", end: false },
  { to: "/masters", label: "Barbers", end: false },
  { to: "/booking", label: "Book", end: false },
  { to: "/help", label: "Help", end: false },
];

export default function Navbar(props: NavbarProps) {
  const { onOpenLogin, onOpenSignup, onLogout, ...cartProps } = props;

  const { authMember } = useGlobals();
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

  const avatar = buildImageUrl(
    authMember?.memberImage,
    "/icons/default-user.svg"
  );

  const navLinks = (onClick?: () => void) =>
    LINKS.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.end}
        onClick={onClick}
        className={({ isActive }) =>
          isActive ? "ck-nav-link active" : "ck-nav-link"
        }
      >
        {link.label}
      </NavLink>
    ));

  return (
    <header className={onHome ? "ck-navbar on-home" : "ck-navbar"}>
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <div className="ck-navbar-inner">
          <Logo />

          <nav className="ck-nav-links">{navLinks()}</nav>

          <div className="ck-nav-right">
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
                    My profile
                  </MenuItem>
                  <MenuItem onClick={() => goTo("/my-bookings")}>
                    <ListItemIcon>
                      <EventNoteIcon fontSize="small" />
                    </ListItemIcon>
                    My bookings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "var(--red)" }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" sx={{ color: "var(--red)" }} />
                    </ListItemIcon>
                    Log out
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
                  Log in
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<LoginIcon sx={{ fontSize: 16 }} />}
                  onClick={onOpenSignup}
                >
                  Sign up
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

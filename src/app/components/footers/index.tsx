import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Logo from "../headers/Logo";
import { SHOP, workingHours } from "../../../lib/data/shop";
import { useLanguage } from "../../hooks/useLanguage";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="ck-footer">
      <Container maxWidth="lg">
        <div className="ck-footer-grid">
          <div className="ck-footer-brand">
            <Logo static />
            <p className="ck-footer-about">{t("footer.about")}</p>
            <div className="ck-footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram">
                <TelegramIcon fontSize="small" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <YouTubeIcon fontSize="small" />
              </a>
            </div>
          </div>

          <div className="ck-footer-col">
            <h5>{t("footer.pages")}</h5>
            <Link to="/">{t("nav.home")}</Link>
            <Link to="/services">{t("nav.services")}</Link>
            <Link to="/masters">{t("nav.masters")}</Link>
            <Link to="/booking">{t("nav.booking")}</Link>
            <Link to="/help">{t("nav.help")}</Link>
          </div>

          <div className="ck-footer-col">
            <h5>{t("footer.hours")}</h5>
            <ul>
              {workingHours.map((row) => (
                <li key={row.day}>
                  {row.day} — {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div className="ck-footer-col ck-footer-contact">
            <h5>{t("footer.contact")}</h5>
            <ul>
              <li>
                <PhoneIcon fontSize="small" /> {SHOP.phone}
              </li>
              <li>
                <PlaceIcon fontSize="small" /> {SHOP.address}
              </li>
              <li>
                <MailOutlineIcon fontSize="small" /> {SHOP.email}
              </li>
              <li>
                <ScheduleIcon fontSize="small" /> {t("footer.everyday")}
              </li>
            </ul>
          </div>
        </div>

        <div className="ck-footer-bottom">
          <span>
            © {year} {SHOP.name}. {t("footer.rights")}
          </span>
          <span>Busan, South Korea</span>
        </div>
      </Container>
    </footer>
  );
}

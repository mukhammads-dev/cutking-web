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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ck-footer">
      <Container maxWidth="lg">
        <div className="ck-footer-grid">
          <div className="ck-footer-brand">
            <Logo static />
            <p className="ck-footer-about">
              Book online, arrive at your time, sit straight down. No queue,
              no guessing.
            </p>
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
            <h5>Pages</h5>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/masters">Barbers</Link>
            <Link to="/booking">Book</Link>
            <Link to="/help">Help</Link>
          </div>

          <div className="ck-footer-col">
            <h5>Opening hours</h5>
            <ul>
              {workingHours.map((row) => (
                <li key={row.day}>
                  {row.day} — {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div className="ck-footer-col ck-footer-contact">
            <h5>Contact</h5>
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
                <ScheduleIcon fontSize="small" /> Every day 09:00 — 21:00
              </li>
            </ul>
          </div>
        </div>

        <div className="ck-footer-bottom">
          <span>
            © {year} {SHOP.name}. All rights reserved.
          </span>
          <span>Busan, South Korea</span>
        </div>
      </Container>
    </footer>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaceIcon from "@mui/icons-material/Place";

import useHeroNav from "../../hooks/useHeroNav";
import { useLanguage } from "../../hooks/useLanguage";

const HERO_IMAGE = "/img/hero-banner.jpg";

export default function HeroBanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  useHeroNav(true);

  return (
    <section className="ck-hero-banner">
      <div className="ck-hero-stage">
        <img
          className="ck-hero-media"
          src={HERO_IMAGE}
          alt="Inside CutKing barbershop"
        />
        <div className="ck-hero-veil" />
      </div>

      <div className="ck-hero-body">
        <Container maxWidth="lg">
          <span className="ck-hero-eyebrow on-dark">
            <PlaceIcon sx={{ fontSize: 13 }} />
            {t("home.hero.location")}
          </span>

          <h1 className="ck-hero-title on-dark">
            {t("home.hero.titleLine1")}
            <br />
            <em>{t("home.hero.titleLine2")}</em>
          </h1>

          <p className="ck-hero-text on-dark">{t("home.hero.text")}</p>

          <div className="ck-hero-actions">
            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              onClick={() => navigate("/booking")}
            >
              {t("home.hero.cta.book")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="ck-btn-on-dark"
              onClick={() => navigate("/services")}
            >
              {t("home.hero.seePrices")}
            </Button>
            <span className="ck-hero-open">
              <i className="ck-hero-dot" />
              {t("home.hero.openDaily")}
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}

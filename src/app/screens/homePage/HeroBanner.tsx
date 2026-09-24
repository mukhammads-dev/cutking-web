import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlaceIcon from "@mui/icons-material/Place";

import useHeroNav from "../../hooks/useHeroNav";

const HERO_IMAGE = "/img/hero-banner.jpg";

export default function HeroBanner() {
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
            Haeundae, Busan
          </span>

          <h1 className="ck-hero-title on-dark">
            Book your haircut.
            <br />
            <em>No waiting.</em>
          </h1>

          <p className="ck-hero-text on-dark">
            Choose your barber, pick your time, walk straight in.
          </p>

          <div className="ck-hero-actions">
            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              onClick={() => navigate("/booking")}
            >
              Book now
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="ck-btn-on-dark"
              onClick={() => navigate("/services")}
            >
              See prices
            </Button>
            <span className="ck-hero-open">
              <i className="ck-hero-dot" />
              Open daily 09:00 — 21:00
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}

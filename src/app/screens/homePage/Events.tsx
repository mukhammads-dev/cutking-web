import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../hooks/useLanguage";
import { getFeaturedEvent, getShopEvents } from "../../../lib/data/events";

export default function Events() {
  const { t, lang } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();
  const navigate = useNavigate();

  const featuredEvent = getFeaturedEvent(lang);
  const shopEvents = getShopEvents(lang);

  const goBooking = () => navigate("/booking");

  return (
    <section className={`ck-section ck-offers ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">{t("home.events.label")}</span>
          <h2 className="section-title">{t("home.events.heading")}</h2>
          <p className="section-sub">{t("home.events.sub")}</p>
        </div>

        <div className="ck-offer-grid">
          <article
            className="ck-offer-hero"
            onClick={goBooking}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goBooking()}
          >
            <img src={featuredEvent.image} alt="" aria-hidden="true" />
            <span className="ck-offer-veil" />

            <span className="ck-offer-stamp">{featuredEvent.badge}</span>

            <div className="ck-offer-hero-body">
              <span className="ck-offer-when">{featuredEvent.when}</span>
              <h3>{featuredEvent.title}</h3>
              <p>{featuredEvent.text}</p>
              <span className="ck-offer-code">
                <LocalOfferIcon fontSize="inherit" />
                {featuredEvent.code}
              </span>
            </div>
          </article>

          <div className="ck-offer-list">
            {shopEvents.map((event) => (
              <article
                key={event.id}
                className="ck-offer-row"
                onClick={goBooking}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && goBooking()}
              >
                <span className="ck-offer-value">{event.badge}</span>

                <div className="ck-offer-copy">
                  <h4>{event.title}</h4>
                  <p>{event.text}</p>
                  <span className="ck-offer-when">{event.when}</span>
                </div>

                <span className="ck-offer-tag">{event.code}</span>
                <ArrowForwardIcon className="ck-offer-arrow" fontSize="small" />
              </article>
            ))}
          </div>
        </div>

        <div className="ck-section-foot">
          <Button
            variant="contained"
            size="large"
            startIcon={<EventAvailableIcon />}
            onClick={goBooking}
          >
            {t("home.events.bookNow")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

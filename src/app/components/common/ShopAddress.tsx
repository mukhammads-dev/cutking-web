import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import NearMeIcon from "@mui/icons-material/NearMe";

import useReveal from "../../hooks/useReveal";
import { useLanguage } from "../../hooks/useLanguage";
import { SHOP, workingHours } from "../../../lib/data/shop";

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  SHOP.mapQuery
)}&output=embed`;

const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SHOP.mapQuery
)}`;

export default function ShopAddress() {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { t } = useLanguage();

  return (
    <section className={`ck-section ck-address ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">{t("address.label")}</span>
          <h2 className="section-title">{t("address.title")}</h2>
          <p className="section-sub">{t("address.subtitle")}</p>
        </div>

        <div className="ck-address-card">
          <div className="ck-address-info">
            <div className="ck-address-row">
              <span className="ico">
                <PlaceIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">{t("address.address")}</div>
                <div className="val">{SHOP.addressLine1}</div>
                <div className="val muted">{SHOP.addressLine2}</div>
              </div>
            </div>

            <div className="ck-address-row">
              <span className="ico">
                <DirectionsSubwayIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">{t("address.gettingHere")}</div>
                <div className="val">{SHOP.nearest}</div>
              </div>
            </div>

            <div className="ck-address-row">
              <span className="ico">
                <ScheduleIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">{t("address.openingHours")}</div>
                {workingHours.map((row) => (
                  <div key={row.day} className="val muted">
                    {row.day} · {row.hours}
                  </div>
                ))}
              </div>
            </div>

            <div className="ck-address-row">
              <span className="ico">
                <PhoneIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">{t("address.phone")}</div>
                <a className="val link" href={`tel:${SHOP.phone.replace(/\s/g, "")}`}>
                  {SHOP.phone}
                </a>
              </div>
            </div>

            <Button
              variant="contained"
              startIcon={<NearMeIcon />}
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              sx={{ mt: 1 }}
            >
              {t("address.getDirections")}
            </Button>
          </div>

          <div className="ck-address-map">
            <iframe
              title={`${SHOP.name} — ${SHOP.address}`}
              src={MAP_EMBED}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsSubwayIcon from "@mui/icons-material/DirectionsSubway";
import NearMeIcon from "@mui/icons-material/NearMe";

import useReveal from "../../hooks/useReveal";
import { SHOP, workingHours } from "../../../lib/data/shop";

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  SHOP.mapQuery
)}&output=embed`;

const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  SHOP.mapQuery
)}`;

export default function ShopAddress() {
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <section className={`ck-section ck-address ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">Location</span>
          <h2 className="section-title">How to find us</h2>
          <p className="section-sub">
            Two minutes from the beach, four from the station.
          </p>
        </div>

        <div className="ck-address-card">
          <div className="ck-address-info">
            <div className="ck-address-row">
              <span className="ico">
                <PlaceIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">Address</div>
                <div className="val">{SHOP.addressLine1}</div>
                <div className="val muted">{SHOP.addressLine2}</div>
              </div>
            </div>

            <div className="ck-address-row">
              <span className="ico">
                <DirectionsSubwayIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">Getting here</div>
                <div className="val">{SHOP.nearest}</div>
              </div>
            </div>

            <div className="ck-address-row">
              <span className="ico">
                <ScheduleIcon fontSize="small" />
              </span>
              <div>
                <div className="lbl">Opening hours</div>
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
                <div className="lbl">Phone</div>
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
              Get directions
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

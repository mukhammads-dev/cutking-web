import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import useReveal from "../../hooks/useReveal";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { retrieveTopMasters } from "./selector";
import MasterCard from "../../components/cards/MasterCard";
import { useLanguage } from "../../hooks/useLanguage";

const topMastersRetriever = createSelector(
  retrieveTopMasters,
  (topMasters) => ({ topMasters })
);

export default function TopMasters() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { topMasters } = useSelector(topMastersRetriever);
  const navigate = useNavigate();

  if (topMasters.length === 0) return null;

  return (
    <section className={`ck-section ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">{t("home.topMasters.label")}</span>
          <h2 className="section-title">{t("home.topMasters.heading")}</h2>
          <p className="section-sub">{t("home.topMasters.sub")}</p>
        </div>

        <div className="ck-card-grid cols-3">
          {topMasters.slice(0, 3).map((master) => (
            <MasterCard key={master._id} master={master} />
          ))}
        </div>

        <div className="ck-section-foot">
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/masters")}
          >
            {t("home.topMasters.seeAll")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

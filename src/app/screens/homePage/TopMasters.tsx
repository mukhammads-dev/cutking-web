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

const topMastersRetriever = createSelector(
  retrieveTopMasters,
  (topMasters) => ({ topMasters })
);

export default function TopMasters() {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { topMasters } = useSelector(topMastersRetriever);
  const navigate = useNavigate();

  if (topMasters.length === 0) return null;

  return (
    <section className={`ck-section ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">Our team</span>
          <h2 className="section-title">Choose your barber</h2>
          <p className="section-sub">
            Each one has a specialty. Book by name.
          </p>
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
            See all barbers
          </Button>
        </div>
      </Container>
    </section>
  );
}

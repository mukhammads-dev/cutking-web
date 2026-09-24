import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import useReveal from "../../hooks/useReveal";
import ServiceCard from "../../components/cards/ServiceCard";
import EmptyState from "../../components/common/EmptyState";

import { retrieveSignatureServices } from "./selector";
import { CartItem } from "../../../lib/types/search";

const popularRetriever = createSelector(
  retrieveSignatureServices,
  (signatureServices) => ({ signatureServices })
);

interface PopularServicesProps {
  onAdd: (item: CartItem) => void;
}

export default function PopularServices({ onAdd }: PopularServicesProps) {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { signatureServices } = useSelector(popularRetriever);
  const navigate = useNavigate();

  return (
    <section className={`ck-section ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">Most booked</span>
          <h2 className="section-title">Top services</h2>
          <p className="section-sub">The cuts our customers ask for most.</p>
        </div>

        {signatureServices.length === 0 ? (
          <EmptyState
            title="No services yet"
            text="Add a service in the admin panel and set its status to PROCESS."
          />
        ) : (
          <>
            <div className="ck-card-grid">
              {signatureServices.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onAdd={onAdd}
                  rank={index === 0 ? 1 : undefined}
                />
              ))}
            </div>

            <div className="ck-section-foot">
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/services")}
              >
                See all services
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

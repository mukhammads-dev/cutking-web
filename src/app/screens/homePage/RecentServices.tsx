import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";

import useReveal from "../../hooks/useReveal";
import ServiceCard from "../../components/cards/ServiceCard";

import { retrieveNewServices } from "./selector";
import { CartItem } from "../../../lib/types/search";

const recentRetriever = createSelector(
  retrieveNewServices,
  (newServices) => ({ newServices })
);

interface RecentServicesProps {
  onAdd: (item: CartItem) => void;
}

export default function RecentServices({ onAdd }: RecentServicesProps) {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { newServices } = useSelector(recentRetriever);

  if (newServices.length === 0) return null;

  return (
    <section className={`ck-section alt ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">Just added</span>
          <h2 className="section-title">New services</h2>
          <p className="section-sub">Recently added to our price list.</p>
        </div>

        <div className="ck-card-grid">
          {newServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onAdd={onAdd}
              isNew
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

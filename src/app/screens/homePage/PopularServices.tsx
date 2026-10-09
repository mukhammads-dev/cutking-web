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
import { useLanguage } from "../../hooks/useLanguage";

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
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { signatureServices } = useSelector(popularRetriever);
  const navigate = useNavigate();

  return (
    <section className={`ck-section ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">{t("home.popularServices.label")}</span>
          <h2 className="section-title">{t("home.popularServices.heading")}</h2>
          <p className="section-sub">{t("home.popularServices.sub")}</p>
        </div>

        {signatureServices.length === 0 ? (
          <EmptyState
            title={t("home.popularServices.emptyTitle")}
            text={t("home.popularServices.emptyText")}
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
                {t("home.popularServices.seeAll")}
              </Button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

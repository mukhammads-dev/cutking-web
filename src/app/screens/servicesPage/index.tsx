import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import ServicesList from "./ServicesList";
import ChosenService from "./ChosenService";
import ShopAddress from "../../components/common/ShopAddress";
import { useLanguage } from "../../hooks/useLanguage";
import { CartItem } from "../../../lib/types/search";

import "../../../styles/services.css";
import "../../../styles/cards.css";
import "../../../styles/address.css";

interface ServicesPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ServicesPage({ onAdd }: ServicesPageProps) {
  const { t } = useLanguage();

  return (
    <div className="services-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">{t("services.crumb")}</div>
          <h1>{t("services.title")}</h1>
          <p>{t("services.desc")}</p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Routes>
          <Route path="/" element={<ServicesList onAdd={onAdd} />} />
          <Route path=":serviceId" element={<ChosenService onAdd={onAdd} />} />
        </Routes>
      </div>

      <ShopAddress />
    </div>
  );
}

import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import ServicesList from "./ServicesList";
import ChosenService from "./ChosenService";
import ShopAddress from "../../components/common/ShopAddress";
import { CartItem } from "../../../lib/types/search";

import "../../../styles/services.css";
import "../../../styles/cards.css";
import "../../../styles/address.css";

interface ServicesPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ServicesPage({ onAdd }: ServicesPageProps) {
  return (
    <div className="services-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">Services</div>
          <h1>Our services</h1>
          <p>
            Haircuts, beard, colour and packages. Add what you want — you'll
            pick the time next.
          </p>
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

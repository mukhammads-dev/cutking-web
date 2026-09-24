import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import HeroBanner from "./HeroBanner";
import Stats from "./Stats";
import PopularServices from "./PopularServices";
import RecentServices from "./RecentServices";
import TopMasters from "./TopMasters";
import Showcase from "./Showcase";
import Events from "./Events";
import TopUsers from "./TopUsers";

import {
  setSignatureServices,
  setNewServices,
  setTopMasters,
  setTopUsers,
} from "./slice";
import { useAppSelector } from "../../hooks";

import CuttingService from "../../services/CuttingService";
import MemberService from "../../services/MemberService";

import { Service } from "../../../lib/types/service";
import { Master, Member } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";
import { ServiceSort } from "../../../lib/enums/service.enum";
import { PAGE_LIMIT } from "../../../lib/config";

import "../../../styles/home.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setSignatureServices: (data: Service[]) =>
    dispatch(setSignatureServices(data)),
  setNewServices: (data: Service[]) => dispatch(setNewServices(data)),
  setTopMasters: (data: Master[]) => dispatch(setTopMasters(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage({ onAdd }: HomePageProps) {
  const {
    setSignatureServices,
    setNewServices,
    setTopMasters,
    setTopUsers,
  } = actionDispatch(useDispatch());

  const serviceCount = useAppSelector(
    (state) =>
      state.homePage.signatureServices.length + state.homePage.newServices.length
  );
  const masterCount = useAppSelector(
    (state) => state.homePage.topMasters.length
  );

  useEffect(() => {
    const cutting = new CuttingService();
    const member = new MemberService();

    cutting
      .getServices({
        booking: ServiceSort.VIEWS,
        page: 1,
        limit: PAGE_LIMIT.home,
      })
      .then(setSignatureServices)
      .catch((err) => console.error("HomePage.signatureServices:", err));

    cutting
      .getServices({
        booking: ServiceSort.NEW,
        page: 1,
        limit: PAGE_LIMIT.home,
      })
      .then(setNewServices)
      .catch((err) => console.error("HomePage.newServices:", err));

    member
      .getMasters()
      .then(setTopMasters)
      .catch((err) => console.error("HomePage.topMasters:", err));

    member
      .getTopUsers()
      .then(setTopUsers)
      .catch((err) => console.error("HomePage.topUsers:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      <HeroBanner />
      <Stats serviceCount={serviceCount} masterCount={masterCount} />
      <PopularServices onAdd={onAdd} />
      <RecentServices onAdd={onAdd} />
      <TopMasters />
      <Showcase />
      <Events />
      <TopUsers />
    </div>
  );
}

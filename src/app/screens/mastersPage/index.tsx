import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { setMasters } from "./slice";
import { retrieveMasters } from "./selector";
import MasterCard from "../../components/cards/MasterCard";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import MemberService from "../../services/MemberService";
import { Master } from "../../../lib/types/member";

import "../../../styles/masters.css";
import "../../../styles/cards.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setMasters: (data: Master[]) => dispatch(setMasters(data)),
});

const mastersRetriever = createSelector(
  retrieveMasters,
  (masters) => ({ masters })
);

export default function MastersPage() {
  const { setMasters } = actionDispatch(useDispatch());
  const { masters } = useSelector(mastersRetriever);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const member = new MemberService();

    member
      .getMasters()
      .then((data) => {
        if (alive) setMasters(data);
      })
      .catch((err) => console.error("MastersPage:", err))
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="masters-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">Our team</div>
          <h1>Our barbers</h1>
          <p>
            Every barber has a specialty. Choose who you want.
          </p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Container maxWidth="lg">
          {loading ? (
            <Loader text="Loading masters…" />
          ) : masters.length === 0 ? (
            <>
              <div className="ck-masters-note">
                <InfoOutlinedIcon fontSize="small" />
                <div>
                  <b>No barbers added yet</b>
                  Masters are created in the admin panel, but showing them to
                  clients needs a public{" "}
                  <code>GET /member/masters</code> endpoint on the backend. See
                  BACKEND-NOTES.md for ready-to-paste code.
                </div>
              </div>
              <EmptyState
                title="No barbers yet"
                text="Once the endpoint is added, barbers will appear here automatically."
              />
            </>
          ) : (
            <div className="ck-masters-grid">
              {masters.map((master) => (
                <MasterCard key={master._id} master={master} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

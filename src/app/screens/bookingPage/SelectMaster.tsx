import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { setSelectedMasterId } from "./slice";
import { retrieveBookingMasters, retrieveSelectedMasterId } from "./selector";
import MasterCard from "../../components/cards/MasterCard";

const actionDispatch = (dispatch: Dispatch) => ({
  setSelectedMasterId: (id: string | null) => dispatch(setSelectedMasterId(id)),
});

const masterPickRetriever = createSelector(
  retrieveBookingMasters,
  retrieveSelectedMasterId,
  (masters, selectedMasterId) => ({ masters, selectedMasterId })
);

export default function SelectMaster() {
  const { setSelectedMasterId } = actionDispatch(useDispatch());
  const { masters, selectedMasterId } = useSelector(masterPickRetriever);

  return (
    <div className="ck-panel">
      <div className="ck-panel-head">
        <div className="ck-panel-title">
          <span className="idx">2</span>
          Choose a barber
        </div>
      </div>

      <div className="ck-panel-body">
        {masters.length === 0 ? (
          <div className="ck-masters-note">
            <InfoOutlinedIcon fontSize="small" />
            <div>
              <b>No barbers added yet</b>
              A public <code>GET /member/masters</code> endpoint needs to be added
              on the backend — see BACKEND-NOTES.md.
            </div>
          </div>
        ) : (
          <div className="ck-master-pick">
            {masters.map((master) => (
              <MasterCard
                key={master._id}
                master={master}
                selectable
                selected={selectedMasterId === master._id}
                onSelect={setSelectedMasterId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

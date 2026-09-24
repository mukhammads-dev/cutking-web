import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";
import useReveal from "../../hooks/useReveal";

import { retrieveTopUsers } from "./selector";
import { buildImageUrl } from "../../../lib/config";

const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({ topUsers })
);

export default function TopUsers() {
  const { ref, revealClass } = useReveal<HTMLElement>();
  const { topUsers } = useSelector(topUsersRetriever);

  if (topUsers.length === 0) return null;

  return (
    <section className={`ck-section alt ${revealClass}`} ref={ref}>
      <Container maxWidth="lg">
        <div className="section-head">
          <span className="section-label">Regulars</span>
          <h2 className="section-title">Our regulars</h2>
          <p className="section-sub">
            Every visit earns points. Points turn into discounts.
          </p>
        </div>

        <div className="ck-user-strip">
          {topUsers.slice(0, 8).map((user) => (
            <div key={user._id} className="ck-user-chip">
              <img
                src={buildImageUrl(user.memberImage, "/icons/default-user.svg")}
                alt={user.memberNick}
              />
              <div>
                <div className="nick">{user.memberNick}</div>
                <div className="pts">{user.memberPoints ?? 0} pts</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

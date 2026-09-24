import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EventNoteIcon from "@mui/icons-material/EventNote";

import Settings from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { buildImageUrl } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

import "../../../styles/profile.css";
import "../../../styles/myBookings.css";

export default function ProfilePage() {
  const { authMember } = useGlobals();
  const navigate = useNavigate();

  const avatar = buildImageUrl(
    authMember?.memberImage,
    "/icons/default-user.svg"
  );

  return (
    <div className="profile-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">My account</div>
          <h1>My profile</h1>
          <p>We use these details for your bookings.</p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Container maxWidth="lg">
          <div className="ck-profile-grid">
            <Settings />

            <aside>
              <div className="ck-side-card">
                <div className="ck-side-avatar-wrap">
                  <img
                    className="ck-side-avatar"
                    src={avatar}
                    alt={authMember?.memberNick ?? "User"}
                  />
                  <img
                    className="ck-side-badge"
                    src={
                      authMember?.memberType === MemberType.MASTER
                        ? "/icons/master-badge.svg"
                        : "/icons/user-badge.svg"
                    }
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <div className="ck-side-nick">{authMember?.memberNick}</div>
                <div className="ck-side-role">{authMember?.memberType}</div>

                <div className="ck-side-divider" />

                <div className="ck-side-row">
                  <PhoneIcon fontSize="inherit" />
                  {authMember?.memberPhone || "No phone number"}
                </div>
                <div className="ck-side-row">
                  <PlaceIcon fontSize="inherit" />
                  {authMember?.memberAddress || "No address"}
                </div>

                <div className="ck-side-divider" />

                <div className="ck-side-points">
                  <StarBorderIcon fontSize="small" />
                  {authMember?.memberPoints ?? 0} pts
                </div>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EventNoteIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/my-bookings")}
                >
                  My bookings
                </Button>
              </div>

              {authMember?.memberDesc ? (
                <div className="ck-side-card" style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.4,
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 8,
                    }}
                  >
                    About
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)" }}>
                    {authMember.memberDesc}
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}

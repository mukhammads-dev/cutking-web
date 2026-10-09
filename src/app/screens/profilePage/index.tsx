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
import { useLanguage } from "../../hooks/useLanguage";
import { buildImageUrl } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

import "../../../styles/profile.css";
import "../../../styles/myBookings.css";

export default function ProfilePage() {
  const { t, te } = useLanguage();
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
          <div className="crumb">{t("profile.crumb")}</div>
          <h1>{t("profile.title")}</h1>
          <p>{t("profile.desc")}</p>
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
                <div className="ck-side-role">{te(authMember?.memberType)}</div>

                <div className="ck-side-divider" />

                <div className="ck-side-row">
                  <PhoneIcon fontSize="inherit" />
                  {authMember?.memberPhone || t("myBookings.noPhone")}
                </div>
                <div className="ck-side-row">
                  <PlaceIcon fontSize="inherit" />
                  {authMember?.memberAddress || t("myBookings.noAddress")}
                </div>

                <div className="ck-side-divider" />

                <div className="ck-side-points">
                  <StarBorderIcon fontSize="small" />
                  {authMember?.memberPoints ?? 0} {t("home.topUsers.pts")}
                </div>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EventNoteIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/my-bookings")}
                >
                  {t("profile.myBookingsBtn")}
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
                    {t("profile.about")}
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

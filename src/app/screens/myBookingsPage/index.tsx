import React, { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import BookingList, { BookingAction } from "./BookingList";
import Loader from "../../components/common/Loader";

import {
  setPausedBookings,
  setProcessBookings,
  setFinishedBookings,
} from "./slice";
import {
  retrievePausedBookings,
  retrieveProcessBookings,
  retrieveFinishedBookings,
} from "./selector";

import { useGlobals } from "../../hooks/useGlobals";
import { useLanguage } from "../../hooks/useLanguage";
import BookingService from "../../services/BookingService";
import { Booking } from "../../../lib/types/booking";
import { BookingStatus } from "../../../lib/enums/booking.enum";
import { MemberType } from "../../../lib/enums/member.enum";
import { buildImageUrl, Messages, PAGE_LIMIT } from "../../../lib/config";
import {
  sweetConfirm,
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";

import "../../../styles/myBookings.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedBookings: (data: Booking[]) => dispatch(setPausedBookings(data)),
  setProcessBookings: (data: Booking[]) => dispatch(setProcessBookings(data)),
  setFinishedBookings: (data: Booking[]) => dispatch(setFinishedBookings(data)),
});

const bookingsRetriever = createSelector(
  retrievePausedBookings,
  retrieveProcessBookings,
  retrieveFinishedBookings,
  (pausedBookings, processBookings, finishedBookings) => ({
    pausedBookings,
    processBookings,
    finishedBookings,
  })
);

export default function MyBookingsPage() {
  const { t, te } = useLanguage();
  const { setPausedBookings, setProcessBookings, setFinishedBookings } =
    actionDispatch(useDispatch());
  const { pausedBookings, processBookings, finishedBookings } =
    useSelector(bookingsRetriever);

  const { authMember, bookingBuilder, setBookingBuilder } = useGlobals();

  const [tab, setTab] = useState("1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const booking = new BookingService();
    const base = { page: 1, limit: PAGE_LIMIT.bookings };

    Promise.all([
      booking.getMyBookings({ ...base, bookingStatus: BookingStatus.PAUSE }),
      booking.getMyBookings({ ...base, bookingStatus: BookingStatus.PROCESS }),
      booking.getMyBookings({ ...base, bookingStatus: BookingStatus.FINISH }),
    ])
      .then(([paused, process, finished]) => {
        if (!alive) return;
        setPausedBookings(paused);
        setProcessBookings(process);
        setFinishedBookings(finished);
      })
      .catch((err) => console.error("MyBookingsPage:", err))
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingBuilder]);

  const updateStatus = async (
    booking: Booking,
    status: BookingStatus,
    question: string,
    successText: string
  ) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const confirmed = await sweetConfirm(question);
      if (!confirmed) return;

      const service = new BookingService();
      await service.updateBooking({
        bookingId: booking._id,
        bookingStatus: status,
      });

      await sweetTopSuccessAlert(successText, 1400);
      setBookingBuilder(new Date());
    } catch (err) {
      await sweetErrorHandling(err);
    }
  };

  const pausedActions: BookingAction[] = [
    {
      label: t("myBookings.cancel"),
      variant: "outlined",
      color: "error",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.DELETE,
          t("myBookings.cancelQuestion"),
          t("myBookings.cancelledAlert")
        ),
    },
    {
      label: t("myBookings.confirm"),
      variant: "contained",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.PROCESS,
          t("myBookings.confirmQuestion"),
          t("myBookings.confirmedAlert")
        ),
    },
  ];

  const processActions: BookingAction[] = [
    {
      label: t("myBookings.cancel"),
      variant: "outlined",
      color: "error",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.DELETE,
          t("myBookings.cancelConfirmedQuestion"),
          t("myBookings.cancelledAlert")
        ),
    },
    {
      label: t("myBookings.markAsDone"),
      variant: "contained",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.FINISH,
          t("myBookings.markDoneQuestion"),
          t("myBookings.completedAlert")
        ),
    },
  ];

  const handleTabChange = (_e: SyntheticEvent, value: string) => setTab(value);

  const avatar = buildImageUrl(
    authMember?.memberImage,
    "/icons/default-user.svg"
  );

  return (
    <div className="my-bookings-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">{t("myBookings.crumb")}</div>
          <h1>{t("myBookings.title")}</h1>
          <p>{t("myBookings.desc")}</p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Container maxWidth="lg">
          <div className="ck-bookings-grid">
            <div className="ck-tabs-wrap">
              <div className="ck-tabs-head">
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab
                    label={`${t("myBookings.pending")} (${pausedBookings.length})`}
                    value="1"
                  />
                  <Tab
                    label={`${t("myBookings.confirmed")} (${processBookings.length})`}
                    value="2"
                  />
                  <Tab
                    label={`${t("myBookings.completed")} (${finishedBookings.length})`}
                    value="3"
                  />
                </Tabs>
              </div>

              <div className="ck-tabs-body">
                {loading ? (
                  <Loader text={t("myBookings.loading")} />
                ) : (
                  <>
                    {tab === "1" ? (
                      <BookingList
                        bookings={pausedBookings}
                        actions={pausedActions}
                        emptyTitle={t("myBookings.emptyPendingTitle")}
                        emptyText={t("myBookings.emptyPendingText")}
                      />
                    ) : null}

                    {tab === "2" ? (
                      <BookingList
                        bookings={processBookings}
                        actions={processActions}
                        emptyTitle={t("myBookings.emptyConfirmedTitle")}
                        emptyText={t("myBookings.emptyConfirmedText")}
                      />
                    ) : null}

                    {tab === "3" ? (
                      <BookingList
                        bookings={finishedBookings}
                        emptyTitle={t("myBookings.emptyCompletedTitle")}
                        emptyText={t("myBookings.emptyCompletedText")}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>

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
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}

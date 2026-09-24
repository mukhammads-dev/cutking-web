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
      label: "Cancel",
      variant: "outlined",
      color: "error",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.DELETE,
          "Cancel this booking?",
          "Booking cancelled"
        ),
    },
    {
      label: "Confirm",
      variant: "contained",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.PROCESS,
          "Confirm this booking?",
          "Booking confirmed"
        ),
    },
  ];

  const processActions: BookingAction[] = [
    {
      label: "Cancel",
      variant: "outlined",
      color: "error",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.DELETE,
          "Cancel this confirmed booking?",
          "Booking cancelled"
        ),
    },
    {
      label: "Mark as done",
      variant: "contained",
      onClick: (booking) =>
        updateStatus(
          booking,
          BookingStatus.FINISH,
          "Mark this booking as done?",
          "Booking completed"
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
          <div className="crumb">My account</div>
          <h1>My bookings</h1>
          <p>
            All your bookings, past and upcoming.
          </p>
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
                    label={`Pending (${pausedBookings.length})`}
                    value="1"
                  />
                  <Tab
                    label={`Confirmed (${processBookings.length})`}
                    value="2"
                  />
                  <Tab
                    label={`Completed (${finishedBookings.length})`}
                    value="3"
                  />
                </Tabs>
              </div>

              <div className="ck-tabs-body">
                {loading ? (
                  <Loader text="Loading bookings…" />
                ) : (
                  <>
                    {tab === "1" ? (
                      <BookingList
                        bookings={pausedBookings}
                        actions={pausedActions}
                        emptyTitle="Nothing pending"
                        emptyText="New bookings appear here first."
                      />
                    ) : null}

                    {tab === "2" ? (
                      <BookingList
                        bookings={processBookings}
                        actions={processActions}
                        emptyTitle="Nothing confirmed"
                        emptyText="Confirmed bookings appear here."
                      />
                    ) : null}

                    {tab === "3" ? (
                      <BookingList
                        bookings={finishedBookings}
                        emptyTitle="Nothing completed yet"
                        emptyText="Finished visits are kept here."
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
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}

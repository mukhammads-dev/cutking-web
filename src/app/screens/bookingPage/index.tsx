import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SelectMaster from "./SelectMaster";
import SelectDateTime from "./SelectDateTime";
import BookingSummary from "./BookingSummary";
import EmptyState from "../../components/common/EmptyState";

import { setBookingMasters, resetBookingSelection } from "./slice";
import { useAppSelector } from "../../hooks";
import { useGlobals } from "../../hooks/useGlobals";

import MemberService from "../../services/MemberService";
import BookingService from "../../services/BookingService";

import { Master } from "../../../lib/types/member";
import { CartItem } from "../../../lib/types/search";
import { buildImageUrl, Messages } from "../../../lib/config";
import { formatPrice } from "../../../lib/utils/format";
import { formatDuration } from "../../../lib/utils/date";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";

import "../../../styles/booking.css";
import "../../../styles/cards.css";
import "../../../styles/masters.css";

const actionDispatch = (dispatch: Dispatch) => ({
  setBookingMasters: (data: Master[]) => dispatch(setBookingMasters(data)),
  resetBookingSelection: () => dispatch(resetBookingSelection()),
});

interface BookingPageProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalDuration: number;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  onRequireAuth: () => void;
}

export default function BookingPage(props: BookingPageProps) {
  const {
    cartItems,
    totalPrice,
    totalDuration,
    onDelete,
    onDeleteAll,
    onRequireAuth,
  } = props;

  const navigate = useNavigate();
  const { setBookingMasters, resetBookingSelection } = actionDispatch(
    useDispatch()
  );
  const { authMember, setBookingBuilder } = useGlobals();

  const masters = useAppSelector((state) => state.bookingPage.masters);
  const selectedMasterId = useAppSelector(
    (state) => state.bookingPage.selectedMasterId
  );
  const selectedDate = useAppSelector(
    (state) => state.bookingPage.selectedDate
  );
  const selectedTime = useAppSelector(
    (state) => state.bookingPage.selectedTime
  );

  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let alive = true;
    const member = new MemberService();

    member
      .getMasters()
      .then((data) => {
        if (alive) setBookingMasters(data);
      })
      .catch((err) => console.error("BookingPage.masters:", err));

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedMaster =
    masters.find((m) => m._id === selectedMasterId) ?? null;

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (!authMember) {
        onRequireAuth();
        throw new Error(Messages.error2);
      }
      if (cartItems.length === 0) throw new Error(Messages.error4);
      if (!selectedMasterId) throw new Error(Messages.error7);
      if (!selectedDate || !selectedTime) throw new Error(Messages.error6);

      const booking = new BookingService();
      await booking.createBooking(cartItems, {
        masterId: selectedMasterId,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
      });

      onDeleteAll();
      resetBookingSelection();
      setNote("");

      setBookingBuilder(new Date());

      await sweetTopSuccessAlert("Booking received", 1600);
      navigate("/my-bookings");
    } catch (err) {
      await sweetErrorHandling(err);
    } finally {
      setSubmitting(false);
    }
  };

  const step1Done = cartItems.length > 0;
  const step2Done = Boolean(selectedMasterId);
  const step3Done = Boolean(selectedDate && selectedTime);

  const stepClass = (done: boolean, current: boolean) =>
    done ? "ck-step done" : current ? "ck-step current" : "ck-step";

  return (
    <div className="booking-page">
      <div className="ck-page-head">
        <Container maxWidth="lg">
          <div className="crumb">Booking</div>
          <h1>Book your visit</h1>
          <p>
            Choose a service, a barber and a time. We'll confirm your booking.
          </p>
        </Container>
      </div>

      <div className="ck-page-body">
        <Container maxWidth="lg">
          <div className="ck-steps">
            <div className={stepClass(step1Done, !step1Done)}>
              <span className="num">1</span> Service
            </div>
            <span className="ck-step-sep" />
            <div className={stepClass(step2Done, step1Done && !step2Done)}>
              <span className="num">2</span> Barber
            </div>
            <span className="ck-step-sep" />
            <div className={stepClass(step3Done, step2Done && !step3Done)}>
              <span className="num">3</span> Date & time
            </div>
          </div>

          {cartItems.length === 0 ? (
            <EmptyState
              title="Nothing selected yet"
              text="Choose a service first, then choose a time."
              action={
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/services")}
                >
                  See services
                </Button>
              }
            />
          ) : (
            <div className="ck-booking-grid">
              <div>
                <div className="ck-panel">
                  <div className="ck-panel-head">
                    <div className="ck-panel-title">
                      <span className="idx">1</span>
                      Selected services ({cartItems.length})
                    </div>
                    <Button
                      size="small"
                      variant="text"
                      sx={{ color: "var(--muted)" }}
                      onClick={() => navigate("/services")}
                    >
                      Add more
                    </Button>
                  </div>
                  <div className="ck-panel-body">
                    {cartItems.map((item) => (
                      <div key={item._id} className="ck-summary-item">
                        <img
                          src={buildImageUrl(item.image)}
                          alt={item.name}
                        />
                        <div className="info">
                          <div className="nm">{item.name}</div>
                          <div className="mt">
                            {item.quantity} × {formatDuration(item.duration)}
                          </div>
                        </div>
                        <span className="pr">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <SelectMaster />
                <SelectDateTime />
              </div>

              <BookingSummary
                cartItems={cartItems}
                totalPrice={totalPrice}
                totalDuration={totalDuration}
                master={selectedMaster}
                date={selectedDate}
                time={selectedTime}
                note={note}
                onNoteChange={setNote}
                onDelete={onDelete}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

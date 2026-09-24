import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { setSelectedDate, setSelectedTime } from "./slice";
import {
  retrieveBusyTimes,
  retrieveSelectedDate,
  retrieveSelectedTime,
} from "./selector";
import {
  buildDateRange,
  buildTimeSlots,
  toIsoDate,
  weekdayShort,
} from "../../../lib/utils/date";

const actionDispatch = (dispatch: Dispatch) => ({
  setSelectedDate: (date: string | null) => dispatch(setSelectedDate(date)),
  setSelectedTime: (time: string | null) => dispatch(setSelectedTime(time)),
});

const dateTimeRetriever = createSelector(
  retrieveSelectedDate,
  retrieveSelectedTime,
  retrieveBusyTimes,
  (selectedDate, selectedTime, busyTimes) => ({
    selectedDate,
    selectedTime,
    busyTimes,
  })
);

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function SelectDateTime() {
  const { setSelectedDate, setSelectedTime } = actionDispatch(useDispatch());
  const { selectedDate, selectedTime, busyTimes } =
    useSelector(dateTimeRetriever);

  const days = useMemo(() => buildDateRange(), []);

  const slots = useMemo(() => buildTimeSlots(selectedDate), [selectedDate]);

  return (
    <div className="ck-panel">
      <div className="ck-panel-head">
        <div className="ck-panel-title">
          <span className="idx">3</span>
          Date and time
        </div>
      </div>

      <div className="ck-panel-body">
        <div className="ck-date-row" role="group" aria-label="Choose a date">
          {days.map((day) => {
            const iso = toIsoDate(day);
            const active = selectedDate === iso;
            return (
              <button
                key={iso}
                type="button"
                className={active ? "ck-date-cell active" : "ck-date-cell"}
                onClick={() => setSelectedDate(iso)}
                aria-pressed={active}
              >
                <div className="wd">{weekdayShort(day)}</div>
                <div className="dd">{day.getDate()}</div>
                <div className="mm">{MONTHS_SHORT[day.getMonth()]}</div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 22 }}>
          {!selectedDate ? (
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Choose a day first to see free times.
            </p>
          ) : slots.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              No free times left this day. Try another.
            </p>
          ) : (
            <div className="ck-slot-grid" role="group" aria-label="Choose a time">
              {slots.map((slot) => {
                const busy = busyTimes.includes(slot);
                const active = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={busy}
                    className={active ? "ck-slot active" : "ck-slot"}
                    onClick={() => setSelectedTime(slot)}
                    aria-pressed={active}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectBookingPage = (state: AppRootState) => state.bookingPage;

export const retrieveBookingMasters = createSelector(
  selectBookingPage,
  (bookingPage) => bookingPage.masters
);

export const retrieveSelectedMasterId = createSelector(
  selectBookingPage,
  (bookingPage) => bookingPage.selectedMasterId
);

export const retrieveSelectedDate = createSelector(
  selectBookingPage,
  (bookingPage) => bookingPage.selectedDate
);

export const retrieveSelectedTime = createSelector(
  selectBookingPage,
  (bookingPage) => bookingPage.selectedTime
);

export const retrieveBusyTimes = createSelector(
  selectBookingPage,
  (bookingPage) => bookingPage.busyTimes
);

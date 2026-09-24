import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectMyBookingsPage = (state: AppRootState) => state.myBookingsPage;

export const retrievePausedBookings = createSelector(
  selectMyBookingsPage,
  (page) => page.pausedBookings
);

export const retrieveProcessBookings = createSelector(
  selectMyBookingsPage,
  (page) => page.processBookings
);

export const retrieveFinishedBookings = createSelector(
  selectMyBookingsPage,
  (page) => page.finishedBookings
);

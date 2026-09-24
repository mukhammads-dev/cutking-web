import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyBookingsPageState } from "../../../lib/types/screen";
import { Booking } from "../../../lib/types/booking";

const initialState: MyBookingsPageState = {
  pausedBookings: [],
  processBookings: [],
  finishedBookings: [],
};

const myBookingsPageSlice = createSlice({
  name: "myBookingsPage",
  initialState,
  reducers: {
    setPausedBookings: (state, action: PayloadAction<Booking[]>) => {
      state.pausedBookings = action.payload;
    },
    setProcessBookings: (state, action: PayloadAction<Booking[]>) => {
      state.processBookings = action.payload;
    },
    setFinishedBookings: (state, action: PayloadAction<Booking[]>) => {
      state.finishedBookings = action.payload;
    },
  },
});

export const {
  setPausedBookings,
  setProcessBookings,
  setFinishedBookings,
} = myBookingsPageSlice.actions;

const MyBookingsPageReducer = myBookingsPageSlice.reducer;
export default MyBookingsPageReducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingPageState } from "../../../lib/types/screen";
import { Master } from "../../../lib/types/member";

const initialState: BookingPageState = {
  masters: [],
  selectedMasterId: null,
  selectedDate: null,
  selectedTime: null,
  busyTimes: [],
};

const bookingPageSlice = createSlice({
  name: "bookingPage",
  initialState,
  reducers: {
    setBookingMasters: (state, action: PayloadAction<Master[]>) => {
      state.masters = action.payload;
    },
    setSelectedMasterId: (state, action: PayloadAction<string | null>) => {
      state.selectedMasterId = action.payload;

      state.selectedTime = null;
    },
    setSelectedDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
      state.selectedTime = null;
    },
    setSelectedTime: (state, action: PayloadAction<string | null>) => {
      state.selectedTime = action.payload;
    },
    setBusyTimes: (state, action: PayloadAction<string[]>) => {
      state.busyTimes = action.payload;
    },
    resetBookingSelection: (state) => {
      state.selectedMasterId = null;
      state.selectedDate = null;
      state.selectedTime = null;
      state.busyTimes = [];
    },
  },
});

export const {
  setBookingMasters,
  setSelectedMasterId,
  setSelectedDate,
  setSelectedTime,
  setBusyTimes,
  resetBookingSelection,
} = bookingPageSlice.actions;

const BookingPageReducer = bookingPageSlice.reducer;
export default BookingPageReducer;

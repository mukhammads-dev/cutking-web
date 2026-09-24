import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ServicesPageReducer from "./screens/servicesPage/slice";
import MastersPageReducer from "./screens/mastersPage/slice";
import BookingPageReducer from "./screens/bookingPage/slice";
import MyBookingsPageReducer from "./screens/myBookingsPage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
    servicesPage: ServicesPageReducer,
    mastersPage: MastersPageReducer,
    bookingPage: BookingPageReducer,
    myBookingsPage: MyBookingsPageReducer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

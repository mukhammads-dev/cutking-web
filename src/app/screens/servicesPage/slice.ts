import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicesPageState } from "../../../lib/types/screen";
import { Service } from "../../../lib/types/service";
import { Member } from "../../../lib/types/member";

const initialState: ServicesPageState = {
  services: [],
  chosenService: null,
  barber: null,
};

const servicesPageSlice = createSlice({
  name: "servicesPage",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    setChosenService: (state, action: PayloadAction<Service | null>) => {
      state.chosenService = action.payload;
    },
    setBarber: (state, action: PayloadAction<Member | null>) => {
      state.barber = action.payload;
    },
  },
});

export const { setServices, setChosenService, setBarber } =
  servicesPageSlice.actions;

const ServicesPageReducer = servicesPageSlice.reducer;
export default ServicesPageReducer;

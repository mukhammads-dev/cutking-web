import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";
import { Service } from "../../../lib/types/service";
import { Master, Member } from "../../../lib/types/member";

const initialState: HomePageState = {
  signatureServices: [],
  newServices: [],
  topMasters: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setSignatureServices: (state, action: PayloadAction<Service[]>) => {
      state.signatureServices = action.payload;
    },
    setNewServices: (state, action: PayloadAction<Service[]>) => {
      state.newServices = action.payload;
    },
    setTopMasters: (state, action: PayloadAction<Master[]>) => {
      state.topMasters = action.payload;
    },
    setTopUsers: (state, action: PayloadAction<Member[]>) => {
      state.topUsers = action.payload;
    },
  },
});

export const {
  setSignatureServices,
  setNewServices,
  setTopMasters,
  setTopUsers,
} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;

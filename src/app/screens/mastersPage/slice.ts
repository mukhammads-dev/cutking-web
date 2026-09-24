import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MastersPageState } from "../../../lib/types/screen";
import { Master } from "../../../lib/types/member";

const initialState: MastersPageState = {
  masters: [],
  chosenMaster: null,
};

const mastersPageSlice = createSlice({
  name: "mastersPage",
  initialState,
  reducers: {
    setMasters: (state, action: PayloadAction<Master[]>) => {
      state.masters = action.payload;
    },
    setChosenMaster: (state, action: PayloadAction<Master | null>) => {
      state.chosenMaster = action.payload;
    },
  },
});

export const { setMasters, setChosenMaster } = mastersPageSlice.actions;

const MastersPageReducer = mastersPageSlice.reducer;
export default MastersPageReducer;

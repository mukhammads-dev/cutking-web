import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectMastersPage = (state: AppRootState) => state.mastersPage;

export const retrieveMasters = createSelector(
  selectMastersPage,
  (mastersPage) => mastersPage.masters
);

export const retrieveChosenMaster = createSelector(
  selectMastersPage,
  (mastersPage) => mastersPage.chosenMaster
);

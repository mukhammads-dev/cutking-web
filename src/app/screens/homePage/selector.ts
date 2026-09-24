import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveSignatureServices = createSelector(
  selectHomePage,
  (homePage) => homePage.signatureServices
);

export const retrieveNewServices = createSelector(
  selectHomePage,
  (homePage) => homePage.newServices
);

export const retrieveTopMasters = createSelector(
  selectHomePage,
  (homePage) => homePage.topMasters
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (homePage) => homePage.topUsers
);

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectServicesPage = (state: AppRootState) => state.servicesPage;

export const retrieveServices = createSelector(
  selectServicesPage,
  (servicesPage) => servicesPage.services
);

export const retrieveChosenService = createSelector(
  selectServicesPage,
  (servicesPage) => servicesPage.chosenService
);

export const retrieveBarber = createSelector(
  selectServicesPage,
  (servicesPage) => servicesPage.barber
);

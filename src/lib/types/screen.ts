import { Booking } from "./booking";
import { Master, Member } from "./member";
import { Service } from "./service";

export interface AppRootState {
  homePage: HomePageState;
  servicesPage: ServicesPageState;
  mastersPage: MastersPageState;
  bookingPage: BookingPageState;
  myBookingsPage: MyBookingsPageState;
}

export interface HomePageState {
  signatureServices: Service[];
  newServices: Service[];
  topMasters: Master[];
  topUsers: Member[];
}

export interface ServicesPageState {
  services: Service[];
  chosenService: Service | null;
  barber: Member | null;
}

export interface MastersPageState {
  masters: Master[];
  chosenMaster: Master | null;
}

export interface BookingPageState {
  masters: Master[];
  selectedMasterId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  busyTimes: string[];
}

export interface MyBookingsPageState {
  pausedBookings: Booking[];
  processBookings: Booking[];
  finishedBookings: Booking[];
}

import { BookingStatus } from "../enums/booking.enum";
import { Service } from "./service";

export interface BookingItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  bookingId: string;
  serviceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  _id: string;
  bookingTotal: number;
  bookingStatus: BookingStatus;
  bookingDate: Date;

  bookingTime: string;
  memberId: string;
  masterId: string;
  bookingNote?: string;
  createdAt: Date;
  updatedAt: Date;

  bookingItems: BookingItem[];
  serviceData: Service[];
}

export interface BookingItemInput {
  itemQuantity: number;
  itemPrice: number;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  masterId: string;
}

export interface BookingInquiry {
  page: number;
  limit: number;
  bookingStatus: BookingStatus;
}

export interface BookingUpdateInput {
  bookingId: string;
  bookingStatus: BookingStatus;
}

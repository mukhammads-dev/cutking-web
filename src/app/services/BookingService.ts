import apiClient from "./apiClient";
import {
  Booking,
  BookingInquiry,
  BookingItemInput,
  BookingUpdateInput,
} from "../../lib/types/booking";
import { CartItem } from "../../lib/types/search";

export interface BookingContext {
  masterId: string;
  bookingDate: string;
  bookingTime: string;
}

class BookingService {
  public async createBooking(
    cartItems: CartItem[],
    context: BookingContext
  ): Promise<Booking> {
    try {
      const bookingItems: BookingItemInput[] = cartItems.map((item) => ({
        itemQuantity: item.quantity,
        itemPrice: item.price,
        serviceId: item._id,
        masterId: context.masterId,
        bookingDate: context.bookingDate,
        bookingTime: context.bookingTime,
      }));

      const { data } = await apiClient.post<Booking>(
        "/booking/create",
        bookingItems
      );
      return data;
    } catch (err) {
      console.error("BookingService.createBooking:", err);
      throw err;
    }
  }

  public async getMyBookings(input: BookingInquiry): Promise<Booking[]> {
    try {
      const { data } = await apiClient.get<Booking[]>("/booking/all", {
        params: {
          page: input.page,
          limit: input.limit,
          bookingStatus: input.bookingStatus,
        },
      });
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("BookingService.getMyBookings:", err);
      throw err;
    }
  }

  public async updateBooking(input: BookingUpdateInput): Promise<Booking> {
    try {
      const { data } = await apiClient.post<Booking>("/booking/update", input);
      return data;
    } catch (err) {
      console.error("BookingService.updateBooking:", err);
      throw err;
    }
  }
}

export default BookingService;

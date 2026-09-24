import React from "react";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { Booking, BookingItem } from "../../../lib/types/booking";
import { Service } from "../../../lib/types/service";
import { BookingStatus } from "../../../lib/enums/booking.enum";
import { buildImageUrl } from "../../../lib/config";
import { formatPrice } from "../../../lib/utils/format";
import { formatDayMonth, formatDuration } from "../../../lib/utils/date";
import EmptyState from "../../components/common/EmptyState";

const STATUS_META: Record<
  BookingStatus,
  { className: string; label: string }
> = {
  [BookingStatus.PAUSE]: { className: "badge badge-pause", label: "Pending" },
  [BookingStatus.PROCESS]: {
    className: "badge badge-process",
    label: "Confirmed",
  },
  [BookingStatus.FINISH]: {
    className: "badge badge-finish",
    label: "Completed",
  },
  [BookingStatus.DELETE]: {
    className: "badge badge-delete",
    label: "Cancelled",
  },
};

export interface BookingAction {
  label: string;
  variant: "contained" | "outlined" | "text";
  color?: "primary" | "error";
  onClick: (booking: Booking) => void;
}

interface BookingListProps {
  bookings: Booking[];
  emptyTitle: string;
  emptyText: string;
  actions?: BookingAction[];
}

export default function BookingList({
  bookings,
  emptyTitle,
  emptyText,
  actions = [],
}: BookingListProps) {
  if (!bookings || bookings.length === 0) {
    return <EmptyState title={emptyTitle} text={emptyText} />;
  }

  return (
    <>
      {bookings.map((booking) => {
        const meta =
          STATUS_META[booking.bookingStatus] ?? STATUS_META[BookingStatus.PAUSE];

        return (
          <article key={booking._id} className="ck-booking-card">
            <header className="ck-booking-head">
              <div className="ck-booking-when">
                <CalendarMonthIcon fontSize="inherit" />
                {formatDayMonth(booking.bookingDate)}
                <span className="time">{booking.bookingTime}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="ck-booking-id">
                  #{String(booking._id).slice(-6).toUpperCase()}
                </span>
                <span className={meta.className}>{meta.label}</span>
              </div>
            </header>

            <div className="ck-booking-items">
              {(booking.bookingItems ?? []).map((item: BookingItem) => {
                const service: Service | undefined = (
                  booking.serviceData ?? []
                ).find((s: Service) => String(s._id) === String(item.serviceId));

                return (
                  <div key={item._id} className="ck-booking-row">
                    <img
                      src={buildImageUrl(service?.serviceImages?.[0])}
                      alt={service?.serviceName ?? "Service"}
                    />
                    <div className="info">
                      <div className="nm">
                        {service?.serviceName ?? "Service removed"}
                      </div>
                      <div className="mt">
                        {formatPrice(item.itemPrice)}
                        {service?.serviceDuration
                          ? ` · ${formatDuration(service.serviceDuration)}`
                          : ""}
                      </div>
                    </div>
                    <div className="calc">
                      × {item.itemQuantity} ={" "}
                      <b>{formatPrice(item.itemPrice * item.itemQuantity)}</b>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="ck-booking-foot">
              <div className="ck-booking-total">
                <span className="lbl">Total</span>
                <span className="val">{formatPrice(booking.bookingTotal)}</span>
              </div>

              {actions.length > 0 ? (
                <div className="ck-booking-actions">
                  {actions.map((action) => (
                    <Button
                      key={action.label}
                      size="small"
                      variant={action.variant}
                      color={action.color ?? "primary"}
                      onClick={() => action.onClick(booking)}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </footer>
          </article>
        );
      })}
    </>
  );
}

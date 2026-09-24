import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import { CartItem } from "../../../lib/types/search";
import { Master } from "../../../lib/types/member";
import { buildImageUrl } from "../../../lib/config";
import { formatPrice } from "../../../lib/utils/format";
import {
  addMinutesToTime,
  formatDayMonth,
  formatDuration,
} from "../../../lib/utils/date";

interface BookingSummaryProps {
  cartItems: CartItem[];
  totalPrice: number;
  totalDuration: number;
  master: Master | null;
  date: string | null;
  time: string | null;
  note: string;
  onNoteChange: (value: string) => void;
  onDelete: (item: CartItem) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export default function BookingSummary(props: BookingSummaryProps) {
  const {
    cartItems,
    totalPrice,
    totalDuration,
    master,
    date,
    time,
    note,
    onNoteChange,
    onDelete,
    onSubmit,
    submitting,
  } = props;

  const ready =
    cartItems.length > 0 && Boolean(master) && Boolean(date) && Boolean(time);

  const endTime = time ? addMinutesToTime(time, totalDuration) : null;

  return (
    <aside className="ck-summary">
      <div className="ck-summary-head">
        <h4>Your booking</h4>
        <p>Check before you confirm</p>
      </div>

      <div className="ck-summary-body">
        {cartItems.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--muted)", padding: "8px 0 14px" }}>
            Nothing selected yet. Add a service to start.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="ck-summary-item">
              <img src={buildImageUrl(item.image)} alt={item.name} />
              <div className="info">
                <div className="nm">{item.name}</div>
                <div className="mt">
                  {item.quantity} × {formatDuration(item.duration)}
                </div>
              </div>
              <span className="pr">
                {formatPrice(item.price * item.quantity)}
              </span>
              <IconButton size="small" onClick={() => onDelete(item)}>
                <CloseIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </div>
          ))
        )}

        <div className="ck-summary-facts">
          <div className="ck-summary-fact">
            <span className="k">
              <PersonOutlineIcon fontSize="inherit" /> Barber
            </span>
            <span className={master ? "v" : "v empty"}>
              {master ? master.memberNick : "not selected"}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <CalendarMonthIcon fontSize="inherit" /> Date
            </span>
            <span className={date ? "v" : "v empty"}>
              {date ? formatDayMonth(date) : "not selected"}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <ScheduleIcon fontSize="inherit" /> Time
            </span>
            <span className={time ? "v" : "v empty"}>
              {time ? `${time}${endTime ? ` — ${endTime}` : ""}` : "not selected"}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <TimelapseIcon fontSize="inherit" /> Duration
            </span>
            <span className={totalDuration ? "v" : "v empty"}>
              {totalDuration ? formatDuration(totalDuration) : "—"}
            </span>
          </div>
        </div>

        <div className="ck-summary-note">
          <TextField
            label="Note (optional)"
            placeholder="e.g. short on the sides, longer on top"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            multiline
            minRows={2}
            fullWidth
            size="small"
          />
        </div>

        <div className="ck-summary-total">
          <span className="lbl">Total</span>
          <span className="val">{formatPrice(totalPrice)}</span>
        </div>

        <Button
          fullWidth
          variant="contained"
          size="large"
          disabled={!ready || submitting}
          startIcon={<EventAvailableIcon />}
          onClick={onSubmit}
        >
          {submitting ? "Sending…" : "Confirm booking"}
        </Button>

        {!ready && cartItems.length > 0 ? (
          <p
            style={{
              fontSize: 11.5,
              color: "var(--muted)",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Choose a barber, a date and a time
          </p>
        ) : null}
      </div>
    </aside>
  );
}

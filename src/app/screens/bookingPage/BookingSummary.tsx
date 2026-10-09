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
import { useLanguage } from "../../hooks/useLanguage";

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

  const { t, lang } = useLanguage();

  const ready =
    cartItems.length > 0 && Boolean(master) && Boolean(date) && Boolean(time);

  const endTime = time ? addMinutesToTime(time, totalDuration) : null;

  return (
    <aside className="ck-summary">
      <div className="ck-summary-head">
        <h4>{t("bookingSummary.title")}</h4>
        <p>{t("bookingSummary.subtitle")}</p>
      </div>

      <div className="ck-summary-body">
        {cartItems.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--muted)", padding: "8px 0 14px" }}>
            {t("bookingSummary.empty")}
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
              <PersonOutlineIcon fontSize="inherit" /> {t("bookingSummary.barber")}
            </span>
            <span className={master ? "v" : "v empty"}>
              {master ? master.memberNick : t("common.notSelected")}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <CalendarMonthIcon fontSize="inherit" /> {t("bookingSummary.date")}
            </span>
            <span className={date ? "v" : "v empty"}>
              {date ? formatDayMonth(date, lang) : t("common.notSelected")}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <ScheduleIcon fontSize="inherit" /> {t("bookingSummary.time")}
            </span>
            <span className={time ? "v" : "v empty"}>
              {time
                ? `${time}${endTime ? ` — ${endTime}` : ""}`
                : t("common.notSelected")}
            </span>
          </div>

          <div className="ck-summary-fact">
            <span className="k">
              <TimelapseIcon fontSize="inherit" /> {t("bookingSummary.duration")}
            </span>
            <span className={totalDuration ? "v" : "v empty"}>
              {totalDuration ? formatDuration(totalDuration) : "—"}
            </span>
          </div>
        </div>

        <div className="ck-summary-note">
          <TextField
            label={t("bookingSummary.note")}
            placeholder={t("bookingSummary.notePlaceholder")}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            multiline
            minRows={2}
            fullWidth
            size="small"
          />
        </div>

        <div className="ck-summary-total">
          <span className="lbl">{t("bookingSummary.total")}</span>
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
          {submitting ? t("bookingSummary.sending") : t("bookingSummary.confirm")}
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
            {t("bookingSummary.helper")}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

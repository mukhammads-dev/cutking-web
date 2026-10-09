import { WORKING_HOURS, BOOKING_HORIZON_DAYS } from "../config";
import {
  DEFAULT_LANG,
  LangCode,
  MONTHS_FULL,
  WEEKDAYS_SHORT,
} from "../i18n/dictionary";

export const toIsoDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const weekdayShort = (date: Date, lang: LangCode = DEFAULT_LANG): string =>
  WEEKDAYS_SHORT[lang][date.getDay()];

export const formatDayMonth = (
  input: Date | string,
  lang: LangCode = DEFAULT_LANG
): string => {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "—";
  return `${MONTHS_FULL[lang][d.getMonth()]} ${d.getDate()}`;
};

export const formatDateTime = (
  input: Date | string,
  lang: LangCode = DEFAULT_LANG,
  time?: string
): string => {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "—";
  const base = `${MONTHS_FULL[lang][d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  return time ? `${base}, ${time}` : base;
};

export const buildDateRange = (days = BOOKING_HORIZON_DAYS): Date[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const list: Date[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (WORKING_HOURS.closedWeekdays.includes(d.getDay() as never)) continue;
    list.push(d);
  }
  return list;
};

export const buildTimeSlots = (dateIso: string | null): string[] => {
  const slots: string[] = [];
  const { open, close, stepMinutes } = WORKING_HOURS;

  const now = new Date();
  const isToday = dateIso === toIsoDate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let m = open * 60; m < close * 60; m += stepMinutes) {
    if (isToday && m <= nowMinutes) continue;
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots;
};

export const addMinutesToTime = (time: string, minutes: number): string => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

export const formatDuration = (minutes: number): string => {
  if (!minutes || minutes < 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

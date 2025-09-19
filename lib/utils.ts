import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...x: ClassValue[]) => twMerge(clsx(x));

export const LOCALE = "en-US";
export const TIME_ZONE = "America/Los_Angeles";

export const eDate = (d: string | Date) => (d instanceof Date ? d : new Date(d));

export const keyFor = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const getMonthMatrix = (first: Date) => {
  const y = first.getFullYear(), m = first.getMonth();
  const start = new Date(y, m, 1 - new Date(y, m, 1).getDay());
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const cell = new Date(start);
      cell.setDate(start.getDate() + w * 7 + d);
      week.push(cell);
    }
    weeks.push(week);
  }
  return weeks;
};

export const monthTitleFmt = new Intl.DateTimeFormat(LOCALE, {
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});

export const shortTime = (d: Date) => new Intl.DateTimeFormat(LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
}).format(d);

export const formatDay = (d: Date) => new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: TIME_ZONE,
}).format(d);

export const formatTimeRange = (start: Date, end?: Date) => {
  const s = shortTime(start);
  const e = end ? shortTime(end) : s;
  return s === e ? s : `${s}-${e}`;
};

"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/lib/menu-data";

/**
 * Computes the time remaining until the rooftop closes (or opens)
 * based on the HOURS table. Returns a live-updating string + state.
 */

type Status = "open" | "closing-soon" | "closed";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function parseHour(s: string): number {
  // "5:00 PM" → 17 (hours, fractional). "12:00 AM" → 0. "1:00 AM" → 1
  const m = s.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h + min / 60;
}

function getCurrentStatus(now: Date): {
  status: Status;
  closesAt: Date | null;
  opensAt: Date | null;
  closesInMs: number | null;
} {
  const day = DAY_NAMES[now.getDay()];
  const hours = HOURS.find((h) => h.day === day);
  if (!hours)
    return { status: "closed", closesAt: null, opensAt: null, closesInMs: null };

  const openH = parseHour(hours.open);
  let closeH = parseHour(hours.close);
  // If close is AM (e.g. 1:00 AM, 2:00 AM, 3:00 AM), it's next-day
  const closeIsNextDay = /AM/i.test(hours.close) && closeH < 12;
  // "12:00 AM" is midnight → end of day
  const isMidnightClose = hours.close.trim().toLowerCase() === "12:00 am";

  const todayOpen = new Date(now);
  todayOpen.setHours(Math.floor(openH), Math.round((openH % 1) * 60), 0, 0);

  const todayClose = new Date(now);
  if (closeIsNextDay || isMidnightClose) {
    // closeH for "1:00 AM" = 1 → next day at 1am
    if (isMidnightClose) {
      todayClose.setDate(todayClose.getDate() + 1);
      todayClose.setHours(0, 0, 0, 0);
    } else {
      todayClose.setDate(todayClose.getDate() + 1);
      todayClose.setHours(Math.floor(closeH), Math.round((closeH % 1) * 60), 0, 0);
    }
  } else {
    todayClose.setHours(Math.floor(closeH), Math.round((closeH % 1) * 60), 0, 0);
  }

  const ms = todayClose.getTime() - now.getTime();
  if (ms > 0) {
    // We're inside an open window (open <= now < close)
    if (now.getTime() >= todayOpen.getTime() || closeIsNextDay) {
      const status: Status = ms < 60 * 60 * 1000 ? "closing-soon" : "open";
      return {
        status,
        closesAt: todayClose,
        opensAt: null,
        closesInMs: ms,
      };
    }
  }

  // Closed → next open is today's open time (if later today) or next day
  const nextOpen = new Date(todayOpen);
  if (nextOpen.getTime() < now.getTime()) {
    nextOpen.setDate(nextOpen.getDate() + 1);
  }
  return {
    status: "closed",
    closesAt: null,
    opensAt: nextOpen,
    closesInMs: null,
  };
}

function formatHMS(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function useClosingCountdown() {
  // Start null on server, then sync on client mount via interval — no
  // synchronous setState in effect.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick(); // initial sync
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return {
      hydrated: false as const,
      status: "open" as Status,
      h: "--",
      m: "--",
      s: "--",
      closesAt: null,
      opensAt: null,
      closesInMs: null,
      label: "Closes in --:--:--",
    };
  }

  const { status, closesAt, opensAt, closesInMs } = getCurrentStatus(now);

  if (status === "closed" || !closesInMs) {
    // Format next open time
    const fmt = opensAt
      ? opensAt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      : "";
    return {
      hydrated: true as const,
      status,
      h: "--",
      m: "--",
      s: "--",
      closesAt: null,
      opensAt,
      closesInMs: null,
      label: `Opens at ${fmt}`,
    };
  }

  const { h, m, s } = formatHMS(closesInMs);
  return {
    hydrated: true as const,
    status,
    h,
    m,
    s,
    closesAt,
    opensAt: null,
    closesInMs,
    label: `Closes in ${h}:${m}:${s}`,
  };
}

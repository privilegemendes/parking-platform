import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
  accept: "application/json",
});

export const truncateSessionId = (sessionId: string) => {
  if (sessionId.length <= 12) return sessionId;

  // Get the first 8 characters and the last 8 characters
  const start = sessionId.slice(0, 4);
  const end = sessionId.slice(-4);

  // Combine them with ellipsis
  return `${start}...${end}`;
};

// Utility to format the duration as "N days, N hours" or just "N hours" if less than a day
export const formatDuration = (minutes: number): string => {
  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const remainingMinutes = minutes % 60;

  if (minutes === 0) {
    return "active";
  }

  if (days > 0) {
    return hours > 0
      ? `${days} day${days > 1 ? "s" : ""}, ${hours} hour${hours > 1 ? "s" : ""}`
      : `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
  }
};

export function getParkingSpaceType(parkingSpaceId: number): string {
  if (parkingSpaceId === 1) {
    return "Resident";
  } else {
    return "Visitor";
  }
}

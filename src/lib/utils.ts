import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ParkingSessionRowDto } from "~/types/parking-session";

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

  if (remainingMinutes === 0) {
    return "Pending";
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

export const getLabel = (vehicleType: string | null) => {
  switch (vehicleType) {
    case "MOTOR":
      return "Visitors Motorcycles";
    case "CAR":
      return "Visitors Cars";
    default:
      return "Residents";
  }
};

/**
 * Calculates total revenue, visitor cars revenue, and visitor motorcycles revenue, each rounded to two decimal places.
 * @param sessions Array of parking session objects.
 * @returns An object with total revenue, visitor cars revenue, and visitor motorcycles revenue.
 */
export function calculateRevenueBreakdown(sessions: ParkingSessionRowDto[]) {
  const rateBySpaceId: { [key: number]: number } = {
    2: 5.0, // €5.00 per hour for visitor cars (parkingSpaceId 2)
    3: 3.0, // €3.00 per hour for visitor motorcycles (parkingSpaceId 3)
  };

  let totalRevenue = 0;
  let visitorCarsRevenue = 0;
  let visitorsMotorRevenue = 0;

  sessions.forEach((session) => {
    if (
      session.isSessionEnded &&
      session.sessionLengthInHoursMinutes !== null
    ) {
      const hours = session.sessionLengthInHoursMinutes / 60;
      const rate = rateBySpaceId[session.parkingSpaceId] || 0;
      const revenue = hours * rate;

      if (session.parkingSpaceId === 2) {
        visitorCarsRevenue += revenue;
      } else if (session.parkingSpaceId === 3) {
        visitorsMotorRevenue += revenue;
      }

      totalRevenue += revenue;
    }
  });

  // Round each revenue value to two decimal places
  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    visitorCarsRevenue: Math.round(visitorCarsRevenue * 100) / 100,
    visitorsMotorRevenue: Math.round(visitorsMotorRevenue * 100) / 100,
  };
}

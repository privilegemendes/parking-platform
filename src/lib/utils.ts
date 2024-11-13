import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ParkingSessionRowDto } from "~/types/parking-session";

/**
 * Utility to merge Tailwind classes with conditional class support.
 * @param inputs - Class values to merge.
 * @returns A merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a delay for a specified amount of milliseconds.
 * @param ms - Milliseconds to wait.
 * @returns A promise that resolves after the specified delay.
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates authorization headers for API requests.
 * @param accessToken - Access token for authorization.
 * @returns An object with authorization and content-type headers.
 */
export const authHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

/**
 * Truncates a session ID to show the first 4 and last 4 characters, with ellipses in between if longer than 12 characters.
 * @param sessionId - The session ID string to truncate.
 * @returns A truncated session ID string.
 */
export const truncateSessionId = (sessionId: string): string =>
  sessionId.length <= 12
    ? sessionId
    : `${sessionId.slice(0, 4)}...${sessionId.slice(-4)}`;

/**
 * Formats a duration given in minutes into a human-readable string.
 * @param minutes - Duration in minutes.
 * @returns A formatted string in "N days, N hours, N mins" format.
 */
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

/**
 * Determines the type of parking space based on its ID.
 * @param parkingSpaceId - The parking space ID.
 * @returns "Resident" for ID 1, "Visitor" otherwise.
 */
export function getParkingSpaceType(parkingSpaceId: number): string {
  return parkingSpaceId === 1 ? "Resident" : "Visitor";
}

/**
 * Maps a vehicle type string to a descriptive label.
 * @param vehicleType - The vehicle type ("MOTOR", "CAR", or null).
 * @returns A descriptive label string based on vehicle type.
 */
export const getLabel = (vehicleType: string | null): string => {
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
 * @param sessions - Array of parking session objects.
 * @returns An object with total revenue, visitor cars revenue, and visitor motorcycles revenue.
 */
export function calculateRevenueBreakdown(sessions: ParkingSessionRowDto[]) {
  const rateBySpaceId: Record<number, number> = {
    2: 5.0, // €5.00 per hour for visitor cars
    3: 3.0, // €3.00 per hour for visitor motorcycles
  };

  let totalRevenue = 0;
  let visitorCarsRevenue = 0;
  let visitorsMotorRevenue = 0;

  sessions.forEach(
    ({ isSessionEnded, sessionLengthInHoursMinutes, parkingSpaceId }) => {
      if (isSessionEnded && sessionLengthInHoursMinutes !== null) {
        const hours = sessionLengthInHoursMinutes / 60;
        const rate = rateBySpaceId[parkingSpaceId] || 0;
        const revenue = hours * rate;

        if (parkingSpaceId === 2) visitorCarsRevenue += revenue;
        else if (parkingSpaceId === 3) visitorsMotorRevenue += revenue;

        totalRevenue += revenue;
      }
    }
  );

  // Round each revenue value to two decimal places
  return {
    totalRevenue: +totalRevenue.toFixed(2),
    visitorCarsRevenue: +visitorCarsRevenue.toFixed(2),
    visitorsMotorRevenue: +visitorsMotorRevenue.toFixed(2),
  };
}

/**
 * Retrieves a list of the longest active sessions, ordered by duration.
 * @param data - Array of parking session objects.
 * @returns Array of active sessions with calculated durations in descending order.
 */
export const getLongestActiveSessions = (data: ParkingSessionRowDto[]) => {
  if (!data) return [];

  const calculateDuration = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    return (now.getTime() - start.getTime()) / (1000 * 60); // Convert to minutes
  };

  return data
    .filter((session) => !session.isSessionEnded)
    .map((session) => ({
      vehicleLicensePlate: session.vehicleLicensePlate,
      vehicleType: session.vehicleType,
      parkingSpaceId: getParkingSpaceType(session.parkingSpaceId),
      calculatedDuration: calculateDuration(session.sessionStartedAt),
    }))
    .sort((a, b) => b.calculatedDuration - a.calculatedDuration);
};

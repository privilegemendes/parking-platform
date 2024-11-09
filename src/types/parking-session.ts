import { z } from "zod";

export const startParkingSessionDto = z.object({
  vehicleType: z.string(),
  isResident: z.boolean(),
  vehicleLicensePlate: z.string(),
});

export const startParkingSessionRequest = z.object({
  parkingSession: startParkingSessionDto,
});

export const parkingSessionStartedDto = z.object({
  parkingSessionId: z.string(),
  parkingSpaceId: z.number(),
  sessionStartedAt: z.string().datetime(),
  vehicleLicensePlate: z.string(),
});

export const parkingSessionStartedResponse = z.object({
  startedSession: parkingSessionStartedDto,
});

export const endParkingSessionDto = z.object({
  id: z.string(),
});

export const endParkingSessionRequest = z.object({
  parkingSession: endParkingSessionDto,
});

export const parkingSessionRowDto = z.object({
  parkingSessionId: z.string(),
  parkingSpaceId: z.number(),
  isSessionEnded: z.boolean(),
  sessionLengthInHoursMinutes: z.number().nullable(),
  sessionStartedAt: z.string().datetime(),
  sessionEndedAt: z.string().datetime().nullable(),
  vehicleLicensePlate: z.string(),
  vehicleType: z.string(),
});

export const parkingSessionsListResponse = z.object({
  parkingSessions: z.array(parkingSessionRowDto),
  parkingSessionsTotalCount: z.number(),
});

export const parkingSessionEndedDto = z.object({
  parkingSpaceId: z.number(),
  sessionLengthInHoursMinutes: z.number(),
});

export const parkingSessionEndedResponse = z.object({
  endedSession: parkingSessionEndedDto,
});

export type StartParkingSessionDto = z.infer<typeof startParkingSessionDto>;
export type StartParkingSessionRequest = z.infer<
  typeof startParkingSessionRequest
>;
export type ParkingSessionStartedDto = z.infer<typeof parkingSessionStartedDto>;
export type ParkingSessionStartedResponse = z.infer<
  typeof parkingSessionStartedResponse
>;
export type EndParkingSessionDto = z.infer<typeof endParkingSessionDto>;
export type EndParkingSessionRequest = z.infer<typeof endParkingSessionRequest>;
export type ParkingSessionEndedDto = z.infer<typeof parkingSessionEndedDto>;
export type ParkingSessionEndedResponse = z.infer<
  typeof parkingSessionEndedResponse
>;
export type ParkingSessionsListResponse = z.infer<
  typeof parkingSessionsListResponse
>;
export type ParkingSessionRowDto = z.infer<typeof parkingSessionRowDto>;

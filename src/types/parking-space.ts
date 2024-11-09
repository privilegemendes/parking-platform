import { z } from "zod";

export const parkingSpaceRowDto = z.object({
  parkingSpaceId: z.number(),
  isOccupied: z.boolean(),
  occupancy: z.number(),
  capacity: z.number(),
  vehicleType: z.string().nullable(),
});

export const parkingSpacesListResponse = z.object({
  parkingSpaces: z.array(parkingSpaceRowDto),
});

export type ParkingSpaceRowDto = z.infer<typeof parkingSpaceRowDto>;
export type ParkingSpacesListResponse = z.infer<
  typeof parkingSpacesListResponse
>;

import { parkingSpacesListResponse } from "~/types/parking-space";

const SPACES_API = "/v1/parking/spaces/list";

export async function getParkingSpaces(token: string | null, offset: number) {
  try {
    const response = await fetch(`${SPACES_API}?offset=${offset}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.statusText}`);
    }

    const data = await response.json();

    const parsedData = parkingSpacesListResponse.parse(data.data);
    return parsedData.parkingSpaces;
  } catch (error) {
    console.error("Error in getSessions:", error);
    throw error;
  }
}

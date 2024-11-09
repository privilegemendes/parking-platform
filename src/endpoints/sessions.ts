import { parkingSessionsListResponse } from "~/types/parking-session";

const GET_SESSIONS_LIST_API = "/v1/parking/sessions/list";
const POST_START_SESSION_API = "/v1/parking/sessions/start";
const POST_END_SESSION_API = "/v1/parking/sessions/end";

export async function getParkingSessions(token: string | null, offset: number) {
  try {
    // const url = new URL(SESSIONS_API_URL);
    // url.searchParams.append("offset", offset.toString());
    // if (limit) url.searchParams.append("limit", limit.toString());
    // if (isSessionEnded)
    //   url.searchParams.append("isSessionEnded", isSessionEnded.toString());
    // if (vehicleType) url.searchParams.append("vehicleType", vehicleType);

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${GET_SESSIONS_LIST_API}?offset=${offset}&limit=300`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch parking sessions: ${response.statusText}`
      );
    }

    const data = await response.json();
    const parsedData = parkingSessionsListResponse.parse(data.data);
    return parsedData.parkingSessions;
  } catch (error) {
    console.error("Error in getParkingSessions:", error);
    throw error;
  }
}

export const startSession = async (token: string | null, vehicleId: string) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(POST_START_SESSION_API, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicleId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to start parking session: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in startSession:", error);
    throw error;
  }
};

export const endSession = async (token: string | null, sessionId: string) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(POST_END_SESSION_API, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to end parking session: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in endSession:", error);
    throw error;
  }
};

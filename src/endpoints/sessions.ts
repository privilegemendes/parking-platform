import {
  endParkingSessionRequest,
  EndParkingSessionRequest,
  parkingSessionEndedResponse,
  parkingSessionsListResponse,
  parkingSessionStartedResponse,
  startParkingSessionRequest,
  StartParkingSessionRequest,
} from "~/types/parking-session";
import { authHeaders } from "~/lib/utils";
import { useAuth } from "~/contexts/authentication-provider";
import { useMutation } from "@tanstack/react-query";

const GET_SESSIONS_LIST_API = "/v1/parking/sessions/list";
const POST_START_SESSION_API = "/v1/parking/session/start";
const POST_END_SESSION_API = "/v1/parking/session/end";

export async function getParkingSessions(
  token: string | null,
  offset: number,
  limit: number
) {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(
      `${GET_SESSIONS_LIST_API}?offset=${offset}&limit=${limit}`,
      {
        method: "GET",
        headers: authHeaders(token),
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

export const startSession = async (
  token: string | null,
  payload: StartParkingSessionRequest
) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(POST_START_SESSION_API, {
      method: "POST",
      headers: authHeaders(token),
      credentials: "include",
      body: JSON.stringify(payload),
    });

    console.log("response", response);
    if (!response.ok) {
      throw new Error(
        `Failed to start parking session: ${response.statusText}`
      );
    }

    const data = await response.json();
    return parkingSessionStartedResponse.parse(data.data);
  } catch (error) {
    console.error("Error in startSession:", error);
    throw error;
  }
};

export const endSession = async (
  token: string | null,
  payload: EndParkingSessionRequest
) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const response = await fetch(POST_END_SESSION_API, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to end parking session: ${response.statusText}`);
    }

    const data = await response.json();
    return parkingSessionEndedResponse.parse(data.data);
  } catch (error) {
    console.error("Error in endSession:", error);
    throw error;
  }
};

export const useStartSession = () => {
  const { authToken } = useAuth();
  return useMutation({
    mutationKey: ["startSession"],
    mutationFn: (payload: StartParkingSessionRequest) =>
      startSession(authToken, startParkingSessionRequest.parse(payload)),
  });
};

export const useEndSession = () => {
  const { authToken } = useAuth();
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (payload: EndParkingSessionRequest) =>
      endSession(authToken, endParkingSessionRequest.parse(payload)),
  });
};

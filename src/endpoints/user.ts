import { userResponse } from "~/types/user";

const USER_API = "/v1/auth/me";

export async function getUser(token: string) {
  try {
    const response = await fetch(USER_API, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();

    return userResponse.parse(data);
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error;
  }
}

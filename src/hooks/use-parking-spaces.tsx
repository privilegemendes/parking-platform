import { useAuth } from "~/contexts/authentication-provider";
import { useQuery } from "@tanstack/react-query";
import { getParkingSpaces } from "~/endpoints/spaces";

export const useParkingSpaces = () => {
  const { authToken } = useAuth();
  const offset = 0;

  return useQuery({
    queryKey: ["parking-spaces", { authToken }],
    queryFn: () => getParkingSpaces(authToken, offset),
  });
};

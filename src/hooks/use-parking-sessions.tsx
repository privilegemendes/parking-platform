import { getParkingSessions } from "~/endpoints/sessions";
import { useAuth } from "~/contexts/authentication-provider";
import { useQuery } from "@tanstack/react-query";

export const useParkingSessions = () => {
  const { authToken } = useAuth();
  const offset = 0;
  const limit = 200;

  return useQuery({
    queryKey: ["parking-sessions", { authToken }],
    queryFn: () => getParkingSessions(authToken, offset, limit),
  });
};

import { useEndSession } from "~/endpoints/sessions";
import { EndParkingSessionRequest } from "~/types/parking-session";
import { toast } from "~/hooks/use-toast";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { parkingSessionsStatuses } from "~/components/parking-sessions/parking-sessions-columns";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { Badge } from "~/components/ui/badge";

interface Props {
  statusValue: boolean;
  parkingSessionId: string;
}

export const ParkingSessionStatus: FC<Props> = ({
  statusValue,
  parkingSessionId,
}) => {
  const payload = {
    parkingSession: {
      id: parkingSessionId,
    },
  };

  const { refetch } = useParkingSessions();

  const endSession = useEndSession();
  const onEndSession = async (payload: EndParkingSessionRequest) => {
    try {
      await endSession.mutateAsync(payload).then((response) => {
        const duration = response.endedSession.sessionLengthInHoursMinutes;
        refetch();
        toast({
          title: "Session Completed",
          description: `Duration: ${duration}`,
        });
      });
    } catch (error) {
      toast({
        title: "Failed to end session",
        variant: "destructive",
        description: `${error}`,
      });
    }
  };

  const status = parkingSessionsStatuses.find(
    (status) => status.value === statusValue
  );

  if (!status) {
    return null;
  }

  return (
    <div className="flex gap-4 w-full items-center justify-center">
      {status.value ? (
        <Badge variant="success">
          <span>{status.label}</span>
        </Badge>
      ) : (
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onEndSession(payload)}
        >
          End Session
        </Button>
      )}
    </div>
  );
};

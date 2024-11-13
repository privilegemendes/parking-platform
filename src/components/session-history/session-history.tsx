import { ParkingSessionRowDto } from "~/types/parking-session";
import { VehicleType } from "~/components/vehicle-type";
import { FC } from "react";
import { formatDuration, getLongestActiveSessions } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { SessionHistorySkeleton } from "~/components/session-history/session-history-skeleton";

interface Props {
  data?: ParkingSessionRowDto[];
  isLoading: boolean;
}

export const SessionHistory: FC<Props> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <SessionHistorySkeleton />;
  }

  const filteredData = getLongestActiveSessions(data);

  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader className="">
        <CardTitle>Top 5 Active sessions</CardTitle>
      </CardHeader>
      <div className="px-6 mb-6">
        <div className="flex flex-col gap-4">
          {filteredData.map((session, index) => (
            <div key={index} className="flex items-center">
              <VehicleType vehicleType={session.vehicleType} />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.vehicleLicensePlate}
                </p>
                <Badge
                  variant={
                    session.parkingSpaceId === "Resident"
                      ? "outline"
                      : "default"
                  }
                >
                  {session.parkingSpaceId}
                </Badge>
              </div>
              <div className="ml-auto font-medium text-sm">
                {formatDuration(session.calculatedDuration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

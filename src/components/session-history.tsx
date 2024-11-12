import { ParkingSessionRowDto } from "~/types/parking-session";
import { VehicleType } from "~/components/vehicle-type";
import { FC } from "react";
import { formatDuration, getParkingSpaceType } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

interface Props {
  data?: ParkingSessionRowDto[];
  isLoading: boolean;
}

export const SessionHistory: FC<Props> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  const filteredData = getLongestActiveSessions(data);

  return (
    <Card className="col-span-3 lg:col-span-1">
      <CardHeader>
        <CardTitle>Active sessions</CardTitle>
      </CardHeader>
      <div className="overflow-y-scroll p-6 h-[450px]">
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

const getLongestActiveSessions = (data: ParkingSessionRowDto[]) => {
  if (!data) return [];

  const calculateDuration = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    return (now.getTime() - start.getTime()) / (1000 * 60); // Convert to minutes
  };

  return data
    .filter((session) => !session.isSessionEnded)
    .map((session) => ({
      vehicleLicensePlate: session.vehicleLicensePlate,
      vehicleType: session.vehicleType,
      parkingSpaceId: getParkingSpaceType(session.parkingSpaceId),
      calculatedDuration: calculateDuration(session.sessionStartedAt),
    }))
    .sort((a, b) => b.calculatedDuration - a.calculatedDuration);
};

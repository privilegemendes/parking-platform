import { ParkingSpaces } from "~/components/parking-spaces/parking-spaces";
import { CapacityAreaChart } from "~/components/parking-sessions/capacity-area-chart";
import { SessionHistory } from "~/components/session-history";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { Finances } from "~/components/finances";
import { useParkingSpaces } from "~/hooks/use-parking-spaces";

export default function DashboardPage() {
  const { data: parkingSessions, isLoading: isParkingSessionsLoading } =
    useParkingSessions();

  const { data: parkingSpaces, isLoading: isParkingSpacesLoading } =
    useParkingSpaces();

  return (
    <div className="flex flex-col">
      <div className="space-y-4 overflow-auto relative h-[800px] pb-4 px-4">
        <ParkingSpaces
          data={parkingSpaces}
          isLoading={isParkingSpacesLoading}
        />
        <Finances data={parkingSessions} isLoading={isParkingSessionsLoading} />
        <div className="gap-4 grid lg:grid-cols-3">
          <CapacityAreaChart
            data={parkingSessions}
            isLoading={isParkingSessionsLoading}
          />
          <SessionHistory
            data={parkingSessions}
            isLoading={isParkingSessionsLoading}
          />
        </div>
      </div>
    </div>
  );
}

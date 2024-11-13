import { ParkingSpaces } from "~/components/parking-spaces/parking-spaces";
import { SessionHistory } from "~/components/session-history/session-history";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { Finances } from "~/components/finances/finances";
import { useParkingSpaces } from "~/hooks/use-parking-spaces";
import { CapacityAreaChart } from "~/components/parking-sessions/capacity-area-chart";

export default function DashboardPage() {
  const { data: parkingSessions, isLoading: isParkingSessionsLoading } =
    useParkingSessions();

  const { data: parkingSpaces, isLoading: isParkingSpacesLoading } =
    useParkingSpaces();

  return (
    <div className="flex flex-col gap-4 px-4 mb-4 overflow-y-scroll h-screen">
      <ParkingSpaces data={parkingSpaces} isLoading={isParkingSpacesLoading} />
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
  );
}

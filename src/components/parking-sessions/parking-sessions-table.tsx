import { FC } from "react";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { DataTable } from "~/components/data-table/data-table";
import { parkingSessionsColumns } from "~/components/parking-sessions/parking-sessions-columns";

export const ParkingSessionsTable: FC = () => {
  const {
    data: parkingSessions,
    isLoading: isParkingSessionsLoading,
    dataUpdatedAt: parkingSessionsUpdatedAt,
    refetch: refetchParkingSessions,
  } = useParkingSessions();

  if (isParkingSessionsLoading || !parkingSessions) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <DataTable data={parkingSessions} columns={parkingSessionsColumns} />
    </div>
  );
};

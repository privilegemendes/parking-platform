import { ParkingSessionRowDto } from "~/types/parking-session";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import { ParkingSessionStatus } from "~/components/parking-sessions/parking-session-status";
import { formatDuration, truncateSessionId } from "~/lib/utils";
import { VehicleType } from "~/components/vehicle-type";

export const parkingSessionsColumns: ColumnDef<ParkingSessionRowDto>[] = [
  {
    accessorKey: "parkingSessionId",
    // id: "Session ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[60px] text-xs">
        {truncateSessionId(row.getValue("parkingSessionId"))}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "parkingSpaceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space ID" />
    ),
    cell: ({ row }) => {
      const parkingSpaceId = getParkingSpaceType(row);
      return (
        <div className="w-[60px]">
          <Badge
            variant={parkingSpaceId === "Resident" ? "outline" : "default"}
          >
            {parkingSpaceId}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sessionStartedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Time" />
    ),
    cell: ({ row }) => {
      const sessionStartedAt: string = row.getValue("sessionStartedAt");
      return (
        <div className="flex flex-col space-y-1">
          <span className="text-xs">
            {sessionStartedAt ? format(sessionStartedAt, "PP") : "-"}
          </span>
          <span className="text-xs">
            {sessionStartedAt ? format(sessionStartedAt, "p") : "-"}
          </span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "sessionEndedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Time" />
    ),
    cell: ({ row }) => {
      const sessionEndedAt: string = row.getValue("sessionEndedAt");
      return (
        <div className="flex flex-col space-y-1">
          <span className="text-xs">
            {sessionEndedAt ? format(sessionEndedAt, "PP") : "-"}
          </span>
          <span className="text-xs">
            {sessionEndedAt ? format(sessionEndedAt, "p") : "-"}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sessionLengthInHoursMinutes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {formatDuration(row.getValue("sessionLengthInHoursMinutes"))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleLicensePlate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("vehicleLicensePlate")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Type" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <VehicleType vehicleType={row.getValue("vehicleType")} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "isSessionEnded",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusValue = String(row.getValue("isSessionEnded"));
      const parkingSessionId = String(row.getValue("parkingSessionId"));
      return (
        <ParkingSessionStatus
          parkingSessionId={parkingSessionId}
          statusValue={statusValue}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
];

export const parkingSessionsStatuses = [
  {
    value: "true",
    label: "Completed",
    icon: "🛑",
  },
  {
    value: "false",
    label: "Active",
    icon: "🟢",
  },
];

export const vehicleTypes = [
  {
    value: "CAR",
    label: "CAR",
  },
  {
    value: "MOTORCYCLE",
    label: "MOTORCYCLE",
  },
  {
    value: "MOTOR",
    label: "MOTOR",
  },
];

export const parkingSpacesTypes = [
  {
    value: "1",
    label: "Resident",
  },
  {
    value: "2",
    label: "Visitor",
  },
  {
    value: "3",
    label: "Visitor",
  },
];

function getParkingSpaceType(row: {
  getValue: (key: string) => number;
}): string {
  const parkingSpaceId = row.getValue("parkingSpaceId");
  if (parkingSpaceId === 1) {
    return "Resident";
  } else {
    return "Visitor";
  }
}

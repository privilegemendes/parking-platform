import { ParkingSessionRowDto } from "~/types/parking-session";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";
import { ParkingSessionStatus } from "~/components/parking-sessions/parking-session-status";
import {
  formatDuration,
  getParkingSpaceType,
  truncateSessionId,
} from "~/lib/utils";
import { VehicleType } from "~/components/vehicle-type";

// Extend the ColumnMeta interface to include the hidden and title properties
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    hidden?: boolean;
    title?: string;
  }
}

export const parkingSessionsColumns: ColumnDef<ParkingSessionRowDto>[] = [
  {
    accessorKey: "parkingSessionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Session ID" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs">
        {truncateSessionId(row.getValue("parkingSessionId"))}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
    meta: {
      hidden: true,
      title: "Session ID",
    },
  },
  {
    accessorKey: "parkingSpaceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space ID" />
    ),
    cell: ({ row }) => {
      const parkingSpaceId = getParkingSpaceType(
        row.getValue("parkingSpaceId")
      );
      return (
        <Badge variant={parkingSpaceId === "Resident" ? "outline" : "default"}>
          {parkingSpaceId}
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle Type" />
    ),
    cell: ({ row }) => (
      <div className="flex w-full items-center">
        <VehicleType vehicleType={row.getValue("vehicleType")} />
      </div>
    ),
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
        <div className="flex flex-col w-full space-y-1">
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
        <div className="flex flex-col w-full space-y-1">
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
      <div className="text-xs">
        {formatDuration(row.getValue("sessionLengthInHoursMinutes"))}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "vehicleLicensePlate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("vehicleLicensePlate")}</div>
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
      const statusValue = Boolean(row.getValue("isSessionEnded"));
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
    value: true,
    label: "Completed",
    icon: "🛑",
  },
  {
    value: false,
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
    value: 1,
    label: "Resident",
  },
  {
    value: 2,
    label: "Visitor Car",
  },
  {
    value: 3,
    label: "Visitor Motorcycle",
  },
];

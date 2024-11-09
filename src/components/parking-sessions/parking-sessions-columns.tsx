import { ParkingSessionRowDto } from "~/types/parking-session";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { Badge } from "~/components/ui/badge";
import { format } from "date-fns";

export const parkingSessionsColumns: ColumnDef<ParkingSessionRowDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "parkingSessionId",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Session ID" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[80px]">
  //       {truncateSessionId(row.getValue("parkingSessionId"))}
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "parkingSpaceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Space ID" />
    ),
    cell: ({ row }) => {
      const parkingSpaceId = getParkingSpaceType(row);
      return (
        <div className="w-[80px]">
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
    cell: ({ row }) => (
      <div className="">{format(row.getValue("sessionStartedAt"), "Pp")}</div>
    ),
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
        <div className="">
          {sessionEndedAt ? format(sessionEndedAt, "Pp") : "-"}
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
      <div className="w-[80px] text-center">
        {row.getValue("sessionLengthInHoursMinutes")}
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
      <div className="w-[80px]">{row.getValue("vehicleType")}</div>
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
      const status = parkingSessionsStatuses.find(
        (status) => status.value === statusValue
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex gap-4 w-[100px] items-center">
          {status.icon}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

export const parkingSessionsStatuses = [
  {
    value: "true",
    label: "Active",
    icon: "🟢",
  },
  {
    value: "false",
    label: "Ended",
    icon: "🛑",
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

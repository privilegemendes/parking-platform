import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "~/components/data-table/data-table-facted-filter";
import { Button } from "~/components/ui/button";
import { DataTableViewOptions } from "~/components/data-table/data-table-view-options";
import {
  parkingSessionsStatuses,
  parkingSpacesTypes,
  vehicleTypes,
} from "~/components/parking-sessions/parking-sessions-columns";
import { Input } from "~/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search License Plate..."
          value={
            (table
              .getColumn("vehicleLicensePlate")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("vehicleLicensePlate")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("parkingSpaceId") && (
          <DataTableFacetedFilter
            column={table.getColumn("parkingSpaceId")}
            title="Parking Space"
            options={parkingSpacesTypes}
          />
        )}
        {table.getColumn("isSessionEnded") && (
          <DataTableFacetedFilter
            column={table.getColumn("isSessionEnded")}
            title="Status"
            options={parkingSessionsStatuses}
          />
        )}
        {table.getColumn("vehicleType") && (
          <DataTableFacetedFilter
            column={table.getColumn("vehicleType")}
            title="Vehicle Type"
            options={vehicleTypes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

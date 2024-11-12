import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ParkingSessionsTable } from "~/components/parking-sessions/parking-sessions-table";

export const Route = createFileRoute("/parking-logs")({
  component: ParkingLog,
});

function ParkingLog() {
  return <ParkingSessionsTable />;
}

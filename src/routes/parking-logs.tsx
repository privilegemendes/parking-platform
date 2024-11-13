import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ParkingSessionsTable } from "~/components/parking-sessions/parking-sessions-table";

export const Route = createFileRoute("/parking-logs")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: ParkingLog,
});

function ParkingLog() {
  return <ParkingSessionsTable />;
}

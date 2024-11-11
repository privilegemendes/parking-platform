import { useAuth } from "~/contexts/authentication-provider";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Logo } from "~/components/ui/logo";
import { ParkingSessionsTable } from "~/components/parking-sessions/parking-sessions-table";
import { ParkingSpaces } from "~/components/parking-spaces/parking-spaces";
import { CreateSession } from "~/components/create-session/create-session";
import { CapacityAreaChart } from "~/components/parking-sessions/capacity-area-chart";
import { SessionHistory } from "~/components/session-history";
import { useParkingSessions } from "~/hooks/use-parking-sessions";
import { LogOutIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function DashboardPage() {
  const { logout } = useAuth();
  const { data: parkingSessions, isLoading: isParkingSessionsLoading } =
    useParkingSessions();

  return (
    <div className="flex flex-col">
      <Tabs defaultValue="overview" className="space-y-4 mb-4">
        <div className="flex items-center h-16 px-4 border-b gap-4">
          <Logo />
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parking-logs">Parking Logs</TabsTrigger>
          </TabsList>
          <div className="flex flex-1 gap-4 justify-end">
            <CreateSession />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={logout}>
                    <LogOutIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <TabsContent value="overview" className="space-y-4 px-4">
          <ParkingSpaces />
          {/*<Notifications />*/}
          <div className="grid gap-4 grid-cols-3">
            <CapacityAreaChart
              data={parkingSessions}
              isLoading={isParkingSessionsLoading}
            />
            <SessionHistory
              data={parkingSessions}
              isLoading={isParkingSessionsLoading}
            />
          </div>
        </TabsContent>
        <TabsContent value="parking-logs" className="space-y-4 px-4">
          <ParkingSessionsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

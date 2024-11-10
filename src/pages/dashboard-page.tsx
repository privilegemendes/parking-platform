import { useAuth } from "~/contexts/authentication-provider";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Logo } from "~/components/ui/logo";
import { ParkingSessionsTable } from "~/components/parking-sessions/parking-sessions-table";
import { ParkingSpaces } from "~/components/parking-spaces/parking-spaces";
import { CreateSession } from "~/components/create-session/create-session";
import { CapacityAreaChart } from "~/components/parking-sessions/capacity-area-chart";

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Logo />
        <div className="flex flex-1 justify-end">
          <Button onClick={logout}>Logout</Button>
        </div>
      </header>
      <div className="flex flex-col px-4 mx-auto">
        <Tabs defaultValue="overview" className="space-y-4 mt-4">
          <div className="flex flex-1 justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="parking-logs">Parking Logs</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
            </TabsList>
            <CreateSession />
          </div>
          <TabsContent value="overview" className="space-y-4">
            <ParkingSpaces />
            <CapacityAreaChart />
          </TabsContent>
          <TabsContent value="parking-logs" className="space-y-4">
            <ParkingSessionsTable />
          </TabsContent>
          <TabsContent value="financials" className="space-y-4"></TabsContent>
        </Tabs>
      </div>
    </>
  );
}

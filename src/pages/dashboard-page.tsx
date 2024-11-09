import { useAuth } from "~/contexts/authentication-provider";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Logo } from "~/components/ui/logo";
import { ParkingSessionsTable } from "~/components/parking-sessions/parking-sessions-table";

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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="parking-logs">Parking Logs</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4"></TabsContent>
          <TabsContent value="parking-logs" className="space-y-4">
            <ParkingSessionsTable />
          </TabsContent>
          <TabsContent value="financials" className="space-y-4"></TabsContent>
        </Tabs>
      </div>
    </>
  );
}

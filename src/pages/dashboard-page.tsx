import { useAuth } from "~/contexts/authentication-provider";
import { Button } from "~/components/ui/button";

export default function DashboardPage() {
  const { logout } = useAuth();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex flex-1 justify-end">
        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}

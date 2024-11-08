import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "~/contexts/authentication-provider";
import { useEffect } from "react";
import DashboardPage from "~/pages/dashboard-page";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();

  useEffect(() => {
    void router.invalidate();
    if (!isAuthenticated) {
      void navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate, router]);

  return (
    <div className="">
      <DashboardPage />
    </div>
  );
}

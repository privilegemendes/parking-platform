import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthenticationPage from "~/pages/authentication";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen">
      <AuthenticationPage />
    </div>
  );
}

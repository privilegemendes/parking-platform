import { AuthContext } from "~/contexts/authentication-provider";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Inner />
      <TailwindIndicator />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}

function Inner() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

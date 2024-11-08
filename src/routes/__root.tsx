import { AuthContext } from "~/contexts/authentication-provider";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TailwindIndicator } from "~/components/ui/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <DevTools />
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

function DevTools() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div>
      <TailwindIndicator />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}

import type { useAuth } from "@clerk/clerk-react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export interface RootRouteContext {
  auth?: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <div className="h-screen w-screen bg-foreground text-secondary">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

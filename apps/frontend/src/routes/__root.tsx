import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen bg-foreground text-secondary">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

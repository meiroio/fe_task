import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { RootNavigationMenu } from "@/components/navigation-menu";
import { queryClient } from "@/react-query";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRouteWithContext<{
  queryClient: typeof queryClient;
}>()({
  component: () => (
    <>
      <RootNavigationMenu />
      <div className="container">
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense>
    </>
  ),
});

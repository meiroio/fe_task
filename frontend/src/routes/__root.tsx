import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import React, { Suspense } from "react";
import { RootNavigationMenu } from "@/components/navigation-menu";
import { queryClient } from "@/react-query";
import { Toaster } from "@/components/ui/toaster";

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
    <div className="w-svw h-svh flex flex-col">
      <RootNavigationMenu />
      <div className="container flex-1">
        <ScrollRestoration
          getKey={(location) => {
            const paths = ["/attributes"];
            return paths.includes(location.pathname)
              ? location.pathname
              : location.hash;
          }}
        />
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} />
      </Suspense>
      <Toaster />
    </div>
  ),
});

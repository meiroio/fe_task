import { RouterErrorFallaback } from "@/components/RouterErrorFallback";
import { Attributes, attributesQueryOptions } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/attributes")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(attributesQueryOptions),
  component: Attributes,
  errorComponent: RouterErrorFallaback,
});

import { RouterErrorFallaback } from "@/components/RouterErrorFallback";
import { AttributePage } from "@/pages/attribute";
import { attributeQueryOptions } from "@/pages/attribute/api";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { z } from "zod";

export const Route = createFileRoute("/attributes/attribute")({
  validateSearch: z.object({
    attributeId: z.string(),
  }).parse,
  loaderDeps: ({ search: { attributeId } }) => ({ attributeId }),
  loader: async ({ context: { queryClient }, deps }) =>
    queryClient.ensureQueryData(attributeQueryOptions(deps.attributeId)),
  component: () => (
    <>
      <Helmet>
        <title>Attribute Detail</title>
      </Helmet>
      <AttributePage />
    </>
  ),
  errorComponent: RouterErrorFallaback,
});

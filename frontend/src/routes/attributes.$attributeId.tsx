import { RouterErrorFallaback } from "@/components/RouterErrorFallback";
import { AttributePage } from "@/pages/attribute";
import { attributeQueryOptions } from "@/pages/attribute/api";
import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { labelsQueryOptions } from "@/react-query";
import { z } from "zod";

export const Route = createFileRoute("/attributes/$attributeId")({
  parseParams: (params) => ({
    attributeId: z.string().parse(params.attributeId),
  }),
  loader: async ({ context: { queryClient }, params }) => {
    const labels = await queryClient.ensureQueryData(labelsQueryOptions);
    return queryClient.ensureQueryData(
      attributeQueryOptions(params.attributeId, labels),
    );
  },
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

import { RouterErrorFallaback } from "@/components/RouterErrorFallback";
import { Attributes, attributesQueryOptions } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { labelsQueryOptions } from "@/react-query";

export const Route = createFileRoute("/attributes/")({
  validateSearch: z.object({
    searchText: z.string().optional(),
    sortBy: z.enum(["name", "createdAt"]).optional(),
    sortDir: z.enum(["asc", "desc"]).optional(),
  }).parse,
  loaderDeps: ({ search: { searchText, sortBy, sortDir } }) => ({
    searchText,
    sortBy,
    sortDir,
  }),
  loader: async ({ context: { queryClient }, deps }) => {
    const labels = await queryClient.ensureQueryData(labelsQueryOptions);

    const options = attributesQueryOptions(deps, labels);

    const data =
      queryClient.getQueryData(options.queryKey) ??
      (await queryClient.fetchInfiniteQuery(options));

    return data;
  },
  component: () => (
    <>
      <Helmet>
        <title>Attributes</title>
      </Helmet>
      <Attributes />
    </>
  ),
  errorComponent: RouterErrorFallaback,
});

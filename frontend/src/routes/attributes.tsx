import { RouterErrorFallaback } from "@/components/RouterErrorFallback";
import { Attributes, attributesQueryOptions } from "@/pages";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/attributes")({
  validateSearch: z.object({
    searchText: z.string().optional(),
  }).parse,
  loaderDeps: ({ search: { searchText } }) => ({ searchText }),
  loader: async ({ context: { queryClient }, deps }) => {
    const options = attributesQueryOptions(deps);

    const data =
      queryClient.getQueryData(options.queryKey) ??
      (await queryClient.fetchInfiniteQuery(options));

    return data;
  },
  component: Attributes,
  errorComponent: RouterErrorFallaback,
});

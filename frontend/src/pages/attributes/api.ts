import { AttributeQuery } from "@/types/attributes";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { AttributesQueryOptions } from "./AttributesPage.types";

export const QUERY_KEY = "attributes";
const DEFAULT_LIMIT = 10;

export const fetchAttributes = async ({
  pageParam,
  opts,
}: {
  pageParam: unknown;
  opts: AttributesQueryOptions;
}) => {
  const url = new URL("http://localhost:3000/attributes");
  const { searchText } = opts;

  const params = new URLSearchParams({
    offset: typeof pageParam === "number" ? pageParam.toString() : "0",
    limit: DEFAULT_LIMIT.toString(),
  });

  if (searchText) {
    params.set("searchText", encodeURIComponent(searchText));
  }

  url.search = params.toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const attributesQueryOptions = (opts: AttributesQueryOptions) =>
  infiniteQueryOptions<AttributeQuery>({
    queryKey: [QUERY_KEY, opts],
    queryFn: ({ pageParam }) => fetchAttributes({ pageParam, opts }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.meta.offset + lastPage.meta.limit;

      return lastPage.meta.hasNextPage ? nextOffset : undefined;
    },
  });

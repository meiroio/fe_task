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

  const params = new URLSearchParams({
    offset: typeof pageParam === "number" ? pageParam.toString() : "0",
    limit: DEFAULT_LIMIT.toString(),
  });

  for (const key in opts) {
    if (Object.prototype.hasOwnProperty.call(opts, key)) {
      const value = (opts as Record<string, string>)[key];
      if (value) {
        params.set(key, encodeURIComponent(value));
      }
    }
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

import { AttributeQuery } from "@/types/attributes";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { AttributesQueryOptions as AttributesQueryDeps } from "./AttributesPage.types";
import { api } from "@/lib/api.service";

export const ATTRIBUTES_QUERY_KEY = "attributes";
const DEFAULT_LIMIT = 10;

export const fetchAttributes = async ({
  pageParam,
  deps,
}: {
  pageParam: unknown;
  deps: AttributesQueryDeps;
}) => {
  const params = new URLSearchParams({
    offset: typeof pageParam === "number" ? pageParam.toString() : "0",
    limit: DEFAULT_LIMIT.toString(),
  });

  for (const key in deps) {
    if (Object.prototype.hasOwnProperty.call(deps, key)) {
      const value = (deps as Record<string, string>)[key];
      if (value) {
        params.set(key, encodeURIComponent(value));
      }
    }
  }

  const response = await api.get(`/attributes?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const attributesQueryOptions = (deps: AttributesQueryDeps) =>
  infiniteQueryOptions<AttributeQuery>({
    queryKey: [ATTRIBUTES_QUERY_KEY, deps],
    queryFn: ({ pageParam }) => fetchAttributes({ pageParam, deps }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.meta.offset + lastPage.meta.limit;

      return lastPage.meta.hasNextPage ? nextOffset : undefined;
    },
    placeholderData: keepPreviousData,
  });

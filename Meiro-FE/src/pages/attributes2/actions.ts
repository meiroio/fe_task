import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL, ResponseData, Filters } from "../../types";

export const fetchAttributes = async (filters: Filters, offset: string) => {
  const queryParams = new URLSearchParams({
    ...filters,
    offset,
    limit: "10",
  }).toString();

  return fetch(`${BASE_URL}/attributes?${queryParams}`).then((res) =>
    res.json()
  );
};

export const useGetInfiniteAttributes = (filters: Filters) => {
  return useInfiniteQuery<ResponseData>(
    {
      //@ts-expect-error TODO .. fix below type error :https://github.com/TanStack/query/discussions/5800
      queryKey: ["infiniteAttributes", { ...filters }],
      queryFn: ({ pageParam }: { pageParam: number }) => {
        return fetchAttributes(filters, (pageParam ?? 0).toString());
      },
      getNextPageParam: (lastPage: ResponseData) =>
        lastPage.meta.hasNextPage
          ? lastPage.meta.offset + lastPage.meta.limit
          : undefined,
    },
    {
      keepPreviousData: true,
    }
  );
};

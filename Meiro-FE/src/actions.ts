import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL, Label, ResponseLabels } from "./types";

export const fetchLabels = async (offset: string) => {
  const queryParams = new URLSearchParams({
    offset,
    limit: "10",
  }).toString();

  return fetch(`${BASE_URL}/labels?${queryParams}`).then((res) => res.json());
};

export const useGetLabels = () => {
  return useInfiniteQuery<ResponseLabels>(
    {
      //@ts-expect-error TODO .. fix below type error :https://github.com/TanStack/query/discussions/5800
      queryKey: ["infiniteLabels"],
      queryFn: ({ pageParam }: { pageParam: number }) => {
        return fetchLabels((pageParam ?? 0).toString());
      },
      getNextPageParam: (lastPage: ResponseLabels) =>
        lastPage.meta.hasNextPage
          ? lastPage.meta.offset + lastPage.meta.limit
          : undefined,
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useMapIds = () => {
  const {
    data: labels,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetLabels();

  return (ids: Array<string>) => {
    const result: Array<string | null> = [];
    if (labels && !isLoading && !isFetching) {
      ids.map((id) => {
        //@ts-expect-error TODO remove flat as it hurts performance
        const tableData = labels.pages.map((page) => page.data).flat();
        const matchLabel: Label = tableData.find((item) => item.id === id);
        if (!matchLabel && hasNextPage) {
          fetchNextPage();
        }
        if (!matchLabel && !hasNextPage) {
          return result;
        }
        return result.push(matchLabel.name);
      });
    }
    return result;
  };
};

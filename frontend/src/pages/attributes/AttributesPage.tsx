import { Input } from "@/components/ui/input";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { attributesQueryOptions } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/attributes";
import { useEffect } from "react";
import { useDebouncedState } from "@/lib/debounce-state.hook";
import { useVirtualScroll } from "./Attributes.hooks";

export const Attributes = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { searchText } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(attributesQueryOptions(Route.useLoaderDeps()));

  const allRows = data.pages.flatMap((d) => d.data);

  const { virtualizer, scrollerRef } = useVirtualScroll({
    hasNextPage,
    allRows,
    isFetchingNextPage,
    fetchNextPage,
  });

  const {
    debounced: [searchDraft, setSearchDraft],
    original: originalSearchDraft,
  } = useDebouncedState(searchText ?? "", 300);

  useEffect(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          searchText: searchDraft || undefined,
        };
      },
      replace: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  return (
    <div className="p-2">
      <Input
        placeholder="Search By Name"
        value={originalSearchDraft}
        onChange={(e) => setSearchDraft(e.target.value)}
      />
      <div className="max-h-[500px] overflow-auto mt-5" ref={scrollerRef}>
        <div
          className="relative w-full"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const isLoaderRow = row.index > allRows.length - 1;
            const attribute = allRows[row.index];

            return (
              <div
                className="w-full absolute top-0 left-0 border-b flex items-center justify-center"
                style={{
                  height: `${row.size}px`,
                  transform: `translateY(${row.start}px)`,
                }}
                key={row.index}
              >
                {isLoaderRow
                  ? hasNextPage
                    ? "Loading more..."
                    : "Nothing more to load"
                  : attribute.name + " " + row.index}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import { Input } from "@/components/ui/input";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { attributesQueryOptions } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/attributes";
import { useEffect } from "react";
import { useDebouncedState } from "@/lib/debounce-state.hook";
import { VirtualizedList } from "./AttributesList";

export const Attributes = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { searchText } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(attributesQueryOptions(Route.useLoaderDeps()));

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
      <VirtualizedList
        data={data}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

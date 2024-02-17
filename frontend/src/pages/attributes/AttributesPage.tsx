import { Input } from "@/components/ui/input";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { attributesQueryOptions } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/attributes.index";
import { useEffect } from "react";
import { useDebouncedState } from "@/lib/debounce-state.hook";
import { AttributesTable } from "./AttributesTable/AttributesTable";
import { AttributesQueryOptions } from "./AttributesPage.types";
import { AttributeType } from "@/types/attributes";

export const Attributes = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { searchText, sortBy, sortDir } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(attributesQueryOptions(Route.useLoaderDeps()));

  const {
    debounced: [searchDraft, setSearchDraft],
    original: originalSearchDraft,
  } = useDebouncedState(searchText ?? "", 300);

  const setSearchParams = (params: AttributesQueryOptions) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          ...params,
        };
      },
      replace: true,
    });
  };

  const handleSort = (sort?: { id: keyof AttributeType; desc: boolean }) => {
    if (!sort) {
      setSearchParams({ sortBy: undefined, sortDir: undefined });
      return;
    }

    if (sort.id !== "name" && sort.id !== "createdAt") {
      return;
    }
    setSearchParams({ sortBy: sort.id, sortDir: sort.desc ? "desc" : "asc" });
  };

  useEffect(() => {
    setSearchParams({ searchText: searchDraft || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  return (
    <div className="p-2">
      <Input
        placeholder="Search By Name"
        value={originalSearchDraft}
        onChange={(e) => setSearchDraft(e.target.value)}
      />
      <AttributesTable
        initialSort={
          sortBy && sortDir !== undefined
            ? { id: sortBy, desc: sortDir === "desc" }
            : undefined
        }
        onRowClick={(row) => {
          navigate({
            to: "/attributes/attribute",
            search: { attributeId: row.original.id },
          });
        }}
        onSort={handleSort}
        data={data.pages.flatMap((d) => d.data)}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

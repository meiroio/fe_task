import { Input } from "@/components/ui/input";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { attributesQueryOptions } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/attributes";
import { useEffect } from "react";
import { useDebouncedState } from "@/lib/debounce-state.hook";

export const Attributes = () => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { searchText } = Route.useSearch();
  const { data } = useSuspenseInfiniteQuery(
    attributesQueryOptions(Route.useLoaderDeps()),
  );
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
      {data.pages.map((page) =>
        page.data.map((attr) => <div key={attr.id}>{attr.name}</div>),
      )}
    </div>
  );
};

import {
  DataResponse,
  FilterQueryParamsInfiniteScroll,
  getAllAttributesInfiniteScroll,
} from "@/services/attributesService";
import { DataTable } from "@/ui/components/custom/DataTable/DataTable";
import { columns } from "@/ui/components/custom/DataTable/columns";
import FilterPanel from "@/ui/components/custom/FilterPanel/FilterPanel";
import { Card, CardContent } from "@/ui/components/shadcn/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export default function AttributesWInfiniteScroll() {
  const [filterObject, setFilterObject] = useState<FilterQueryParamsInfiniteScroll>({
    limit: 10,
    searchText: "",
    sortBy: "name",
    sortDir: "asc",
  });

  const { ref, inView } = useInView();

  const { data: attributes, fetchNextPage } = useInfiniteQuery<DataResponse>({
    queryKey: [`attributes?${JSON.stringify(filterObject)}`],
    queryFn: ({ pageParam }) => {
      const newOffset = Number(pageParam) ?? 0;
      return getAllAttributesInfiniteScroll(filterObject, newOffset);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage
        ? lastPage.meta.offset + lastPage.meta.limit
        : undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const allAttributes = useMemo(() => {
    if (!attributes) {
      return [];
    }
    return attributes?.pages
      .map((att) => att.data)
      .reduce((acc, curr) => [...acc, ...curr], []);
  }, [attributes]);

  return (
    <div className="container mx-auto py-10 gap-8 flex flex-col">
      <div className="flex items-center justify-between w-full py-2">
        <FilterPanel
          filterObject={filterObject}
          setFilterObject={setFilterObject}
        />
      </div>

      <DataTable columns={columns} data={allAttributes} />
      <div className="mt-10">
        <footer ref={ref}>
          <Card className="flex flex-col justify-center items-center rounded-none shadow-none border-transparent">
            <CardContent className="pb-0">
              <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
                <div className="flex justify-center space-x-4 lg:mt-0">
                  <Link to={"https://github.com/danielharvilik"}>
                    <GitHubLogoIcon className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  );
}

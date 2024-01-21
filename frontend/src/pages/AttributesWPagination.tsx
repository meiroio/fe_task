import {
  DataResponse,
  FilterQueryParamsPagination,
  getAllAttributesPagination,
} from "@/services/attributesService";
import { DataTable } from "@/ui/components/custom/DataTable/DataTable";
import { columns } from "@/ui/components/custom/DataTable/columns";
import FilterPanel from "@/ui/components/custom/FilterPanel/FilterPanel";
import Pagination from "@/ui/components/custom/Pagination/Pagination";
import { Card, CardContent } from "@/ui/components/shadcn/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AttributesWPagination() {
  const [filterObject, setFilterObject] = useState<FilterQueryParamsPagination>({
    offset: 0,
    limit: 10,
    searchText: "",
    sortBy: "name",
    sortDir: "asc",
  });

  const { data: attributes, isLoading } = useQuery<DataResponse>({
    queryKey: [`attributes?${JSON.stringify(filterObject)}`],
    queryFn: () =>  getAllAttributesPagination(filterObject),
  });

  return (
    <div className="container mx-auto py-10 gap-8 flex flex-col">
      <div className="flex items-center justify-between w-full py-2">
        <FilterPanel
          filterObject={filterObject}
          setFilterObject={setFilterObject}
        />
        <Pagination
          filterObject={filterObject}
          setFilterObject={setFilterObject}
          hasNextPage={attributes?.meta.hasNextPage}
        />
      </div>

      <div>
        {isLoading || !attributes ? (
          <p>Loading...</p>
        ) : (
          <DataTable columns={columns} data={attributes.data} />
        )}
      </div>

      <div className="mt-10">
        <footer>
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

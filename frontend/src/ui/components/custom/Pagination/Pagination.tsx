import React from "react";
import { Button } from "../../shadcn/ui/button";
import { FilterQueryParams } from "@/services/attributesService";

interface PaginationProps {
    filterObject: FilterQueryParams;
    setFilterObject: React.Dispatch<React.SetStateAction<FilterQueryParams>>
    hasNextPage: boolean | undefined;
  }

export default function Pagination({
    filterObject,
    setFilterObject,
    hasNextPage,
  }: PaginationProps) {

    const goToNextPage = () => {
        setFilterObject((prevFilter) => ({
          ...prevFilter,
          offset: prevFilter?.offset + filterObject.limit,
        }));
      };
    
      const goToPreviousPage = () => {
        setFilterObject((prevFilter) => ({
          ...prevFilter,
          offset: prevFilter?.offset - filterObject.limit,
        }));
      };

  return <div className="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onClick={goToPreviousPage}
    disabled={filterObject.offset === 0}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={goToNextPage}
    disabled={!hasNextPage}
  >
    Next
  </Button>
</div>;
}

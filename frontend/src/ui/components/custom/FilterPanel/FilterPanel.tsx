import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../../shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/ui/select";
import { FilterQueryParams } from "@/services/attributesService";

interface FilterPanelProps {
  filterObject: FilterQueryParams;
  setFilterObject: React.Dispatch<React.SetStateAction<FilterQueryParams>>;
}

export default function FilterPanel({
  filterObject,
  setFilterObject,
}: FilterPanelProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newSearchValue = event.target.value;
    setFilterObject((prevFilter) => ({
      ...prevFilter,
      searchText: newSearchValue,
    }));
  };

  const handleSortBySelectChange = (newSelectedValue: "name" | "createdAt") => {
    setFilterObject((prevFilter) => ({
      ...prevFilter,
      sortBy: newSelectedValue,
    }));
  };

  const handleOrderSelectChange = (newSelectedValue: "asc" | "desc") => {
    setFilterObject((prevFilter) => ({
      ...prevFilter,
      sortDir: newSelectedValue,
    }));
  };

  return (
    <>
      <div className="relative w-full md:w-1/2 lg:w-1/3 flex gap-4">
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          className="pl-8 w-full"
          placeholder="Search..."
          type="search"
          onInput={handleInputChange}
          value={filterObject.searchText}
        />
      </div>
      <div className="flex items-center gap-4">
        <Select
          onValueChange={handleSortBySelectChange}
          defaultValue={filterObject.sortBy}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="createdAt">Created at</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleOrderSelectChange}
          defaultValue={filterObject.sortDir}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

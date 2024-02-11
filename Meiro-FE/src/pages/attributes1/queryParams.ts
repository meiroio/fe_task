import {
  NumberParam,
  QueryParamConfig,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { SortBy, sortDir } from "../../types";

export const useFilterParams = () => {
  const [query, setQuery] = useQueryParams({
    sortDir: withDefault(StringParam, "asc") as QueryParamConfig<sortDir>,
    sortBy: withDefault(StringParam, "name") as QueryParamConfig<SortBy>,
    searchText: withDefault(StringParam, "") as QueryParamConfig<string>,
    limit: withDefault(NumberParam, 10) as QueryParamConfig<number>,
  });

  return {
    filterParams: query,
    setFilterParams: setQuery,
  };
};

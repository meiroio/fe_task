import {
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Filters } from "../../types";

type FilterBarProps = {
  isLoading: boolean;
  filters: Filters;
  onSearchTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortDirChange: (e: SelectChangeEvent<unknown>) => void;
  onSortByChange: (e: SelectChangeEvent<unknown>) => void;
};

const FilterBar = (props: FilterBarProps) => {
  const {
    isLoading,
    filters,
    onSearchTextChange,
    onSortDirChange,
    onSortByChange,
  } = props;
  return (
    <Grid
      container
      display="flex"
      gap="20px"
      position="fixed"
      bgcolor="white"
      paddingY="30px"
      zIndex="100"
    >
      <TextField
        autoFocus
        label="Search ... "
        variant="outlined"
        value={filters.searchText}
        onChange={onSearchTextChange}
      />
      <Select
        id="select-sort-dir"
        value={filters.sortDir}
        style={{ width: "200px" }}
        label="sort direction"
        onChange={onSortDirChange}
      >
        <MenuItem value={"asc"}>asc </MenuItem>
        <MenuItem value={"desc"}>desc</MenuItem>
      </Select>

      <Select
        id="select-sort-By"
        value={filters.sortBy}
        label="sort by"
        style={{ width: "200px" }}
        onChange={onSortByChange}
      >
        <MenuItem value={"name"}>name</MenuItem>
        <MenuItem value={"createdAt"}>createdAt</MenuItem>
      </Select>
      {isLoading && (
        <Grid>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};
export default FilterBar;

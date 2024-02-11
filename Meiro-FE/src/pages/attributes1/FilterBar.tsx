import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useFilterParams } from "./queryParams";
import { SortBy, sortDir } from "../../types";

const FilterBarQuery = () => {
  const { filterParams, setFilterParams } = useFilterParams();

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
        value={filterParams.searchText}
        autoFocus
        label="search ..."
        onChange={(e) =>
          setFilterParams((params) => ({
            ...params,
            searchText: e.target.value === "" ? undefined : e.target.value,
          }))
        }
      />
      <Select
        id="demo-simple-select"
        value={filterParams.sortDir}
        style={{ width: "200px" }}
        label="sort direction"
        onChange={(e) =>
          setFilterParams((params) => ({
            ...params,
            sortDir: e.target.value as sortDir,
          }))
        }
      >
        <MenuItem value={"asc"}>asc </MenuItem>
        <MenuItem value={"desc"}>desc</MenuItem>
      </Select>

      <Select
        id="demo-simple-select"
        value={filterParams.sortBy}
        label="sort by"
        style={{ width: "200px" }}
        onChange={(e) =>
          setFilterParams((params) => ({
            ...params,
            sortBy: e.target.value as SortBy,
          }))
        }
      >
        <MenuItem value={"name"}>name</MenuItem>
        <MenuItem value={"createdAt"}>createdAt</MenuItem>
      </Select>
    </Grid>
  );
};

export default FilterBarQuery;

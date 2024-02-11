import {
  Button,
  CircularProgress,
  Grid,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttributeTable, { Column } from "../../components/Table";
import { useDeleteAttribute } from "../attributes1/[attributeId1]/actions";
import DeleteModal from "../attributes1/[attributeId1]/components/DeleteModal";
import { Waypoint } from "react-waypoint";
import { format, parseISO } from "date-fns";
import { ResponseData, SortBy, sortDir } from "../../types";
import { useGetInfiniteAttributes } from "../attributes2/actions";
import FilterBar from "../attributes2/FilterBar";
import { useRecoilState } from "recoil";
import { useMapIds } from "../../actions";
import { filtersAtom } from "./atoms";

const Attributes3 = () => {
  const navigate = useNavigate();
  const mapIds = useMapIds();
  const [isDeleteModalOpen, setOpenDeleteModal] = useState(false);
  const [selectAttributeId, setSelectAttributeId] = useState<string | null>(
    null
  );

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenModal = () => {
    setOpenDeleteModal(true);
  };

  const { mutate, isLoading: isDeleting } =
    useDeleteAttribute(handleCloseModal);

  const [filters, setFilters] = useRecoilState(filtersAtom);

  const HandleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      searchText: e.target.value,
    }));
  };

  const handleSortDirChange = (e: SelectChangeEvent<unknown>) => {
    const m = e.target.value as sortDir;
    setFilters((prevFilter) => ({
      ...prevFilter,
      sortDir: m,
    }));
  };

  const handleSortByChange = (e: SelectChangeEvent<unknown>) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      sortBy: e.target.value as SortBy,
    }));
  };

  const { data, fetchNextPage, isFetching, isLoading } =
    useGetInfiniteAttributes(filters);

  const tableData = data
    ? (data.pages as Array<ResponseData>).map((page) => page.data).flat()
    : [];

  const columns: Array<Column> = [
    {
      title: <Typography variant="body2">Name</Typography>,
      field: "name",
      render: (data) => (
        <Button
          onClick={() => {
            navigate(`../attributes3/${data.id}`, {
              state: { ...filters },
            });
          }}
        >
          {data.name}-{data.id}
        </Button>
      ),
    },
    {
      title: <Typography variant="body2">Labels</Typography>,
      field: "label",
      render: (data) => (
        <div style={{ display: "flex", gap: "4px" }}>
          {mapIds(data.labelIds as unknown as Array<string>).map((label) => (
            <h5
              style={{
                backgroundColor: "lightblue",
                borderRadius: "10px",
                color: "white",
                padding: "5px",
              }}
            >
              {label}
            </h5>
          ))}
        </div>
      ),
    },
    {
      title: <Typography variant="body2">Created at</Typography>,
      field: "create_at",
      render: (data) => (
        <div>
          {format(parseISO(data.createdAt.toString()), "eeee do MMM, yyyy")}
        </div>
      ),
    },
    {
      title: <Typography variant="body2">Actions</Typography>,
      field: "action",
      render: (data) => (
        <Button
          onClick={() => {
            setSelectAttributeId(data.id);
            handleOpenModal();
          }}
        >
          delete
        </Button>
      ),
    },
  ];

  return (
    <Grid container width="100%" marginTop="50px">
      <FilterBar
        isLoading={isLoading}
        filters={filters}
        onSearchTextChange={HandleSearchTextChange}
        onSortDirChange={handleSortDirChange}
        onSortByChange={handleSortByChange}
      />
      {data && (
        <Grid container sx={{ width: "100%" }}>
          <AttributeTable rows={tableData} columns={columns} />
        </Grid>
      )}
      <Grid
        container
        sx={{
          width: "100%",
          height: "100px",
          marginTop: "100px",
        }}
        display="flex"
        justifyContent="center"
      >
        {isFetching && <CircularProgress />}
        <Waypoint onEnter={() => fetchNextPage()} />
      </Grid>
      {selectAttributeId && (
        <DeleteModal
          isLoading={isDeleting}
          title={`Do you really want to delete this attribute ?`}
          onCloseModal={handleCloseModal}
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteAttribute={() => mutate(selectAttributeId)}
        />
      )}
    </Grid>
  );
};

export default Attributes3;

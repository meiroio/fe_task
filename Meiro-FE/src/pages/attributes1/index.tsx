import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useFilterParams } from "./queryParams";
import AttributeTable, { Column } from "../../components/Table";
import { format, parseISO } from "date-fns";
import { Navigate, useNavigate } from "react-router";
import { useGetInfiniteAttributes } from "../attributes2/actions";
import { ResponseData } from "../../types";
import { Waypoint } from "react-waypoint";
import FilterBarQuery from "./FilterBar";
import { useState } from "react";
import DeleteModal from "./[attributeId1]/components/DeleteModal";
import { useDeleteAttribute } from "./[attributeId1]/actions";
import { useMapIds } from "../../actions";

const Attributes = () => {
  const { filterParams } = useFilterParams();
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

  const columns: Array<Column> = [
    {
      title: <Typography variant="body2">Name</Typography>,
      field: "name",
      render: (data) => (
        <Button
          onClick={() => {
            navigate(`../attributes1/${data.id}`);
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
            console.log(data);
            setSelectAttributeId(data.id);
            handleOpenModal();
          }}
        >
          delete
        </Button>
      ),
    },
  ];

  const { data, fetchNextPage, isFetching, isLoading } =
    useGetInfiniteAttributes({ ...filterParams });

  //TODO  ... optimize / memoize for performance
  const tableData = data
    ? (data.pages as Array<ResponseData>).map((page) => page.data).flat()
    : [];

  return (
    <Grid>
      {typeof filterParams.limit !== "number" ||
      (filterParams.sortDir !== "desc" && filterParams.sortDir !== "asc") ||
      (filterParams.sortBy !== "name" &&
        filterParams.sortBy !== "createdAt") ? (
        <Navigate to={"../Error"} />
      ) : (
        <Grid container marginTop="50px">
          <FilterBarQuery />
          {isLoading && <CircularProgress />}
          {data && <AttributeTable rows={tableData} columns={columns} />}
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
      )}
    </Grid>
  );
};

export default Attributes;

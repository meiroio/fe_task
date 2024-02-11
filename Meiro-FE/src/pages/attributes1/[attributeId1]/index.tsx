import { useParams } from "react-router";
import useGetAttribute, { useDeleteAttribute } from "./actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

const Attribute1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setOpenDeleteModal] = useState(false);
  const { mutate, isLoading: isDeleting } = useDeleteAttribute(() =>
    navigate(-1)
  );
  const { data, isLoading, isSuccess } = useGetAttribute(id!);

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };
  const handleOpenModal = () => {
    setOpenDeleteModal(true);
  };
  return (
    <Grid
      container
      sx={{ marginTop: "55px" }}
      width="100%"
      display="flex"
      flexDirection="column"
      gap="50px"
    >
      <Box sx={{ borderBottom: "1px solid lightGrey" }}>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </Button>
      </Box>
      {isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {data && isSuccess && (
        <Grid
          container
          display="flex"
          flexDirection="column"
          gap="20px"
          alignContent="center"
        >
          <Typography variant="h4">{data.data.name}</Typography>
          <Button variant="contained" color="error" onClick={handleOpenModal}>
            Delete
          </Button>
        </Grid>
      )}

      {data && (
        <DeleteModal
          isLoading={isDeleting}
          title={`Do you really want to delete this attribute ${data.data.name} ?`}
          onCloseModal={handleCloseModal}
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteAttribute={() => mutate(id!)}
        />
      )}
    </Grid>
  );
};

export default Attribute1;

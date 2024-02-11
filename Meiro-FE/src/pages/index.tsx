import { Grid } from "@mui/material";
import { Outlet } from "react-router";

export default function Nav() {
  console.log("rerender All");
  return (
    <Grid container display="flex" width="100%" bgcolor={"red"}>
      <Outlet />
    </Grid>
  );
}

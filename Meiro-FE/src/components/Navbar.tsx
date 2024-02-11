import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./styles.css";

const tabs = [
  { label: "home", href: "./" },
  { label: "attributes1", subTitle: "query State", href: "./attributes1" },
  { label: "attributes2", subTitle: "router State", href: "./attributes2" },
  { label: "attributes3 ", subTitle: "global State", href: "./attributes3" },
];

export default function Navbar() {
  return (
    <Grid
      container
      sx={{
        // borderBottom: "1px solid lightGrey",
        position: "fixed",
        backgroundColor: "whitesmoke",
        zIndex: "100",
        top: "0px",
      }}
    >
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        {tabs.map(({ label, href, subTitle }) => (
          <li key={label}>
            <NavLink to={href}>{label}</NavLink>
            <h6 style={{ margin: 0, color: "gray" }}>{subTitle}</h6>
          </li>
        ))}
      </ul>
    </Grid>
  );
}

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Attribute } from "../types";

export type Column = {
  title: string | JSX.Element;
  field: string;
  render: (data: Row) => void;
};

export type Row = Omit<Attribute, "deleted">;

type TableProps = { rows: Array<Row>; columns: Array<Column> };

export default function AttributeTable(props: TableProps) {
  const { rows, columns } = props;
  return (
    <TableContainer component={Paper} style={{ marginTop: "100px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align="left" key={column.field}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`${row.id}`}>
              {columns.map((column) => (
                <TableCell align="left" key={`${row.id}+${column.field}`}>
                  <>{column.render(row)}</>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

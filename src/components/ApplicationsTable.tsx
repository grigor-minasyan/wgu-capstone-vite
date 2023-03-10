import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { initialCollegeApps } from "../initialCollegeApps";
import { CollegeApp } from "../types";

const columns: GridColDef<CollegeApp>[] = [
  {
    field: "GREScore",
    headerName: "GRE Score",
    type: "number",
  },
  {
    field: "TOEFLScore",
    headerName: "TOEFL Score",
    type: "number",
  },
  {
    field: "universityRank",
    headerName: "Uni rank (out of 5)",
    type: "number",
    width: 180,
  },
  {
    field: "SOPstrength",
    headerName: "Statement of purpose (out of 5)",
    type: "number",
    width: 180,
  },
  {
    field: "LORstrength",
    headerName: "Letter of recommendation (out of 5)",
    type: "number",
    width: 180,
  },
  {
    field: "GPA",
    headerName: "GPA",
    type: "number",
  },
  {
    field: "researchExp",
    headerName: "Research experience",
    width: 180,
    valueFormatter({ value }: { value: boolean }) {
      return value ? "Yes" : "No";
    },
  },
  {
    field: "chance",
    headerName: "Chances of acceptance",
    width: 180,
    valueFormatter({ value }: { value: number }) {
      return (value * 100).toFixed(0) + "%";
    },
  },
];

export default function ApplicationsTable() {
  return (
    <Box sx={{ height: 400, width: "100%", my: 2, py: 2 }}>
      <DataGrid
        rows={initialCollegeApps}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 50, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "request_id", headerName: "Id", width: 70 },
  { field: "request_path", headerName: "RequestPath", width: 130 },
  { field: "request_type", headerName: "RequestType", width: 130 },
  {
    field: "request_time",
    headerName: "RequestTime",
    width: 90,
  },
  {
    field: "payload",
    headerName: "Payload",
    width: 130,
  },
  {
    field: "content_type",
    headerName: "ContentType",
    width: 130,
  },
  {
    field: "ip_address",
    headerName: "IP Address",
    width: 90,
  },
  {
    field: "os",
    headerName: "OS",
    width: 90,
  },
  {
    field: "user_agent",
    headerName: "Browser",
    width: 90,
  },
];



export default function DataTable({ data }) {
  console.log("data", data)
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row.request_id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

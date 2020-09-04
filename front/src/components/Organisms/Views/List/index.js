import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
const ListView = (props) => {
  const { data, handlers } = props;

  const options = {
    onRowClick: handlers.selectEvent,
    rowsPerPage: 50,
  };
  const columns = [
    {
      label: "_id",
      name: "_id",
      options: { display: false, filter: false },
    },
    {
      label: "Title",
      name: "title",
      options: { filter: false },
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) =>
          tableMeta.rowData[2].length > 20
            ? tableMeta.rowData[2].substr(0, 20)
            : tableMeta.rowData[2],
      },
    },
    {
      label: "Start Date",
      name: "start",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) =>
          moment(tableMeta.rowData[3]).format("DD/MM/YYYY HH:mm"),
      },
    },
    {
      label: "End Date",
      name: "end",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) =>
          moment(tableMeta.rowData[4]).format("DD/MM/YYYY HH:mm"),
      },
    },
    {
      label: "",
      name: "options",
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
        empty: true,
        label: true,
      },
    },
  ];
  return (
    <Grid item md={12}>
      <MUIDataTable
        data-cy="datatable-events"
        key="events"
        data={data}
        columns={columns}
        options={options}
      />
    </Grid>
  );
};

export { ListView };

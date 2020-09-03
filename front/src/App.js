import React from "react";
import { Grid } from "@material-ui/core";
import { AppRouter } from "./router/AppRouter";
// import { MuiThemeProvider } from "@material-ui/core/styles";

export const App = () => {
  return (
    // <MuiThemeProvider theme={theme}>
    <Grid container spacing={0}>
      <AppRouter />
    </Grid>
    // </MuiThemeProvider>
  );
};

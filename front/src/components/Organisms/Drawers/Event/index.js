import React, { useState } from "react";
import moment from "moment";

import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";

import { EventForm } from "../../../Molecules/Forms/Event";

const useStyles = makeStyles(() => ({
  drawerContainer: { padding: "24px", width: "380px" },
  icon: { margin: "8px" },
  flex: {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  },
}));
const EventDrawer = (props) => {
  const classes = useStyles();
  console.log("EventDrawer props", props);
  const { variant, info, handlers, open, ...rest } = props;

  const [mode, setMode] = useState("view");

  const handleUpdateEvent = (event) => {
    console.log("handleUpdateEvent event", event);
    handlers.updateEvent(event);
    setMode("view");
  };
  return (
    <Drawer anchor="right" open={open} onClose={handlers.onClose}>
      <Grid container className={classes.drawerContainer}>
        {mode === "view" ? (
          <>
            <Grid item xs={12} className={classes.flex}>
              <Typography variant="h3">{info && info.title}</Typography>
              <EditIcon
                style={{ color: "#ffe082" }}
                className={classes.icon}
                onClick={() => {
                  setMode("edit");
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.flex}>
              <Typography variant="body2">
                {info && info.description}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.flex}>
              <AlarmAddIcon className={classes.icon} />
              <Typography variant="h6">Start</Typography>
              <Typography variant="body2">
                {info && moment(info.start).format("DD/MM/YYY HH:mm")}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.flex}>
              <AlarmOffIcon className={classes.icon} />
              <Typography variant="h6">End: </Typography>
              <Typography variant="body2">
                {info && moment(info.end).format("DD/MM/YYY HH:mm")}
              </Typography>
            </Grid>
          </>
        ) : mode === "edit" ? (
          <EventForm
            mode={mode}
            handlers={{
              onClose: () => {
                setMode("view");
              },
              updateEvent: handleUpdateEvent,
            }}
            initialValues={info}
          />
        ) : null}
      </Grid>
    </Drawer>
  );
};

export { EventDrawer };

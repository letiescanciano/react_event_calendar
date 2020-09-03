import React, { useState, useEffect } from "react";

import { Button, Typography, Grid, makeStyles } from "@material-ui/core";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ViewListIcon from "@material-ui/icons/ViewList";
import { EventDialog } from "../../Organisms/Dialogs/Event";
import { CalendarView } from "../../Organisms/Views/Calendar";
import { ListView } from "../../Organisms/Views/List";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  },

  layoutOptions: {
    display: "flex",
    "justify-content": "flex-end",
    width: "97%",
    padding: "10px 0px",
  },
}));
const EventList = () => {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

  const [variant, setVariant] = useState("add");
  const [openDialogAddEvent, setOpenDialogAddEvent] = useState(false);

  const [showCalendar, setShowCalendar] = useState(true);
  const [showDataTable, setShowDataTable] = useState(false);

  useEffect(() => {
    //get events
  }, []);

  const handleShowCalendar = () => {
    if (!showCalendar) {
      setShowCalendar(true);
      setShowDataTable(false);
    }
  };

  const handleShowDataTable = () => {
    if (!showDataTable) {
      setShowCalendar(false);
      setShowDataTable(true);
    }
  };
  const handleDialogAddEvent = () => setOpenDialogAddEvent(!openDialogAddEvent);

  const handleSelectSlot = ({ start, end }) => {
    console.log("handleSelectSlot ", start, end);
    setInitialValues({ ...initialValues, start, end });
    handleDialogAddEvent();
  };

  const handleSelectEvent = (event) => {
    console.log("handleSelectEvent ", event);
    // setInitialValues({ ...initialValues, start, end });
    // handleDialogAddEvent();
  };
  // const handleDialogAddEvent = () =>
  const createEvent = (values) => {
    console.log("Event data", values);
    //post to api
    setEvents((events) => [...events, values]);
  };
  return (
    <>
      <EventDialog
        open={openDialogAddEvent}
        initialValues={initialValues}
        variant={variant}
        handlers={{
          onClose: handleDialogAddEvent,
          createEvent,
        }}
      />
      <Grid item md={12} className={classes.flex}>
        <Typography variant="h1" color="primary">
          Event calendar
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDialogAddEvent}
        >
          Add event
        </Button>
      </Grid>
      <Grid className={classes.layoutOptions}>
        <Button
          variant="text"
          data-cy="view-calendar"
          onClick={handleShowCalendar}
        >
          <CalendarTodayIcon
            fontSize="default"
            color={showCalendar ? "primary" : "inherit"}
          />
        </Button>
        <Button
          variant="text"
          data-cy="view-datatable"
          onClick={handleShowDataTable}
        >
          <ViewListIcon
            fontSize="default"
            color={showDataTable ? "primary" : "inherit"}
          />
        </Button>
      </Grid>
      <Grid item md={12} className={classes.flex}>
        {showCalendar ? (
          <CalendarView
            data={events}
            handlers={{
              selectSlot: handleSelectSlot,
              selectEvent: handleSelectEvent,
            }}
          />
        ) : showDataTable ? (
          <ListView />
        ) : null}
      </Grid>
    </>
  );
};

export { EventList };

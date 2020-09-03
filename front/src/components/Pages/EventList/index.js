import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Typography, Grid, makeStyles } from "@material-ui/core";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ViewListIcon from "@material-ui/icons/ViewList";
import { EventDialog } from "../../Organisms/Dialogs/Event";
import { CalendarView } from "../../Organisms/Views/Calendar";
import { ListView } from "../../Organisms/Views/List";
import { EventDrawer } from "../../Organisms/Drawers/Event";
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

const demoEvents = [
  {
    _id: 1,
    title: "Event 1",
    description: "afafasfsa",
    start: "2020-09-04T02:00:00.000Z",
    end: "2020-09-04T04:30:00.000Z",
  },
  {
    _id: 2,
    title: "Event 2",
    description: "afafasfsa",
    start: "2020-09-05T02:00:00.000Z",
    end: "2020-09-05T08:30:00.000Z",
  },
  {
    _id: 3,
    title: "Event 3",
    description: "afafasfsa",
    start: "2020-09-02T02:00:00.000Z",
    end: "2020-09-02T04:30:00.000Z",
  },
  {
    _id: 5,
    title: "Event 5",
    description: "afafasfsa",
    start: "2020-09-04T02:00:00.000Z",
    end: "2020-09-04T04:30:00.000Z",
  },
  {
    _id: 4,
    title: "Event 4",
    description: "afafasfsa",
    start: "2020-09-08T02:00:00.000Z",
    end: "2020-09-08T04:30:00.000Z",
  },
];
const EventList = () => {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

  const [mode, setMode] = useState("add");
  const [openDialogAddEvent, setOpenDialogAddEvent] = useState(false);

  const [showCalendar, setShowCalendar] = useState(true);
  const [showDataTable, setShowDataTable] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [eventSelected, setEventSelected] = useState(null);

  useEffect(() => {
    //TODO get events from API
    setEvents(
      demoEvents.map((event) => ({
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
      }))
    );
  }, []);

  useEffect(() => {
    if (eventSelected) {
      let _events = [...events];
      _events.some((_event, index) => {
        if (_event._id === eventSelected._id) {
          _events[index] = { ...eventSelected };
          return true;
        }
        return false;
      });
      setEvents(_events);
    }
  }, [eventSelected]);

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
    toggleDrawer();
    setEventSelected(event);
    // handleDialogAddEvent();
  };
  // const handleDialogAddEvent = () =>
  const createEvent = (values) => {
    console.log("createEvent data", JSON.stringify(values));
    //TODO post to api
    setEvents((events) => [
      ...events,
      {
        ...values,
        start: moment(values.start).toDate(),
        end: moment(values.end).toDate(),
      },
    ]);
  };
  const updateEvent = (values) => {
    console.log("updateEvent data PUT", JSON.stringify(values));
    //TODO put to api
    setEventSelected(values);
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <>
      <EventDialog
        open={openDialogAddEvent}
        initialValues={initialValues}
        mode={mode}
        handlers={{
          onClose: handleDialogAddEvent,
          createEvent,
        }}
      />
      <EventDrawer
        open={openDrawer}
        mode={mode}
        toggleDrawer={toggleDrawer}
        info={eventSelected}
        handlers={{
          onClose: toggleDrawer,
          updateEvent,
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

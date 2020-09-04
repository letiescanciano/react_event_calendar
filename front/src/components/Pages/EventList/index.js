import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Button, Typography, Grid, makeStyles } from "@material-ui/core";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ViewListIcon from "@material-ui/icons/ViewList";
import { EventDialog } from "../../Organisms/Dialogs/Event";
import { CalendarView } from "../../Organisms/Views/Calendar";
import { ListView } from "../../Organisms/Views/List";
import { EventDrawer } from "../../Organisms/Drawers/Event";

import EventServices from "../../../services/events";
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
  const eventService = new EventServices();

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
    let isMounted = true;
    let source = axios.CancelToken.source();
    const getEvents = async () => {
      try {
        const { data, status } = await eventService.getEvents(); //("http://localhost:4000/events");
        console.log("events", events);
        if (status === 200 && isMounted) {
          setEvents(
            data.map((event) => ({
              ...event,
              start: moment(event.start).toDate(),
              end: moment(event.end).toDate(),
            }))
          );
        }
      } catch (e) {
        console.log("error", e);
      }
    };
    getEvents();
    return () => {
      isMounted = false;
      source.cancel("Cancelling request in cleanup");
    };
  }, []);

  // useEffect(() => {
  //   if (eventSelected) {
  //     let _events = [...events];
  //     _events.some((_event, index) => {
  //       if (_event._id === eventSelected._id) {
  //         _events[index] = { ...eventSelected };
  //         return true;
  //       }
  //       return false;
  //     });
  //     setEvents(_events);
  //   }
  // }, [eventSelected]);

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
  };

  const createEvent = async (values) => {
    console.log("createEvent data", JSON.stringify(values));

    //TODO post to api

    try {
      const { data, status } = await eventService.createEvent(values);
      console.log("event", data);
      if (status === 201) {
        setEvents((events) => [
          ...events,
          {
            ...data,
            start: moment(data.start).toDate(),
            end: moment(data.end).toDate(),
          },
        ]);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const updateEvent = async (values) => {
    console.log("updateEvent data PUT", JSON.stringify(values));

    try {
      const { data, status } = await eventService.updateEvent(values);
      console.log("events", data);
      if (status === 201) {
        let _events = [...events];
        _events.some((_event, index) => {
          if (_event._id === data._id) {
            _events[index] = {
              ...data,
              start: moment(data.start).toDate(),
              end: moment(data.end).toDate(),
            };
            return true;
          }
          return false;
        });
        setEvents(_events);
        setEventSelected(data);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const deleteEvent = async () => {
    console.log("Event selected", eventSelected);
    try {
      const { data, status } = await eventService.deleteEvent(
        eventSelected._id
      );
      console.log("event deleted data", data);
      if (status === 200) {
        let _events = [...events].filter((_event) => _event._id !== data._id);
        setEvents(_events);
        setEventSelected(null);
        toggleDrawer();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <>
      {openDialogAddEvent && (
        <EventDialog
          open={openDialogAddEvent}
          initialValues={initialValues}
          mode={mode}
          handlers={{
            onClose: handleDialogAddEvent,
            createEvent,
          }}
        />
      )}
      {openDrawer && (
        <EventDrawer
          open={openDrawer}
          mode={mode}
          toggleDrawer={toggleDrawer}
          info={eventSelected}
          handlers={{
            onClose: toggleDrawer,
            updateEvent,
            deleteEvent,
          }}
        />
      )}
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

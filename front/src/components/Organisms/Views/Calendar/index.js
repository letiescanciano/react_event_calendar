import React, { useState, useEffect } from "react";
// import BigCalendar from "react-big-calendar";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";
import moment from "moment";

const CalendarView = (props) => {
  console.log("CalendarView props", props);

  const { data, handlers, ...rest } = props;
  const [date, setDate] = useState(moment().toDate());
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      selectable
      localizer={localizer}
      events={data}
      views={["month", "week", "day"]}
      defaultView={Views.WEEK}
      scrollToTime={new Date(1970, 1, 1, 6)}
      date={date}
      onNavigate={(_date) => setDate(_date)}
      onSelectEvent={(event) => handlers.selectEvent(event)}
      onSelectSlot={handlers.selectSlot}
    />
  );
};

export { CalendarView };

import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

export default ({ rawEvents }) => {
  if (!rawEvents) {
    return null;
  }
  const events = rawEvents.map(event => ({
    title: `${event.abbreviation} (${event.location &&
      event.location
        .split(",")[0]
        .replace("–", "")
        .trim()}) [${event.type}]`,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  return (
    <BigCalendar
      localizer={localizer}
      defaultDate={new Date(2018, 10, 25)}
      defaultView="week"
      events={events}
      style={{ height: "100vh" }}
    />
  );
};

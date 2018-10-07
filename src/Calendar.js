import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

export default ({ events }) => {
  if (!events) {
    return null;
  }

  return (
    <div className="Calendar">
      <BigCalendar
        localizer={localizer}
        defaultDate={new Date(2018, 10, 25)}
        defaultView="week"
        events={events}
      />
    </div>
  );
};

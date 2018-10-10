import React from "react";
import { connect } from "react-redux";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { setEventPriority, deleteEvent, restoreEvent } from "./actions";
import "./Event.scss";

const Event = ({
  event: { id, title, tooltip, deleted },
  priorities,
  setEventPriority,
  deleteEvent,
  restoreEvent
}) => {
  const priorityMenuItems = priorities.map(priority => (
    <MenuItem key={priority} onClick={() => setEventPriority({ id, priority })}>
      {priority}
    </MenuItem>
  ));

  return (
    <div className="Event">
      <ContextMenuTrigger id={id}>
        <div title={tooltip}>{title}</div>
      </ContextMenuTrigger>
      <ContextMenu id={id}>
        {priorityMenuItems}
        <MenuItem divider />
        {deleted ? (
          <MenuItem onClick={() => restoreEvent(id)}>Restore</MenuItem>
        ) : (
          <MenuItem onClick={() => deleteEvent(id)}>Delete</MenuItem>
        )}
      </ContextMenu>
    </div>
  );
};

const mapStateToProps = ({ events }) => ({
  priorities: events.priorities
});

export default connect(
  mapStateToProps,
  { setEventPriority, deleteEvent, restoreEvent }
)(Event);

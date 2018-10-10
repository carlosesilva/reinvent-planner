import React from "react";
import { connect } from "react-redux";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { setEventPriority } from "./actions";
import "./Event.scss";

const Event = ({
  event: { id, title, tooltip },
  priorities,
  setEventPriority
}) => {
  const handleClick = (e, data) => {
    console.log(e, data);
  };

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
        <MenuItem onClick={handleClick}>Delete</MenuItem>
      </ContextMenu>
    </div>
  );
};

const mapStateToProps = ({ events }) => ({
  priorities: events.priorities
});

export default connect(
  mapStateToProps,
  { setEventPriority }
)(Event);

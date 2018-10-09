import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./Event.scss";

export default props => {
  const {
    event: { id, title, tooltip }
  } = props;

  const handleClick = (e, data) => {
    console.log(e, data);
  };

  debugger;
  return (
    <div ClassName="Event">
      <ContextMenuTrigger id={id}>
        <div title={tooltip}>{title}</div>
      </ContextMenuTrigger>
      <ContextMenu id={id}>
        <MenuItem data={{ priority: "high" }} onClick={handleClick}>
          High
        </MenuItem>
        <MenuItem data={{ priority: "medium" }} onClick={handleClick}>
          Medium
        </MenuItem>
        <MenuItem data={{ priority: "low" }} onClick={handleClick}>
          Low
        </MenuItem>
        <MenuItem divider />
        <MenuItem onClick={handleClick}>Delete</MenuItem>
      </ContextMenu>
    </div>
  );
};

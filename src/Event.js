import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { setEventPriority, deleteEvent, restoreEvent } from "./actions";
import "./Event.scss";

class Event extends PureComponent {
  renderPriorityMenuItems() {
    return this.props.priorities.map(priority => (
      <MenuItem
        key={priority}
        onClick={() =>
          this.props.setEventPriority({ id: this.props.event.id, priority })
        }
      >
        {priority}
      </MenuItem>
    ));
  }
  render() {
    const {
      event: { id, title, tooltip, deleted },
      deleteEvent,
      restoreEvent
    } = this.props;

    return (
      <div className="Event">
        <ContextMenuTrigger id={id}>
          <div title={tooltip}>{title}</div>
        </ContextMenuTrigger>
        <ContextMenu id={id}>
          {this.renderPriorityMenuItems()}
          <MenuItem divider />
          {deleted ? (
            <MenuItem onClick={() => restoreEvent(id)}>Restore</MenuItem>
          ) : (
            <MenuItem onClick={() => deleteEvent(id)}>Delete</MenuItem>
          )}
        </ContextMenu>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  priorities: events.priorities
});

export default connect(
  mapStateToProps,
  { setEventPriority, deleteEvent, restoreEvent }
)(Event);

import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "./Button";
import { toggleEventsLoader, toggleFilters } from "./actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="Header">
        <div>
          <h1>re:Invent Planner</h1>
          <p>
            Plan your AWS re:Invent 2018 schedule by visualizing it in a
            calendar.
          </p>
        </div>
        <div className="Header__controls">
          <Button
            onClick={() => {
              this.props.toggleEventsLoader(true);
            }}
          >
            {this.props.events.length ? "Re-Import Sessions" : "Get Started"}
          </Button>
          {this.props.events.length ? (
            <Button onClick={() => this.props.toggleFilters()}>
              {this.props.isFiltersShown ? "Hide Filters" : "Show Filters"}
              {` (${this.props.filteredEvents.length}/${
                this.props.events.length
              })`}
            </Button>
          ) : null}
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events: events.events,
  filteredEvents: events.filteredEvents,
  isFiltersShown: events.isFiltersShown
});

export default connect(
  mapStateToProps,
  { toggleEventsLoader, toggleFilters }
)(Header);

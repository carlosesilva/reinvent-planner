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
            Plan your AWS re:Invent 2019 schedule by visualizing it in a
            calendar.
          </p>
        </div>
        <div className="Header__controls">
          <Button
            onClick={() => {
              this.props.toggleEventsLoader(true);
            }}
          >
            {this.props.numEvents ? "Re-Import Sessions" : "Get Started"}
          </Button>
          {this.props.numEvents ? (
            <Button onClick={() => this.props.toggleFilters()}>
              {this.props.isFiltersShown ? "Hide Filters" : "Show Filters"}
              {` (${this.props.numFilteredEvents}/${this.props.numEvents})`}
            </Button>
          ) : null}
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  numEvents: Object.keys(events.events).length,
  numFilteredEvents: Object.keys(events.filteredEvents).length,
  isFiltersShown: events.isFiltersShown
});

export default connect(
  mapStateToProps,
  { toggleEventsLoader, toggleFilters }
)(Header);

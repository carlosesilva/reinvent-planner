import React, { Component } from "react";
import Header from "./Header";
import Filters from "./Filters";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filteredEvents: [],
      isFiltersShown: false
    };

    this.onFilteredEvents = this.onFilteredEvents.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  toggleFilters(show) {
    let isFiltersShown = this.state.isFiltersShown;
    if (typeof show === "undefined") {
      isFiltersShown = !isFiltersShown;
    } else {
      isFiltersShown = show;
    }
    this.setState({
      isFiltersShown
    });
  }

  onFilteredEvents(filteredEvents) {
    this.setState({
      filteredEvents
    });
  }

  render() {
    const classNames = ["App"];
    if (this.state.isFiltersShown) {
      classNames.push("App-showFilters");
    }
    return (
      <div className={classNames.join(" ")}>
        <Header
          numEvents={this.state.events.length}
          numFilteredEvents={this.state.filteredEvents.length}
          isFiltersShown={this.state.isFiltersShown}
          toggleFilters={this.toggleFilters}
        />
        <Filters
          isFiltersShown={this.state.isFiltersShown}
          events={this.state.events}
          filteredEvents={this.state.filteredEvents}
          onFilteredEvents={this.onFilteredEvents}
        />
        <Calendar events={this.state.filteredEvents} />
        <EventsLoader />
      </div>
    );
  }
}

export default App;

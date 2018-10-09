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
      isEventsLoaderShown: false,
      isFiltersShown: false
    };

    this.onNewEvents = this.onNewEvents.bind(this);
    this.onFilteredEvents = this.onFilteredEvents.bind(this);
    this.showEventsLoader = this.showEventsLoader.bind(this);
    this.hideEventsLoader = this.hideEventsLoader.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  componentDidMount() {
    const events = localStorage.getItem("events");
    if (events) {
      this.setState({
        events: JSON.parse(events).map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }))
      });
    }
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

  showEventsLoader() {
    this.setState({ isEventsLoaderShown: true });
  }

  hideEventsLoader() {
    this.setState({ isEventsLoaderShown: false });
  }

  onNewEvents(events) {
    localStorage.setItem(
      "events",
      JSON.stringify(
        events.map(event => ({
          ...event,
          start: event.start.getTime(),
          end: event.end.getTime()
        }))
      )
    );
    this.setState({
      events,
      isEventsLoaderShown: false
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
          showEventsLoader={this.showEventsLoader}
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
        <EventsLoader
          isEventsLoaderShown={this.state.isEventsLoaderShown}
          hideEventsLoader={this.hideEventsLoader}
          onNewEvents={this.onNewEvents}
        />
      </div>
    );
  }
}

export default App;

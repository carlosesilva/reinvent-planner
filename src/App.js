import React, { Component } from "react";
import Header from "./Header";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], filteredEvents: [], isEventsLoaderShown: false };

    this.onNewEvents = this.onNewEvents.bind(this);
    this.onFilteredEvents = this.onFilteredEvents.bind(this);
    this.showEventsLoader = this.showEventsLoader.bind(this);
    this.hideEventsLoader = this.hideEventsLoader.bind(this);
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
    return (
      <div className="App">
        <Header
          hasEvents={this.state.events.length > 0}
          showEventsLoader={this.showEventsLoader}
          events={this.state.events}
          filteredEvents={this.state.filteredEvents}
          onFilteredEvents={this.onFilteredEvents}
        />
        <EventsLoader
          isEventsLoaderShown={this.state.isEventsLoaderShown}
          hideEventsLoader={this.hideEventsLoader}
          onNewEvents={this.onNewEvents}
        />
        <Calendar events={this.state.filteredEvents} />
      </div>
    );
  }
}

export default App;

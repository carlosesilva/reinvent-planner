import React, { Component } from "react";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };

    this.onNewEvents = this.onNewEvents.bind(this);
  }
  onNewEvents(events) {
    this.setState({
      events
    });
  }
  render() {
    return (
      <div className="App">
        <EventsLoader onNewEvents={this.onNewEvents} />
        <Calendar events={this.state.events} />
      </div>
    );
  }
}

export default App;

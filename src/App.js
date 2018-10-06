import React, { Component } from "react";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <EventsLoader />
        <Calendar rawEvents={[]} />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import ReactModal from "react-modal";
import Header from "./Header";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

ReactModal.setAppElement("#root");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [], showEventsLoader: true };

    this.onNewEvents = this.onNewEvents.bind(this);
    this.showEventsLoader = this.showEventsLoader.bind(this);
    this.hideEventsLoader = this.hideEventsLoader.bind(this);
  }

  showEventsLoader() {
    this.setState({ showEventsLoader: true });
  }

  hideEventsLoader() {
    this.setState({ showEventsLoader: false });
  }

  onNewEvents(events) {
    this.setState({
      events,
      showEventsLoader: false
    });
  }
  render() {
    return (
      <div className="App">
        <Header
          hasEvents={this.state.events.length > 0}
          howEventsLoader={this.showEventsLoader}
        />
        <ReactModal
          isOpen={this.state.showEventsLoader}
          contentLabel="Minimal Modal Example"
          onRequestClose={this.hideEventsLoader}
        >
          <EventsLoader
            onNewEvents={this.onNewEvents}
            hideEventsLoader={this.hideEventsLoader}
          />
        </ReactModal>
        <Calendar events={this.state.events} />
      </div>
    );
  }
}

export default App;

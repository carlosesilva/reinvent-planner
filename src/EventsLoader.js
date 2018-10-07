import React, { Component } from "react";
import CodeSnippet from "./CodeSnippet";

class EventsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { eventsJson: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ eventsJson: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const events = JSON.parse(this.state.eventsJson).map(event => ({
      title: `${event.abbreviation} (${event.location &&
        event.location
          .split(",")[0]
          .replace("–", "")
          .trim()}) [${event.type}]`,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    this.props.onNewEvents(events);
  }

  render() {
    return (
      <div className="EventsLoader">
        <button
          className="EventsLoader__close"
          onClick={this.props.hideEventsLoader}
        >
          Close
        </button>
        <p>
          Use the javascript code below to gather the information about the
          sessions you are interested in.
        </p>
        <CodeSnippet />
        <form className="EventsLoader__form" onSubmit={this.handleSubmit}>
          <label>
            Paste the JSON result here:
            <textarea
              onChange={this.handleChange}
              value={this.state.eventsJson}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EventsLoader;

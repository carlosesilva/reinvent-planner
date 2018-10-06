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
    console.log("Submitted: " + this.state.eventsJson);
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
        <CodeSnippet />
        <form className="EventsLoader__form" onSubmit={this.handleSubmit}>
          <label>
            Paste the result here:
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

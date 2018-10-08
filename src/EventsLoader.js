import React, { Component } from "react";
import ReactModal from "react-modal";
import CodeSnippet from "./CodeSnippet";
import Button from "./Button";

ReactModal.setAppElement("#root");

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
      <ReactModal
        isOpen={this.props.isEventsLoaderShown}
        contentLabel="Events Loader"
        onRequestClose={this.props.hideEventsLoader}
      >
        <Button className="close-modal" onClick={this.props.hideEventsLoader}>
          Close
        </Button>
        <div className="EventsLoader">
          <p>
            Use the javascript code below to gather the information about the
            sessions you are interested in.
          </p>
          <CodeSnippet />
          <form className="EventsLoader__form" onSubmit={this.handleSubmit}>
            <label>
              <p>Paste the JSON result here:</p>
              <textarea
                onChange={this.handleChange}
                value={this.state.eventsJson}
              />
            </label>
            <input type="submit" value="Upload" />
          </form>
        </div>
      </ReactModal>
    );
  }
}

export default EventsLoader;

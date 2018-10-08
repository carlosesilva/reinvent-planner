import React, { Component } from "react";
import ReactModal from "react-modal";
import CodeSnippet from "./CodeSnippet";
import Button from "./Button";

ReactModal.setAppElement("#root");

class EventsLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { rawEventsJson: "", error: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const rawEventsJson = localStorage.getItem("rawEventsJson");
    if (rawEventsJson) {
      this.setState({ rawEventsJson });
    }
  }

  handleChange(event) {
    this.setState({ rawEventsJson: event.target.value, error: null });
  }

  handleSubmit(e) {
    e.preventDefault();

    try {
      const rawEvents = JSON.parse(this.state.rawEventsJson);
      const events = rawEvents.map(event => ({
        title: `${event.abbreviation} (${event.location &&
          event.location
            .split(",")[0]
            .replace("–", "")
            .trim()}) [${event.type}]`,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      localStorage.setItem("rawEventsJson", this.state.rawEventsJson);
      this.props.onNewEvents(events);
    } catch (error) {
      this.setState({
        error: error.toString()
      });
    }
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
            <strong>
              Visualize in calendar format the AWS re:Invent 2018 sessions that
              you are interested in.
            </strong>
          </p>
          <ol>
            <li>
              Copy the JS code snippet below: <CodeSnippet />
            </li>
            <li>
              Login into the{" "}
              <a
                href="https://www.portal.reinvent.awsevents.com/portal/login.ww"
                target="_blank"
                rel="noopener noreferrer"
              >
                re:Invent website
              </a>{" "}
              and navigate to the Interests page.
            </li>
            <li>
              Paste the code snippet into the browser's console and run it.
            </li>
            <li>
              Copy the JSON result in the textarea below and hit Upload:
              <form className="EventsLoader__form" onSubmit={this.handleSubmit}>
                <textarea
                  onChange={this.handleChange}
                  value={this.state.rawEventsJson}
                />
                <Button disabled={this.state.rawEventsJson.trim().length < 1}>
                  Upload
                </Button>
                {this.state.error && (
                  <p className="EventsLoader__error">
                    Unable to upload:
                    <pre>{this.state.error}</pre>
                  </p>
                )}
              </form>
            </li>
          </ol>
        </div>
      </ReactModal>
    );
  }
}

export default EventsLoader;

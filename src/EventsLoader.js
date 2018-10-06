import React, { Component } from "react";
import CodeSnippet from "./CodeSnippet";

class EventsLoader extends Component {
  state = {};
  render() {
    return (
      <div className="EventsLoader">
        <CodeSnippet />
        <form className="EventsLoader__form">
          <textarea />
        </form>
      </div>
    );
  }
}

export default EventsLoader;

import React, { Component } from "react";
import CodeSnippet from "./CodeSnippet";
import Calendar from "./Calendar";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CodeSnippet />
        <Calendar rawEvents={[]} />
      </div>
    );
  }
}

export default App;

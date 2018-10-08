import React, { Component } from "react";
import Button from "./Button";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="Header">
        <div>
          <h1>re:Invent Planner</h1>
          <p>
            Plan your AWS re:Invent 2018 sessions by visualizing it in a
            calendar.
          </p>
        </div>
        <Button onClick={this.props.showEventsLoader}>
          {this.props.hasEvents ? "Re-Import Sessions" : "Get Started"}
        </Button>
      </header>
    );
  }
}

export default Header;

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
        <h1>re:Invent Planner</h1>
        <Button onClick={this.props.showEventsLoader}>
          {this.props.hasEvents ? "Update Events" : "Upload Events"}
        </Button>
      </header>
    );
  }
}

export default Header;

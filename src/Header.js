import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="Header">
        <button onClick={this.props.showEventsLoader}>
          {this.props.hasEvents ? "Update Events" : "Upload Events"}
        </button>
      </header>
    );
  }
}

export default Header;

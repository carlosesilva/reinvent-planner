import React, { Component } from "react";
class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };

    this.filterEvents = this.filterEvents.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    this.filterEvents();
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.filterEvents();
    }
  }

  filterEvents() {
    let filteredEvents;

    // Filter based on search.
    filteredEvents = this.props.events.filter(event =>
      event.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    this.props.onFilteredEvents(filteredEvents);
  }

  onFilterChange(newState) {
    this.setState(newState, this.filterEvents);
  }

  render() {
    return (
      <form>
        <label>
          Search:{" "}
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={event =>
              this.onFilterChange({ searchQuery: event.target.value })
            }
          />
        </label>
      </form>
    );
  }
}

export default Filters;

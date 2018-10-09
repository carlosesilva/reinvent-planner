import React, { Component } from "react";
class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      locationFilters: {}
    };

    this.filterEvents = this.filterEvents.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.renderLocationFilter = this.renderLocationFilter.bind(this);
    this.updateLocationFilters = this.updateLocationFilters.bind(this);
  }

  componentDidMount() {
    this.updateLocationFilters();
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.updateLocationFilters();
    }
  }

  updateLocationFilters() {
    const locationFilters = {};

    this.props.events.forEach(event => {
      if (event.location) {
        locationFilters[event.location] = true;
      }
    });

    this.setState(
      {
        locationFilters
      },
      this.filterEvents
    );
  }

  filterEvents() {
    let filteredEvents = [...this.props.events];

    // Filter based on search.
    filteredEvents = filteredEvents.filter(event =>
      event.tooltip.toLowerCase().includes(this.state.searchQuery.toLowerCase())
    );

    // Filter based on locations.
    filteredEvents = filteredEvents.filter(
      event => this.state.locationFilters[event.location]
    );

    this.props.onFilteredEvents(filteredEvents);
  }

  onFilterChange(newState) {
    this.setState(newState, this.filterEvents);
  }

  renderLocationFilter() {
    const locationFilters = Object.entries(this.state.locationFilters).map(
      ([location, checked]) => (
        <li key={location}>
          <label>
            <input
              type="checkbox"
              name={location}
              onChange={event =>
                this.onFilterChange({
                  locationFilters: {
                    ...this.state.locationFilters,
                    [location]: !this.state.locationFilters[location]
                  }
                })
              }
              checked={checked}
            />
            {location}
          </label>
        </li>
      )
    );
    return <ul className="Filters__checkboxes">{locationFilters}</ul>;
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div>
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
        </div>
        {this.renderLocationFilter()}
      </form>
    );
  }
}

export default Filters;

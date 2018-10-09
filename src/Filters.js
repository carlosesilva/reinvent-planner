import React, { Component } from "react";
import CheckboxFilterList from "./CheckboxFilterList";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      locationFilters: {},
      typeFilters: {}
    };

    this.filterEvents = this.filterEvents.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.getLocationFilters = this.getLocationFilters.bind(this);
    this.getTypeFilters = this.getTypeFilters.bind(this);
  }

  componentDidMount() {
    this.updateFilters();
  }

  componentDidUpdate(prevProps) {
    if (this.props.events !== prevProps.events) {
      this.updateFilters();
    }
  }

  updateFilters() {
    this.setState(
      {
        locationFilters: this.getLocationFilters(),
        typeFilters: this.getTypeFilters()
      },
      this.filterEvents
    );
  }

  getTypeFilters() {
    const typeFilters = {};

    this.props.events.forEach(event => {
      typeFilters[event.type] = true;
    });

    return typeFilters;
  }

  getLocationFilters() {
    const locationFilters = {};

    this.props.events.forEach(event => {
      locationFilters[event.location] = true;
    });

    return locationFilters;
  }

  filterEvents() {
    let filteredEvents = [...this.props.events];

    // Filter based on search.
    if (this.state.searchQuery.trim()) {
      filteredEvents = filteredEvents.filter(event =>
        event.tooltip
          .toLowerCase()
          .includes(this.state.searchQuery.trim().toLowerCase())
      );
    }

    // Filter based on locations.
    filteredEvents = filteredEvents.filter(
      event => this.state.locationFilters[event.location]
    );

    // Filter based on type.
    filteredEvents = filteredEvents.filter(
      event => this.state.typeFilters[event.type]
    );

    this.props.onFilteredEvents(filteredEvents);
  }

  onFilterChange(newState) {
    this.setState(newState, this.filterEvents);
  }

  render() {
    if (this.props.events.length < 1 || !this.props.isFiltersShown) {
      return null;
    }
    return (
      <div className="Filters">
        <h2>Filters</h2>
        <form
          className="Filters__form"
          onSubmit={event => event.preventDefault()}
        >
          <div>
            <label>
              <strong>Search:</strong>
              <br />
              <input
                type="text"
                value={this.state.searchQuery}
                onChange={event =>
                  this.onFilterChange({
                    searchQuery: event.target.value
                  })
                }
              />
            </label>
          </div>
          <div>
            <strong>Location:</strong>
            <CheckboxFilterList
              filters={this.state.locationFilters}
              onFilterChange={newFilters =>
                this.onFilterChange({ locationFilters: newFilters })
              }
            />
          </div>
          <div>
            <strong>Type:</strong>
            <CheckboxFilterList
              filters={this.state.typeFilters}
              onFilterChange={newFilters =>
                this.onFilterChange({ typeFilters: newFilters })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Filters;

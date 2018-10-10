import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash-es";
import CheckboxFilterList from "./CheckboxFilterList";
import { filterEvents } from "./actions";

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
    return _.reduce(
      this.props.events,
      (typeFilters, event) => {
        typeFilters[event.type] = true;
        return typeFilters;
      },
      {}
    );
  }

  getLocationFilters() {
    const locationFilters = _.reduce(
      this.props.events,
      (accumulator, event) => {
        accumulator[event.location] = true;
        return accumulator;
      },
      {}
    );
    return locationFilters;
  }

  filterEvents() {
    let filteredEvents = _.reduce(
      this.props.events,
      (filteredEvents, event) => {
        // Filter based on search.
        if (this.state.searchQuery.trim()) {
          if (
            !event.tooltip
              .toLowerCase()
              .includes(this.state.searchQuery.trim().toLowerCase())
          ) {
            return filteredEvents;
          }
        }

        // Filter based on locations.
        if (!this.state.locationFilters[event.location]) {
          return filteredEvents;
        }

        // Filter based on type.
        if (!this.state.typeFilters[event.type]) {
          return filteredEvents;
        }

        filteredEvents.push(event);
        return filteredEvents;
      },
      []
    );

    this.props.filterEvents(filteredEvents);
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

const mapStateToProps = ({ events }) => ({
  events: events.events,
  filteredEvents: events.filteredEvents,
  isFiltersShown: events.isFiltersShown
});

export default connect(
  mapStateToProps,
  { filterEvents }
)(Filters);

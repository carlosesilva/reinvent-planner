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
      typeFilters: {},
      priorityFilters: this.props.priorities.reduce((accumulator, priority) => {
        return { ...accumulator, [priority]: true };
      }, {}),
      deletedFilter: { "Show Deleted": false }
    };

    this.filterEvents = this.filterEvents.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Populate filters.
    const newState = {};
    if (prevProps.locations !== this.props.locations) {
      newState.locationFilters = this.props.locations.reduce(
        (accumulator, location) => {
          return { ...accumulator, [location]: true };
        },
        {}
      );
    }
    if (prevProps.types !== this.props.types) {
      newState.typeFilters = this.props.types.reduce((accumulator, type) => {
        return { ...accumulator, [type]: true };
      }, {});
    }
    if (Object.keys(newState).length > 0) {
      this.setState(newState, this.filterEvents);
    }

    // Filter events if events or eventsUserData has changed.
    if (
      this.props.events !== prevProps.events ||
      this.props.eventsUserData !== prevProps.eventsUserData
    ) {
      this.filterEvents();
    }
  }

  filterEvents() {
    const { events, eventsUserData } = this.props;
    let filteredEvents = _.reduce(
      events,
      (filteredEvents, event) => {
        // Filters based on user added data:
        const eventUserData = eventsUserData.hasOwnProperty(event.id)
          ? eventsUserData[event.id]
          : null;
        if (eventUserData) {
          // Filter deleted.
          if (
            !this.state.deletedFilter["Show Deleted"] &&
            eventUserData.deleted === true
          ) {
            return filteredEvents;
          }
          // Filter based on priority.
          const eventPriority = eventUserData.priority
            ? eventUserData.priority
            : "Nonprioritized";
          if (!this.state.priorityFilters[eventPriority]) {
            return filteredEvents;
          }
        }

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
          <div>
            <strong>Priority:</strong>
            <CheckboxFilterList
              sort={false}
              filters={this.state.priorityFilters}
              onFilterChange={newFilters =>
                this.onFilterChange({ priorityFilters: newFilters })
              }
            />
          </div>
          <div>
            <strong>Trash:</strong>
            <CheckboxFilterList
              sort={false}
              filters={this.state.deletedFilter}
              onFilterChange={newFilters =>
                this.onFilterChange({ deletedFilter: newFilters })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ events }) => {
  return {
    events: events.events,
    eventsUserData: events.eventsUserData,
    isFiltersShown: events.isFiltersShown,
    locations: events.locations,
    types: events.types,
    priorities: events.priorities
  };
};

export default connect(
  mapStateToProps,
  { filterEvents }
)(Filters);

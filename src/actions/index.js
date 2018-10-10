import _ from "lodash-es";

// Import action types.
import {
  LOAD_APP_SUCCESS,
  LOAD_APP_FAIL,
  IMPORT_EVENTS_SUCCESS,
  IMPORT_EVENTS_FAIL,
  TOGGLE_EVENTS_LOADER,
  FILTER_EVENTS,
  TOGGLE_FILTERS,
  SET_EVENT_PRIORITY
} from "./types";

function parseEvents(rawEventsJson) {
  const rawEvents = JSON.parse(rawEventsJson);
  const events = {};
  const locations = [];
  const types = [];

  rawEvents
    // Filter out events that have no time information.
    .filter(event => ![event.start, event.end].includes(null))
    // Map events to calendar format.
    .forEach(event => {
      // Process event location.
      const location =
        event.location &&
        event.location
          .split(",")[0]
          .replace("–", "")
          .trim();
      if (!locations.includes(location)) {
        locations.push(location);
      }

      // Process event type.
      const type = event.type;
      if (!types.includes(type)) {
        types.push(type);
      }

      // Add event to events object.
      events[event.id] = {
        id: event.id,
        title: `${event.abbreviation} (${location}) [${event.type}]`,
        tooltip: `${event.abbreviation} - ${event.title} (${location}) [${
          event.type
        }]`,
        start: new Date(event.start),
        end: new Date(event.end),
        link: event.link,
        type,
        location
      };
    });
  return {
    events,
    locations,
    types
  };
}

export const loadApp = () => {
  const payload = {
    events: {},
    locations: [],
    types: []
  };
  try {
    const eventsJson = localStorage.getItem("events");
    if (eventsJson) {
      payload.events = _.mapValues(JSON.parse(eventsJson), event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));

      Object.values(payload.events).forEach(event => {
        if (!payload.locations.includes(event.location)) {
          payload.locations.push(event.location);
        }
        if (!payload.types.includes(event.type)) {
          payload.types.push(event.type);
        }
      });
    } else {
      const rawEventsJson = localStorage.getItem("rawEvents");
      if (rawEventsJson) {
        const parseEventsResults = parseEvents(rawEventsJson);
        payload.events = parseEventsResults.events;
        payload.locations = parseEventsResults.locations;
        payload.types = parseEventsResults.types;
      }
    }
    return {
      type: LOAD_APP_SUCCESS,
      payload
    };
  } catch (error) {
    return {
      type: LOAD_APP_FAIL,
      payload: error.toString()
    };
  }
};

export const importEvents = rawEventsJson => {
  try {
    const { events, locations, types } = parseEvents(rawEventsJson);
    localStorage.setItem("rawEvents", rawEventsJson);
    return {
      type: IMPORT_EVENTS_SUCCESS,
      payload: { events, locations, types }
    };
  } catch (error) {
    return {
      type: IMPORT_EVENTS_FAIL,
      payload: error.toString()
    };
  }
};

export const toggleEventsLoader = (toggle = null) => ({
  type: TOGGLE_EVENTS_LOADER,
  payload: toggle
});

export const filterEvents = filteredEvents => ({
  type: FILTER_EVENTS,
  payload: filteredEvents
});

export const toggleFilters = (toggle = null) => ({
  type: TOGGLE_FILTERS,
  payload: toggle
});

export const setEventPriority = ({ id, priority }) => ({
  type: SET_EVENT_PRIORITY,
  payload: {
    id,
    priority
  }
});

// Import action types.
import {
  LOAD_APP_SUCCESS,
  LOAD_APP_FAIL,
  IMPORT_EVENTS_SUCCESS,
  IMPORT_EVENTS_FAIL,
  TOGGLE_EVENTS_LOADER,
  FILTER_EVENTS,
  TOGGLE_FILTERS
} from "./types";

function parseEvents(eventsJson) {
  const rawEvents = JSON.parse(eventsJson);
  const events = rawEvents
    // Filter out events that have no time information.
    .filter(event => ![event.start, event.end].includes(null))
    // Map events to calendar format.
    .map(event => {
      const location =
        event.location &&
        event.location
          .split(",")[0]
          .replace("–", "")
          .trim();
      return {
        title: `${event.abbreviation} (${location}) [${event.type}]`,
        tooltip: `${event.abbreviation} - ${event.title} (${location}) [${
          event.type
        }]`,
        start: new Date(event.start),
        end: new Date(event.end),
        link: event.link,
        type: event.type,
        location
      };
    });
  return events;
}

export const loadApp = () => {
  try {
    const eventsJson = localStorage.getItem("rawEventsJson");
    const events = parseEvents(eventsJson);
    return {
      type: LOAD_APP_SUCCESS,
      payload: { events }
    };
  } catch (error) {
    return {
      type: LOAD_APP_FAIL,
      payload: error.toString()
    };
  }
};

export const importEvents = eventsJson => {
  try {
    const events = parseEvents(eventsJson);
    localStorage.setItem("rawEventsJson", eventsJson);
    return {
      type: IMPORT_EVENTS_SUCCESS,
      payload: events
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

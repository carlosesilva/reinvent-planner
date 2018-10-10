// Import action types.
import {
  LOAD_APP_SUCCESS,
  IMPORT_EVENTS_SUCCESS,
  IMPORT_EVENTS_FAIL,
  TOGGLE_EVENTS_LOADER,
  FILTER_EVENTS,
  TOGGLE_FILTERS,
  SET_EVENT_PRIORITY
} from "../actions/types";

const INITIAL_STATE = {
  events: {},
  locations: [],
  types: [],
  priorities: ["High", "Medium", "Low", "Nonprioritized"],
  filteredEvents: [],
  isEventsLoaderShown: false,
  importError: "",
  isFiltersShown: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_APP_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        locations: action.payload.locations,
        types: action.payload.types
      };
    case IMPORT_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        locations: action.payload.locations,
        types: action.payload.types,
        importError: "",
        isEventsLoaderShown: false
      };
    case IMPORT_EVENTS_FAIL:
      return {
        ...state,
        importError: action.payload
      };
    case TOGGLE_EVENTS_LOADER:
      if (action.payload === null) {
        return {
          ...state,
          isEventsLoaderShown: !state.isEventsLoaderShown
        };
      }
      return {
        ...state,
        isEventsLoaderShown: action.payload
      };
    case FILTER_EVENTS:
      return {
        ...state,
        filteredEvents: action.payload
      };
    case TOGGLE_FILTERS:
      if (action.payload === null) {
        return {
          ...state,
          isFiltersShown: !state.isFiltersShown
        };
      }
      return {
        ...state,
        isFiltersShown: action.payload
      };
    case SET_EVENT_PRIORITY:
      const { id, priority } = action.payload;
      const updatedEvent = {
        ...state.events[id],
        priority: priority
      };
      return {
        ...state,
        events: {
          ...state.events,
          [id]: updatedEvent
        }
      };
    default:
      return state;
  }
};

// Import action types.
import {
  IMPORT_EVENTS_SUCCESS,
  IMPORT_EVENTS_FAIL,
  TOGGLE_EVENTS_LOADER,
  FILTER_EVENTS,
  TOGGLE_FILTERS
} from "../actions/types";

const INITIAL_STATE = {
  events: [],
  filteredEvents: [],
  isEventsLoaderShown: false,
  importError: "",
  isFiltersShown: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMPORT_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
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
    default:
      return state;
  }
};

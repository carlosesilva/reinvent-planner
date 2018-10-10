// Import action types.
import {
  IMPORT_EVENTS_SUCCESS,
  IMPORT_EVENTS_FAIL,
  TOGGLE_EVENTS_LOADER
} from "../actions/types";

const INITIAL_STATE = {
  events: [],
  isEventsLoaderShown: false,
  importError: "",
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
    default:
      return state;
  }
};

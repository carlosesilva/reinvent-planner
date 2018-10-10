import { SET_EVENT_PRIORITY, SET_EVENT_DELETE_STATE } from "../actions/types";

export default function LocalStorageSyncer({ getState }) {
  return next => action => {
    const returnValue = next(action);

    if ([SET_EVENT_PRIORITY, SET_EVENT_DELETE_STATE].includes(action.type)) {
      const state = getState();
      localStorage.setItem(
        "eventsUserData",
        JSON.stringify(state.events.eventsUserData)
      );
    }

    return returnValue;
  };
}

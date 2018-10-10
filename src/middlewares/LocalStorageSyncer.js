import { IMPORT_EVENTS_SUCCESS, SET_EVENT_PRIORITY } from "../actions/types";

const saveEventsToLocalStorage = events => {
  try {
    const eventsJson = JSON.stringify(events);
    localStorage.setItem("events", eventsJson);
  } catch (error) {
    console.log("An error ocurred while saving app state to localStorage");
  }
};

export default function LocalStorageSyncer({ getState }) {
  return next => action => {
    const returnValue = next(action);

    if ([IMPORT_EVENTS_SUCCESS, SET_EVENT_PRIORITY].includes(action.type)) {
      console.log("LocalStorageSyncer: Saving events to local storage");
      const state = getState();
      saveEventsToLocalStorage(state.events.events);
    }

    return returnValue;
  };
}

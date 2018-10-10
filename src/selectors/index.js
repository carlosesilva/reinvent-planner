import { createSelector } from "reselect";

const getEvents = state => state.events.events;
const getEventsUserData = state => state.events.eventsUserData;

export const getMergedEvents = createSelector(
  [getEvents, getEventsUserData],
  (events, eventsUserData) => {
    const mergedEvents = {};
    Object.keys(events).forEach(id => {
      mergedEvents[id] = {
        ...events[id],
        ...(eventsUserData[id] ? eventsUserData[id] : {})
      };
    });
    return mergedEvents;
  }
);

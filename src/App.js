import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Filters from "./Filters";
import EventsLoader from "./EventsLoader";
import Calendar from "./Calendar";

import "./App.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";

const App = ({ isFiltersShown, filteredEvents }) => {
  const classNames = ["App"];
  if (isFiltersShown) {
    classNames.push("App-showFilters");
  }

  return (
    <div className={classNames.join(" ")}>
      <Header />
      <Filters />
      <Calendar events={filteredEvents} />
      <EventsLoader />
    </div>
  );
};

const mapStateToProps = ({ events }) => ({
  filteredEvents: events.filteredEvents,
  isFiltersShown: events.isFiltersShown
});

export default connect(mapStateToProps)(App);

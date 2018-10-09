import React from "react";
import CheckboxFilter from "./CheckboxFilter";
import "./CheckboxFilterList.scss";

export default ({ filters, onFilterChange }) => {
  const onChange = name => {
    const newFilters = {
      ...filters,
      [name]: !filters[name]
    };
    onFilterChange(newFilters);
  };

  const filterElements = Object.keys(filters)
    .sort()
    .map(name => (
      <li className="CheckboxFilterList__element" key={name}>
        <CheckboxFilter
          name={name}
          checked={filters[name]}
          onChange={onChange}
        />
      </li>
    ));

  return <ul className="CheckboxFilterList">{filterElements}</ul>;
};

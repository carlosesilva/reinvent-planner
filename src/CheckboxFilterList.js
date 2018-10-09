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

  const filterElements = Object.entries(filters).map(([name, checked]) => (
    <li className="CheckboxFilterList__element" key={name}>
      <CheckboxFilter name={name} checked={checked} onChange={onChange} />
    </li>
  ));

  return <ul className="CheckboxFilterList">{filterElements}</ul>;
};

import React from "react";

export default ({ name, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={() => onChange(name)}
        checked={checked}
      />
      {name}
    </label>
  );
};

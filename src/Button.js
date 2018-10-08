import React from "react";
import "./Button.scss";

export default function(props) {
  return (
    <button
      className={`Button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

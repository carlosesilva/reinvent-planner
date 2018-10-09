import React from "react";
import "./Button.scss";

export default function({ className = "", onClick, disabled, children }) {
  return (
    <button
      className={`Button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

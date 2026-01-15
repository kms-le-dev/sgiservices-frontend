import React from "react";
import "./ServiceButton.css";

export default function ServiceButton({ title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`service-button ${active ? "service-button--active" : ""}`}
    >
      {title}
    </button>
  );
}
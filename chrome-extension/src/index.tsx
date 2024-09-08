import React from "react";
import ReactDOM from "react-dom/client";
import FounderModeRectangle from "./FounderModeRectangle";
import FounderModeDrive from "./FounderModeDrive";

// Create a new div to inject the React app dynamically into the page
const rootDiv = document.createElement("div");
rootDiv.className = "container"; // This is for your Chrome extension
document.body.appendChild(rootDiv);

// Create root using React 18's createRoot method
const root = ReactDOM.createRoot(rootDiv);

// Render the React app inside this dynamically created div
root.render(
  <React.StrictMode>
    <FounderModeDrive />
  </React.StrictMode>
);

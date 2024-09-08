import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import React from "react";
import { createRoot } from "react-dom/client";
import FounderModeRectangle from "./FounderModeRectangle";

const FounderModeButton: React.FC = () => {
  const handleClick = () => {
    console.log("Founder Mode button clicked!");

    // Extract email data from the DOM
    const from = document.querySelector(".gD")?.textContent || "Unknown Sender";
    const subject = document.querySelector(".hP")?.textContent || "No Subject";
    const content =
      document.querySelector(".a3s.aiL")?.textContent || "No Content";

    // Log the extracted values for testing
    console.log(`From: ${from}, Subject: ${subject}, Content: ${content}`);

    const replySuggestions = document.querySelector(".brb");
    if (replySuggestions) {
      const existingRect = document.getElementById("founder-mode-rectangle");
      if (existingRect) {
        existingRect.remove();
      }

      // Create a new container to render the React component
      const container = document.createElement("div");
      container.id = "founder-mode-container";

      replySuggestions.appendChild(container);

      // Render the independent FounderModeRectangle component with props
      const root = createRoot(container);
      root.render(
        <FounderModeRectangle from={from} subject={subject} content={content} />
      );
    }
  };

  return (
    <Fab
      color="primary"
      aria-label="founder-mode"
      onClick={handleClick}
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <MenuIcon />
    </Fab>
  );
};

export default FounderModeButton;

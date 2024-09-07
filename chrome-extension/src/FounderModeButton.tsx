import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import React from "react";
import { createRoot } from "react-dom/client";
import FounderModeRectangle from "./FounderModeRectangle";

const FounderModeButton: React.FC = () => {
  const handleClick = () => {
    console.log("Founder Mode button clicked!");

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

      // Render the independent FounderModeRectangle component
      const root = createRoot(container);
      root.render(<FounderModeRectangle />);
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

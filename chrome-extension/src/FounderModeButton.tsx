import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import React from "react";

const FounderModeButton: React.FC = () => {
  const handleClick = () => {
    console.log("Founder Mode button clicked!");

    // Attempt to find the auto-reply suggestions element
    const replySuggestions = document.querySelector(".brb");
    if (replySuggestions) {
      console.log("Found auto-reply suggestions:", replySuggestions);

      // Remove any existing injected element to avoid duplicates
      const existingRect = document.getElementById("founder-mode-rectangle");
      if (existingRect) {
        existingRect.remove();
        console.log("Removed existing Founder Mode rectangle.");
      }

      // Create a new purple rectangle
      const rectangle = document.createElement("div");
      rectangle.id = "founder-mode-rectangle";
      rectangle.style.width = "100%";
      rectangle.style.height = "100px";
      rectangle.style.backgroundColor = "purple";
      rectangle.style.color = "white";
      rectangle.style.display = "flex";
      rectangle.style.alignItems = "center";
      rectangle.style.justifyContent = "center";
      rectangle.style.marginTop = "20px";

      const header = document.createElement("h3");
      header.innerText = "Founder Mode";

      rectangle.appendChild(header);
      replySuggestions?.appendChild(rectangle); // Append the rectangle after auto-reply suggestions

      console.log("Injected Founder Mode rectangle.");
    } else {
      console.log("Auto-reply suggestions not found.");
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

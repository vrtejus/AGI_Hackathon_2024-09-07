import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import React from "react";
import { createRoot } from "react-dom/client";
import FounderModeDrive from "./FounderModeDrive";
import FounderModeRectangle from "./FounderModeRectangle";
import FounderModeQuestion from "./FounderModeQuestion";

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

    const targetDiv = document.querySelector(".style-scope yt-chip-cloud-renderer");
    if (targetDiv) {
      const existingDrive = document.getElementById("founder-mode-drive");
      if (!existingDrive) {
        const driveContainer = document.createElement("div");
        driveContainer.id = "founder-mode-drive-container";
        targetDiv.parentElement?.appendChild(driveContainer);

        const driveRoot = createRoot(driveContainer);
        driveRoot.render(<FounderModeQuestion />);
      }
    }

    const questionDiv = document.querySelector(".description-inline-expander");
  if (questionDiv) {
    const existingQuestion = document.getElementById("founder-mode-question-container");
    if (existingQuestion) {
      existingQuestion.remove();
    }

    // Create a new container to render the React component
    const questionContainer = document.createElement("div");
    questionContainer.id = "founder-mode-question-container";

    questionDiv.parentElement?.appendChild(questionContainer);

    // Render the independent FounderModeQuestion component
    const questionRoot = createRoot(questionContainer);
    questionRoot.render(<FounderModeQuestion />);
  }

  };

  return (
    <Fab
      color="primary"
      aria-label="founder-mode"
      onClick={handleClick}
      sx={{ position: "fixed", bottom: 10, right: 10
       }}
    >
      <MenuIcon />
    </Fab>
  );
};

export default FounderModeButton;

import React, { useState } from "react";

const FounderModeRectangle: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleOllamaRequest = async () => {
    try {
      // Make a POST request to the local Ollama Gemma model API
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma", // Using the Gemma model
          prompt: "Tell me about founder mode in startups.",
        }),
      });

      const data = await response.json();
      const resultText = data.text;

      // Update the result in the state
      setResult(resultText);
    } catch (error) {
      console.error("Error making request to Ollama:", error);
      setResult("Failed to get a response from Gemma.");
    }
  };

  return (
    <div
      id="founder-mode-rectangle"
      style={{
        width: "100%",
        height: "200px",
        backgroundColor: "purple",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <h3>Founder Mode</h3>
      <button onClick={handleOllamaRequest} style={{ marginTop: "10px" }}>
        Ask Gemma
      </button>
      <div id="ollama-result" style={{ marginTop: "10px" }}>
        {result ? result : "Click the button to get a response from Gemma."}
      </div>
    </div>
  );
};

export default FounderModeRectangle;

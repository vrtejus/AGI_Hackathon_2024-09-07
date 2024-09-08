import React, { useState } from "react";
import { BACKEND_URL } from "./constants";
import { transcript } from "./transcript";

const FounderModeQuestion: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAskClick = async () => {
    setIsLoading(true);
    setError(null);
    setAnswer(""); // Clear previous answer

    try {
      // Combine the filtered transcript into one text block (this should be from your actual data source)
      const transcriptText = transcript.map((message) => message.dialogue).join(" "); // Replace with actual transcript data
      
      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma",
          prompt: `Answer ${question} based on this transcript: ${transcriptText}`,
          stream: true, // Enable streaming
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let resultText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader?.read()!;
          if (done) break;
          const decodedText = decoder.decode(value, { stream: true });
          const words =
            decodedText
              .match(/"response":"(.*?)"/g)
              ?.map((match) => match.replace(/"response":"(.*?)"/, "$1"))
              .join(" ") || "";
          resultText += words;
          setAnswer(resultText);
        }
      }
    } catch (error) {
      setError("Error generating response.");
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      width: "80%",
      maxWidth: "600px",
      backgroundColor: "#1e1e1e",
      color: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      margin: "20px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Roboto', sans-serif",
    }}>
      <h3 style={{
        marginBottom: "10px",
        marginTop: "10px",
        fontSize: "1.5em",
        color: "#ff4081",
      }}>Ask a Question</h3>
      
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the transcript..."
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          fontSize: "1em",
          minHeight: "100px",
        }}
      />

      <button
        onClick={handleAskClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1em",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Ask"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      )}

      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h4>Response:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FounderModeQuestion;

import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "./constants";

type FounderModeRectangleProps = {
  from?: string;
  subject?: string;
  content?: string;
};

const FounderModeRectangle: React.FC<FounderModeRectangleProps> = ({
  from = "Tejas Chidambaram",
  subject = "We should talk",
  content = `Dear Vishnu,

I trust this message finds you in good health and high spirits. Earlier today, I had the distinct pleasure of engaging in a comprehensive dialogue with the chief revenue officer of BetaStax, during which we meticulously examined their various pain points. It became abundantly clear that there exists a significant degree of synergy between our respective entities. The conversation was both enlightening and productive, shedding light on numerous areas where our goals and objectives align harmoniously.

Given the importance of this matter and the potential benefits that could arise from a deeper exploration of the topics discussed, I am reaching out to inquire about your availability. Specifically, I am interested in scheduling a thirty-minute meeting tomorrow afternoon. This meeting would provide us with an invaluable opportunity to further deliberate on the insights gained and to explore potential collaborative efforts in greater detail.

I believe that such a discussion would be mutually beneficial, allowing us to build on the foundation established during today's meeting. Your input and perspective would be greatly appreciated, and I am confident that our combined efforts could lead to significant advancements.

With the highest regards, and looking forward to your positive response, –– Tejas
`,
}) => {
  const [result, setResult] = useState<string | null>(null);
  const [tasks, setTasks] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");

  useEffect(() => {
    const handleOllamaRequest = async () => {
      try {
        const prompt = `From: ${from}\nSubject: ${subject}\nContent: ${content}\n`;

        const response = await fetch(`${BACKEND_URL}/api/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gemma",
            prompt: `${prompt}
            
            This is the email. If the email mentions random meetings that is manager mode. Tell me if this reflects Founder Mode or Manager Mode. ONLY RETURN 2 WORDS AS YOUR ANSWER.`,
          }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let resultText = "";

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
          setResult(resultText);
        }
      } catch (error) {
        console.error("Error making request to Ollama:", error);
        setResult("Failed to get a response from Gemma.");
      }
    };

    handleOllamaRequest();
  }, [content, from, subject]);

  const handleReturnToFounderMode = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma",
          prompt: `Provide up to 3 tasks to return to Founder Mode based on the following email content: ${content}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newTasks = data.response;
      setTasks(newTasks);
    } catch (error) {
      console.error("Error generating tasks:", error);
    }
  };

  const handleExecuteAction = async () => {
    try {
      // Step 1: Generate the response text
      const response = await fetch(`${BACKEND_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma",
          prompt: `Generate a response based on the following email content:
          From: ${from}
          Subject: ${subject}
          Content: ${content}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedResponse = data.response;
      setResponseText(generatedResponse); // Update state with the generated response

      // Step 2: Click the reply button in Gmail to open the reply box
      const replyButton = document.querySelector('div[aria-label="Reply"]');
      if (replyButton) {
        (replyButton as HTMLElement).click(); // Simulate a click on the reply button
      } else {
        console.error("Reply button not found!");
        return;
      }

      // Step 3: Populate the reply box with the generated response text
      setTimeout(() => {
        const replyBox = document.querySelector(
          'div[aria-label="Message Body"]'
        );
        if (replyBox) {
          (replyBox as HTMLElement).innerText = generatedResponse; // Insert the response text into the reply box
        } else {
          console.error("Reply box not found!");
        }
      }, 1000); // Delay to ensure the reply box is rendered
    } catch (error) {
      console.error("Error executing action:", error);
    }
  };

  return (
    <div
      id="founder-mode-rectangle"
      style={{
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
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          fontSize: "1.5em",
          color: "#ff4081",
        }}
      >
        Founder Mode
      </h3>
      <div
        id="ollama-result"
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#2e2e2e",
          borderRadius: "5px",
          width: "100%",
          textAlign: "left",
        }}
      >
        {result ? (
          <>
            {result.trim() && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked
                  readOnly
                  style={{ marginRight: "10px" }}
                />
                <span>
                  {result.split("\\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
            )}
            {result.includes("Manager Mode") && (
              <>
                <button
                  onClick={handleReturnToFounderMode}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1em",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e91e63")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff4081")
                  }
                >
                  Return to Founder Mode
                </button>
                {tasks.split("\n").map(
                  (task, index) =>
                    task.trim() && (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{ marginRight: "10px" }}
                        />
                        <span>{task}</span>
                      </div>
                    )
                )}
              </>
            )}
          </>
        ) : (
          "Waiting for Gemma's response..."
        )}
      </div>

      <button
        onClick={handleExecuteAction}
        style={{
          marginTop: "20px",
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
      >
        Execute Action
      </button>
    </div>
  );
};

export default FounderModeRectangle;

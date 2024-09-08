import React, { useState } from "react";
import { transcript } from "./transcript"; // Assuming transcript is an array of objects

interface TranscriptEntry {
  speaker: string;
  time: string;
  dialogue: string;
}

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;

  // Escape special characters in the query for regex
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return text.replace(regex, (match) => `<mark style="background-color: #ff0; color: #000;">${match}</mark>`);
};

const TranscriptDisplay: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTranscript, setFilteredTranscript] = useState<TranscriptEntry[]>(transcript);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the transcript based on the search query
    const filtered = transcript.filter(entry =>
      entry.speaker.toLowerCase().includes(query) ||
      entry.dialogue.toLowerCase().includes(query)
    );

    setFilteredTranscript(filtered);
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
      right: 0,
      top: 0,
      zIndex: 1000,
    }}>
      <h3 style={{
        marginBottom: "10px",
        marginTop: "10px",
        fontSize: "1.5em",
        color: "#ff4081",
      }}>Transcript</h3>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          fontSize: "1em",
        }}
      />

      <div>
        {filteredTranscript.length > 0 ? (
          filteredTranscript.map((entry, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: "bold" }}>{entry.speaker} ({entry.time}):</p>
              <p dangerouslySetInnerHTML={{ __html: highlightText(entry.dialogue, searchQuery) }} />
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default TranscriptDisplay;

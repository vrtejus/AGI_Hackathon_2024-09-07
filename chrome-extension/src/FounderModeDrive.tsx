import React from "react";

const FounderModeDrive: React.FC = () => {
  return (
    <div
      id="founder-mode-drive"
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
        height: "100vh",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 1000,
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
        Founder Mode Drive
      </h3>
      <p>Here you can add files, tasks, or any data you want to store.</p>
      <ul>
        <li>Task 1: Review Email</li>
        <li>Task 2: Draft Response</li>
        <li>Task 3: Schedule Meeting</li>
      </ul>
      <button
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
        Add New Task
      </button>
    </div>
  );
};

export default FounderModeDrive;

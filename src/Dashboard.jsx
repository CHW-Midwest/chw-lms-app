import React from "react";

export default function Dashboard({ modules, onStartSimulation }) {
  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "24px",
        backgroundColor: "#f9fafb",
        minHeight: "100vh"
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "6px" }}>
          CHW Learning Management System
        </h1>
        <p style={{ color: "#555" }}>
          Community Health Worker Training Modules — Interactive Simulation-Based Learning
        </p>
      </header>

      {/* MODULE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px"
        }}
      >
        {modules.map((mod, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}
          >
            {/* TITLE */}
            <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
              {mod.title}
            </h2>

            {/* DESCRIPTION */}
            <p style={{ fontSize: "14px", color: "#666", minHeight: "60px" }}>
              {mod.description}
            </p>

            {/* METRICS */}
            <div style={{ fontSize: "13px", margin: "10px 0", color: "#333" }}>
              {mod.cases && (
                <div>📘 Cases: {mod.cases.length}</div>
              )}
              {mod.nodes && (
                <div>🧠 Nodes: {Object.keys(mod.nodes).length}</div>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => onStartSimulation(mod)}
              style={{
                marginTop: "10px",
                padding: "10px 12px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Start Module
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{ marginTop: "40px", fontSize: "12px", color: "#888" }}>
        CHW LMS • Simulation-Based Training Engine • v1.0
      </footer>
    </div>
  );
}
import { useState } from "react";
import modules from "./modules";
import { useSimulationEngine } from "./simulationEngine";

/* =========================
   DASHBOARD
   ========================= */
function Dashboard({ modules, onStart }) {
  return (
    <div style={{ padding: 24, fontFamily: "Arial", background: "#f9fafb" }}>
      <h1>CHW Learning Management System</h1>
      <p style={{ color: "#666" }}>
        Interactive Community Health Worker Training Platform
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 20
        }}
      >
        {modules.map((mod, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16
            }}
          >
            <h3>{mod.title}</h3>
            <p style={{ fontSize: 14, color: "#666" }}>
              {mod.description}
            </p>

            <button
              onClick={() => onStart(mod)}
              style={{
                marginTop: 10,
                padding: "10px 12px",
                width: "100%",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Start Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   MAP GAME (MODULE 7)
   ========================= */
function MapGame({ module, onExit }) {
  const { node, choose, state, reset } = useSimulationEngine(module);

  const nodes = Object.values(module.nodes);

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      {/* HEADER */}
      <h2>{module.title}</h2>
      <p style={{ color: "#666" }}>{module.description}</p>

      {/* MAP BOARD */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          background: "#eef2f7",
          borderRadius: 12,
          marginTop: 20,
          marginBottom: 20,
          overflow: "hidden"
        }}
      >
        {nodes.map((n) => {
          const isActive = n.id === node.id;

          return (
            <div
              key={n.id}
              onClick={() => choose({ next: n.id, impact: {} })}
              style={{
                position: "absolute",
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
                padding: "10px 14px",
                borderRadius: 20,
                cursor: "pointer",
                background: isActive ? "#2563eb" : "#ffffff",
                color: isActive ? "white" : "black",
                border: "1px solid #cbd5e1",
                boxShadow: isActive
                  ? "0 0 14px rgba(37,99,235,0.6)"
                  : "0 1px 2px rgba(0,0,0,0.05)"
              }}
            >
              📍 {n.name}
            </div>
          );
        })}
      </div>

      {/* NODE INFO PANEL */}
      <div
        style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff"
        }}
      >
        <h3>{node.name}</h3>
        <p>{node.text}</p>

        {/* ACTIONS */}
        <div style={{ marginTop: 16 }}>
          {node.choices.length === 0 && (
            <div>
              <h4>🏁 Simulation Complete</h4>

              <button
                onClick={reset}
                style={{ marginRight: 10, padding: 10 }}
              >
                Restart
              </button>

              <button onClick={onExit} style={{ padding: 10 }}>
                Back to Dashboard
              </button>
            </div>
          )}

          {node.choices.map((c, i) => (
            <button
              key={i}
              onClick={() => choose(c)}
              style={{
                display: "block",
                width: "100%",
                marginTop: 10,
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              ➤ {c.text}
            </button>
          ))}
        </div>
      </div>

      {/* SYSTEM STATE */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          background: "#111827",
          color: "white",
          borderRadius: 12
        }}
      >
        <h4>🌐 Community System State</h4>
        <div>💊 Overdose Level: {state.overdose}</div>
        <div>🍎 Food Access: {state.foodAccess}</div>
        <div>🤝 Community Trust: {state.trust}</div>
      </div>

      {/* EXIT */}
      <button
        onClick={onExit}
        style={{
          marginTop: 20,
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#ef4444",
          color: "white",
          cursor: "pointer"
        }}
      >
        Exit Map
      </button>
    </div>
  );
}

/* =========================
   MAIN APP
   ========================= */
export default function App() {
  const [activeModule, setActiveModule] = useState(null);

  const isMapModule = activeModule?.nodes;

  return (
    <div>
      {!activeModule && (
        <Dashboard modules={modules} onStart={setActiveModule} />
      )}

      {activeModule && isMapModule && (
        <MapGame
          module={activeModule}
          onExit={() => setActiveModule(null)}
        />
      )}

      {activeModule && !isMapModule && (
        <div style={{ padding: 24 }}>
          <h2>{activeModule.title}</h2>
          <p>This module is not simulation-enabled yet.</p>

          <button onClick={() => setActiveModule(null)}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
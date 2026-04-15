import { useState, useEffect, useMemo } from "react";

import MissouriMap from "./MissouriMap";
import RoleSelect from "./RoleSelect";
import Dashboard from "./Dashboard";

import {
  initialState,
  applyIntervention,
  stepSimulation,
  forecast
} from "./simulationEngine";

export default function App() {
  const [state, setState] = useState(initialState);
  const [role, setRole] = useState("navigator");
  const [selectedRegion, setSelectedRegion] = useState("stl-metro");

  // 🧪 sanity check
  useEffect(() => {
    const test = structuredClone(initialState);
    stepSimulation(test);
    console.log("🧪 Simulation test:", test);
  }, []);

  // ⚡ REAL-TIME SIMULATION LOOP (CDC LIVE MODE)
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const newState = structuredClone(prev);
        stepSimulation(newState);
        return newState;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ⏩ manual step
  const runStep = () => {
    const newState = structuredClone(state);
    stepSimulation(newState);
    setState(newState);
  };

  // 🧩 intervention system
  const intervene = (action) => {
    const newState = structuredClone(state);
    applyIntervention(newState, selectedRegion, action, role);
    setState(newState);
  };

  // 📈 FORECAST (10-step projection)
  const projection = useMemo(() => {
    return forecast(state, 10);
  }, [state]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h1 style={{ padding: 12 }}>
        🧬 Epidemiological Simulation Dashboard
      </h1>

      {/* 👥 ROLE SYSTEM */}
      <RoleSelect role={role} setRole={setRole} />

      {/* 🗺️ MAP */}
      <MissouriMap
        state={state}
        onSelectRegion={setSelectedRegion}
      />

      {/* 🎮 CONTROLS */}
      <div style={{ padding: 12, display: "flex", gap: 10 }}>
        <button onClick={() => intervene("education")}>
          Education
        </button>
        <button onClick={() => intervene("treatment")}>
          Treatment
        </button>
        <button onClick={() => intervene("prevention")}>
          Prevention
        </button>
        <button onClick={runStep}>
          Manual Step ⏩
        </button>
      </div>

      {/* 🏛 POLICY PANEL */}
      <div style={{ padding: 12, border: "1px solid #ddd" }}>
        <h3>🏛 Policy Controls (read-only visualized in engine)</h3>
        <pre>{JSON.stringify(state.policy, null, 2)}</pre>
      </div>

      {/* 📊 CDC DASHBOARD */}
      <Dashboard state={state} />

      {/* 📈 FORECAST PANEL */}
      <div style={{ margin: 12, padding: 12, border: "1px solid #ccc" }}>
        <h3>📈 10-Step Forecast (System Risk Projection)</h3>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
          {projection.map((p, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: p.risk * 100,
                background:
                  p.risk > 0.7
                    ? "red"
                    : p.risk > 0.4
                    ? "orange"
                    : "green"
              }}
              title={`Step ${p.step}: ${p.risk.toFixed(2)}`}
            />
          ))}
        </div>
      </div>

      {/* 📍 DEBUG PANEL */}
      <div style={{ padding: 12 }}>
        <div><b>Region:</b> {selectedRegion}</div>
        <div><b>Role:</b> {role}</div>
        <div><b>Time:</b> {state.time}</div>

        <pre style={{ background: "#f4f4f4", padding: 10 }}>
          {JSON.stringify(state.regions, null, 2)}
        </pre>
      </div>
    </div>
  );
}
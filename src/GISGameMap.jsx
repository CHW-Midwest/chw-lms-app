import React, { useState, useMemo, useRef } from "react";

const REGIONS = [
  { id: "kc", label: "Kansas City", base: 0.7 },
  { id: "north", label: "North MO", base: 0.55 },
  { id: "stl", label: "St. Louis", base: 0.85 },
  { id: "ozarks", label: "Ozarks", base: 0.5 },
  { id: "central", label: "Central MO", base: 0.65 },
  { id: "semo", label: "Southeast MO", base: 0.75 }
];

const CRISES = [
  { type: "opioid", label: "Overdose Surge" },
  { type: "food", label: "Food Insecurity Spike" },
  { type: "mental", label: "Behavioral Health Crisis" }
];

const RESPONSE_MESSAGES = [
  "Mobile Units and Paramedics deployed for Emergency Care",
  "Increase Accessibility to Fresh Foods, Community Gardens, and Nutrition Education",
  "Resources Mobilized for Behavioral Health and Addiction Support ",
  "Field teams of Mental Health Professionals activated",
  "System coordination for Addiction and Food Desert Research and Assessment"
];

function clamp(n) {
  return Math.max(0.2, Math.min(1, n));
}

function color(v) {
  if (v > 0.8) return "#b91c1c";
  if (v > 0.65) return "#ea580c";
  if (v > 0.5) return "#eab308";
  return "#16a34a";
}

// Randomized operational system cost
function getOperationalCharge() {
  return -(1 + Math.floor(Math.random() * 5));
}

export default function GISGameMap({ onBack }) {
  const [risk, setRisk] = useState({
    kc: 0.7,
    north: 0.55,
    stl: 0.85,
    ozarks: 0.5,
    central: 0.65,
    semo: 0.75
  });

  const [log, setLog] = useState([]);
  const [round, setRound] = useState(1);
  const [selected, setSelected] = useState(null);
  const [panel, setPanel] = useState("instructions");
  const [score, setScore] = useState(100);

  const [showOpNote, setShowOpNote] = useState(false);
  const hasShownOpNote = useRef(false);

  const activeIncidents = useMemo(() => {
    return [
      {
        ...CRISES[Math.floor(Math.random() * CRISES.length)],
        region: REGIONS[Math.floor(Math.random() * REGIONS.length)].id
      },
      {
        ...CRISES[Math.floor(Math.random() * CRISES.length)],
        region: REGIONS[Math.floor(Math.random() * REGIONS.length)].id
      }
    ];
  }, [round]);

  const applyResponse = (region) => {
    const updated = { ...risk };
    const incidentRegions = activeIncidents.map((i) => i.region);

    const operationalCharge = getOperationalCharge();
    let scoreChange = operationalCharge;
    const breakdown = [`Operational Charge ${operationalCharge}`];

    const isIncident = incidentRegions.includes(region);
    const isHighRisk = risk[region] >= 0.75;
    const isRed = risk[region] > 0.8;

    let explanation = "";

 if (isIncident && isHighRisk) {
  updated[region] = clamp(updated[region] - 0.4);
  scoreChange = 15;
  breakdown.push("Incident +15");
  explanation =
    "Critical intervention: Response aligned with active incident in a high-risk region. Maximum system impact achieved.";
} else if (isIncident) {
  updated[region] = clamp(updated[region] - 0.3);
  scoreChange = 10;
  breakdown.push("Incident +10");
  explanation =
    "Targeted response aligned with active incident. Intervention effectiveness increased.";
} else if (isRed) {
  updated[region] = clamp(updated[region] - 0.15);
  scoreChange = 5;
  breakdown.push("Red Zone +5");
  explanation =
    "Response deployed outside active incident zone. Resource misallocation increased system strain.";
} else {
  updated[region] = clamp(updated[region] - 0.15);
  scoreChange = -5;
  breakdown.push("Misallocation -5");
  explanation =
    "Response deployed outside active incident zone. Resource misallocation increased system strain.";
}


    Object.keys(updated).forEach((r) => {
      if (r !== region) updated[r] = clamp(updated[r] + 0.04);
    });

    setRisk(updated);

    const message =
      RESPONSE_MESSAGES[Math.floor(Math.random() * RESPONSE_MESSAGES.length)];

    setScore((s) => Math.max(0, s + scoreChange));

    setLog((l) => [
      `ROUND ${round}: ${message} to ${region.toUpperCase()} | Score ${
        scoreChange >= 0 ? "+" : ""
      }${scoreChange} [${breakdown.join(" | ")}] → ${explanation}`,
      ...l
    ]);

    // ONE-TIME trigger after first deployment
    if (!hasShownOpNote.current) {
      setShowOpNote(true);
      hasShownOpNote.current = true;
    }

    setRound((r) => r + 1);
    setSelected(null);
  };

  return (
    <div
      style={{
        padding: 20,
        color: "white",
        background: "#0b1220",
        minHeight: "100vh",
        fontFamily: "system-ui"
      }}
    >
      <button onClick={onBack} style={{ marginBottom: 10 }}>
        ⬅ Exit EOC
      </button>

      <div
        style={{
          borderBottom: "1px solid #334155",
          paddingBottom: 10,
          marginBottom: 15
        }}
      >
        <h2 style={{ fontSize: 26, margin: 0 }}>
          🏛 Crisis Operations Center — Missouri Unit
        </h2>
        <p style={{ color: "#f6f8fc", marginTop: 5 }}>
          Toggle between Instructions and Learning Objectives
        </p>
      </div>

      <div
        style={{
          marginBottom: 15,
          padding: 10,
          background: "#111827",
          border: "1px solid #334155",
          borderRadius: 8,
          textAlign: "center",
          fontWeight: "bold"
        }}
      >
        Performance Score: {score}
      </div>

      {/* UPDATED CENTER MODAL */}
      {showOpNote && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}
        >
          <div
            style={{
              width: "420px",
              padding: 20,
              background: "linear-gradient(135deg, #0f172a, #111827)",
              border: "2px solid #38bdf8",
              borderRadius: 12,
              boxShadow: "0 0 30px rgba(56, 189, 248, 0.35)",
              textAlign: "center",
              position: "relative",
              color: "#e2e8f0"
            }}
          >
            <button
              onClick={() => setShowOpNote(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                fontSize: 18,
                cursor: "pointer"
              }}
            >
              ✕
            </button>

            <div
              style={{
                fontWeight: "bold",
                color: "#38bdf8",
                marginBottom: 10,
                fontSize: 16
              }}
            >
              Operational Charge
            </div>

            Each deployment includes a randomized system cost representing
            staffing load, coordination overhead, and emergency response strain.
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button
          onClick={() => setPanel("instructions")}
          style={{
            padding: "8px 12px",
            background: panel === "instructions" ? "#1d4ed8" : "#111827",
            color: "white",
            border: "1px solid #334155",
            borderRadius: 6
          }}
        >
          📘 Instructions
        </button>

        <button
          onClick={() => setPanel("objectives")}
          style={{
            padding: "8px 12px",
            background: panel === "objectives" ? "#1d4ed8" : "#111827",
            color: "white",
            border: "1px solid #334155",
            borderRadius: 6
          }}
        >
          📚 Learning Objectives
        </button>
      </div>

      {panel === "instructions" ? (
        <div
          style={{
            background: "#111827",
            border: "1px solid #334155",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <h3>📘 Operational Instructions</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "#f3f4f6" }}>
            <li>
              Welcome to the Crisis Operations Center - Missouri Unit! Every round there are Active Incidents that mimic the public health crises that are very real for Missouri. It us up to you, our talented CHW, to maintain low risk for all regions. 
            </li>
            <li>
              1. Scoring reflects how effectively resources are deployed:
              Responding to active incidents increases score and higher gains
              when prioritizing high-risk regions. Deploying resources outside
              incident areas reduces score, and all actions contribute to
              ongoing system strain.
            </li>
            <li>
              2. Each region color reflects risk level: Red - Extreme Risk,
              Orange - High Risk, Yellow - Medium Risk, Green - Low Risk.
            </li>
            <li>
              3. The Response Log shows the deployed resources and support for
              each crises or region.
            </li>
          </ul>
        </div>
      ) : (
        <div
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            padding: 12,
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <h3>📚 Learning Objectives</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: "#cbd5e1" }}>
            <li>
              1. Understand CHW core competencies including coordination and
              advocacy.
            </li>
            <li>2. Recognize system-wide interdependence across regions.</li>
            <li>3. Analyze unintended consequences of interventions.</li>
            <li>
              4. Understand how Social Determinants of Health are
              interconnected between regions.
            </li>
          </ul>
        </div>
      )}

      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15
        }}
      >
        <h3>🚨 Active Incidents (Round {round})</h3>
        {activeIncidents.map((c, i) => (
          <div key={i} style={{ color: "#fbbf24" }}>
            • {c.label} in {c.region.toUpperCase()}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          maxWidth: 900,
          margin: "0 auto"
        }}
      >
        {REGIONS.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelected(r.id)}
            style={{
              background: color(risk[r.id]),
              padding: 18,
              borderRadius: 10,
              cursor: "pointer",
              textAlign: "center"
            }}
          >
            <div style={{ fontWeight: "bold" }}>{r.label}</div>
            <div style={{ fontSize: 12 }}>
              Risk: {risk[r.id].toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: 15, textAlign: "center" }}>
          <button
            onClick={() => applyResponse(selected)}
            style={{
              padding: "10px 16px",
              background: "#22c55e",
              color: "black",
              borderRadius: 6,
              fontWeight: "bold"
            }}
          >
            🚑 Deploy Response
          </button>
        </div>
      )}

      <div style={{ marginTop: 20, color: "#94a3b8" }}>Response Log</div>

      <div style={{ maxHeight: 200, overflowY: "auto", marginTop: 10 }}>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 13, color: "#cbd5e1" }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";

export default function GISGameMap({ onBack }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);

  const scenarios = [
    {
      title: "Opioid Surge Alert - Rural County",
      situation:
        "Emergency services report a spike in overdoses. EMS response times are increasing due to distance and staffing shortages.",
      choices: [
        {
          text: "Deploy mobile treatment + outreach vans",
          impact: 2,
          note: "Directly improves access in rural areas"
        },
        {
          text: "Build new urban hospital wing",
          impact: 0,
          note: "Not geographically aligned with need"
        },
        {
          text: "Wait for more data before acting",
          impact: 0,
          note: "Delays intervention during crisis"
        }
      ]
    },
    {
      title: "Food Access Crisis - Urban Neighborhood",
      situation:
        "This area has high diabetes rates and limited grocery access within walking distance.",
      choices: [
        {
          text: "Establish mobile fresh food distribution routes",
          impact: 2,
          note: "Improves immediate food access"
        },
        {
          text: "Increase fast food availability",
          impact: -1,
          note: "Worsens health outcomes"
        },
        {
          text: "Focus only on hospital treatment",
          impact: 0,
          note: "Does not address root cause"
        }
      ]
    },
    {
      title: "Mental Health Capacity Strain",
      situation:
        "Crisis hotline calls are increasing, but provider availability is low across multiple counties.",
      choices: [
        {
          text: "Expand telehealth mental health services",
          impact: 2,
          note: "Scales access across geography"
        },
        {
          text: "Increase ER-only response",
          impact: 0,
          note: "Does not provide sustained care"
        },
        {
          text: "Reduce funding to reallocate elsewhere",
          impact: -1,
          note: "Worsens system capacity"
        }
      ]
    }
  ];

  const current = scenarios[step];

  const handleChoice = (choice) => {
    setScore((s) => s + choice.impact);
    setLog((l) => [...l, choice.note]);

    if (step + 1 < scenarios.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="card" style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Public Health GIS Simulation</h2>

      {!done ? (
        <>
          <h3>{current.title}</h3>

          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
            {current.situation}
          </p>

          {current.choices.map((c, i) => (
            <button
              key={i}
              style={{
                background: "#4c1d95",
                color: "#fff",
                padding: "10px",
                margin: "8px auto",
                display: "block",
                width: "85%",
                border: "1px solid #6d28d9",
                cursor: "pointer"
              }}
              onClick={() => handleChoice(c)}
            >
              {c.text}
            </button>
          ))}

          <p style={{ marginTop: "10px" }}>
            Scenario {step + 1} / {scenarios.length}
          </p>
        </>
      ) : (
        <>
          <h3>Simulation Complete</h3>

          <p>
            Final Effectiveness Score: <strong>{score}</strong>
          </p>

          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <h4>Decision Log:</h4>
            {log.map((l, i) => (
              <p key={i}>• {l}</p>
            ))}
          </div>

          <p style={{ marginTop: "15px" }}>
            {score >= 5
              ? "Strong spatial public health reasoning."
              : "Review geographic intervention strategies."}
          </p>
        </>
      )}

      <button
        style={{
          marginTop: "20px",
          padding: "10px 14px",
          background: "#111827",
          color: "#fff",
          border: "2px solid #6b7280",
          cursor: "pointer"
        }}
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}
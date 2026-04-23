import React from "react";

export default function Certificate({ score, onExit }) {
  const passed = score >= 30;

  return (
    <div className="certificate">

      <h1>CE CERTIFICATE OF COMPLETION</h1>

      <p>Missouri Public Health Simulation Training</p>

      <h2>{passed ? "PASSED" : "NOT PASSED"}</h2>

      <p>Final Score: {score} / 40</p>

      <h3>Core Competencies Assessed:</h3>

      <ul>
        <li>Substance Use Disorder Response</li>
        <li>Harm Reduction Strategies</li>
        <li>Food Desert Intervention Design</li>
        <li>Structural Determinants of Health</li>
        <li>Resource Allocation Under Constraint</li>
      </ul>

      <button onClick={onExit}>
        Return to Simulation
      </button>

    </div>
  );
}
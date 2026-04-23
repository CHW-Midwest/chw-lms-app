import React, { useState } from "react";
import { modules } from "./modules";

export default function ModuleEngine({ onExit, onComplete }) {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [score, setScore] = useState(0);

  const module = modules[moduleIndex];
  const caseItem = module.cases[caseIndex];

  const progress =
    ((caseIndex + moduleIndex * 20) / 40) * 100;

  function answer(choice) {
    if (choice === caseItem.answer) {
      setScore(score + 1);
    }

    if (caseIndex < module.cases.length - 1) {
      setCaseIndex(caseIndex + 1);
    } else if (moduleIndex < modules.length - 1) {
      setModuleIndex(moduleIndex + 1);
      setCaseIndex(0);
    } else {
      onComplete(score + (choice === caseItem.answer ? 1 : 0));
    }
  }

  return (
    <div className="module">

      {/* HOME BUTTON */}
      <button className="home-btn" onClick={onExit}>
        ⬅ Exit to Simulation
      </button>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>

      <h2>{module.title}</h2>

      <p className="case-text">{caseItem.question}</p>

      <div className="options">
        {caseItem.options.map((opt, i) => (
          <button key={i} onClick={() => answer(i)}>
            {opt}
          </button>
        ))}
      </div>

      <p className="score">Score: {score}</p>

    </div>
  );
}
import { useState, useEffect } from "react";
import modules from "./modules";

export default function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentModuleData =
    currentModule !== null ? modules[currentModule] : null;

  const currentCase =
    currentModuleData?.cases?.[currentCaseIndex];

  // Shuffle answers on each new case
  useEffect(() => {
    if (currentCase) {
      setShuffledOptions(
        [...currentCase.options].sort(() => Math.random() - 0.5)
      );
      setSelectedAnswer(null);
    }
  }, [currentCaseIndex, currentModule]);

  const startModule = (index) => {
    setCurrentModule(index);
    setCurrentCaseIndex(0);
    setScore(0);
    setShowCertificate(false);
  };

  const goHome = () => {
    setCurrentModule(null);
    setCurrentCaseIndex(0);
    setScore(0);
    setShowCertificate(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentCase.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextCase = () => {
    if (currentCaseIndex + 1 < currentModuleData.cases.length) {
      setCurrentCaseIndex((prev) => prev + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const progress =
    ((currentCaseIndex + 1) /
      (currentModuleData?.cases.length || 1)) *
    100;

  // ================= HOME =================
  if (currentModule === null) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>CHW Training LMS</h1>

        <div style={styles.grid}>
          {modules.map((mod, i) => (
            <div key={i} style={styles.card}>
              <h2 style={{ color: "#0b1f3a" }}>{mod.title}</h2>
              <p>{mod.description}</p>

              <button
                style={styles.button}
                onClick={() => startModule(i)}
              >
                Start Module
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= CERTIFICATE =================
  if (showCertificate) {
    return (
      <div style={styles.container}>
        <div style={styles.certificate}>
          <h1 style={{ color: "#0b1f3a" }}>
            Certificate of Completion
          </h1>

          <h2>{currentModuleData.title}</h2>

          <p>
            Score: <b>{score}</b> /{" "}
            {currentModuleData.cases.length}
          </p>

          <button style={styles.button} onClick={goHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ================= CASE SCREEN =================
  return (
    <div style={styles.container}>
      <button onClick={goHome} style={styles.homeBtn}>
        ← Home
      </button>

      <h2 style={{ color: "#0b1f3a" }}>
        {currentModuleData.title}
      </h2>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`
          }}
        />
      </div>

      <p>
        Case {currentCaseIndex + 1} of{" "}
        {currentModuleData.cases.length}
      </p>

      <div style={styles.card}>
        <p style={{ lineHeight: "1.6" }}>
          {currentCase.case}
        </p>

        {/* ANSWER OPTIONS */}
        {shuffledOptions.map((opt, i) => {
          const isCorrect =
            opt === currentCase.correctAnswer;
          const isSelected = opt === selectedAnswer;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              style={{
                ...styles.option,
                background:
                  selectedAnswer
                    ? isCorrect
                      ? "#d4edda"
                      : isSelected
                      ? "#f8d7da"
                      : "#f5f5f5"
                    : "#f5f5f5",
                color: "#0b1f3a" // NAVY TEXT FIX (IMPORTANT)
              }}
            >
              {opt}
            </button>
          );
        })}

        {/* RATIONALE */}
        {selectedAnswer && (
          <div style={styles.rationale}>
            <strong>Rationale:</strong>{" "}
            {currentCase.rationale}
          </div>
        )}

        {/* NEXT BUTTON */}
        {selectedAnswer && (
          <button onClick={nextCase} style={styles.button}>
            Next Case
          </button>
        )}
      </div>
    </div>
  );
}

// ================= STYLES =================

const styles = {
  container: {
    padding: "30px",
    maxWidth: "850px",
    margin: "auto",
    fontFamily: "Arial"
  },

  title: {
    textAlign: "center",
    color: "#0b1f3a"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff"
  },

  button: {
    marginTop: "10px",
    padding: "10px 14px",
    background: "#0b1f3a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  homeBtn: {
    marginBottom: "10px",
    background: "transparent",
    border: "none",
    color: "#0b1f3a",
    cursor: "pointer"
  },

  option: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "500"
  },

  rationale: {
    marginTop: "12px",
    padding: "12px",
    background: "#f9f9f9",
    borderRadius: "6px"
  },

  progressBar: {
    height: "10px",
    background: "#eee",
    borderRadius: "5px",
    margin: "10px 0"
  },

  progressFill: {
    height: "100%",
    background: "#0b1f3a",
    borderRadius: "5px"
  },

  certificate: {
    textAlign: "center",
    border: "2px solid #0b1f3a",
    padding: "40px",
    borderRadius: "10px",
    background: "white"
  }
};
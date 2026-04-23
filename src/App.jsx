import React, { useState, useEffect } from "react";
import "./App.css";
import modules from "./modules";
import GISGameMap from "./GISGameMap";

/* ---------------- NAV ---------------- */
function Nav({ setScreen, resetModule }) {
  const navBtn = {
    background: "#ffffff",
    border: "2px solid #e5e5e5",
    color: "#000000",
    fontWeight: "bold",
    padding: "8px 12px",
    margin: "5px",
    cursor: "pointer"
  };

  return (
    <div className="nav" style={{ textAlign: "center" }}>
      <button style={navBtn} onClick={() => setScreen("home")}>Dashboard</button>
      <button style={navBtn} onClick={() => setScreen("background")}>Background</button>
      <button style={navBtn} onClick={() => { resetModule(); setScreen("modules"); }}>
        Modules
      </button>
      <button style={navBtn} onClick={() => setScreen("gis")}>Community Crisis Simulation</button>
      <button style={navBtn} onClick={() => setScreen("certificate")}>Certificate</button>
    </div>
  );
}

/* ---------------- BUTTONS ---------------- */
const optionBtn = {
  background: "#4c1d95",
  border: "1px solid #6d28d9",
  color: "#e5e7eb",
  fontWeight: "500",
  padding: "10px 14px",
  cursor: "pointer",
  display: "block",
  margin: "8px auto"
};

const nextBtn = {
  background: "#e5e7eb",
  border: "2px solid #9ca3af",
  color: "#111827",
  fontWeight: "bold",
  padding: "10px 14px",
  cursor: "pointer",
  display: "block",
  margin: "10px auto"
};

const backBtn = {
  background: "#111827",
  border: "2px solid #6b7280",
  color: "#ffffff",
  fontWeight: "bold",
  padding: "10px 14px",
  cursor: "pointer",
  display: "block",
  margin: "20px auto"
};

/* ---------------- NORMALIZE ---------------- */
const normalizeModule = (m) => ({
  ...m,
  caseStudy: m.caseStudy || "Case study not available.",
  questions: (m.questions || []).map((q) => {
    const correctIndex = q.correct;
    return {
      ...q,
      correctAnswer: q.options?.[correctIndex],
      explanation: q.explanations?.[correctIndex],
      explanationMap: q.explanations || []
    };
  })
});

/* ---------------- SHUFFLE ---------------- */
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(false);

  const [activeModule, setActiveModule] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const [moduleScores, setModuleScores] = useState({});

  /* ---------------- SHUFFLED OPTIONS ---------------- */
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const moduleCases = modules.map(normalizeModule);
  const active = moduleCases.find((m) => m.id === activeModule);

  /* ---------------- RANDOMIZE OPTIONS PER QUESTION ---------------- */
  useEffect(() => {
    if (activeModule && active?.questions?.[questionIndex]) {
      const q = active.questions[questionIndex];
      setShuffledOptions(shuffleArray(q.options));
    }
  }, [activeModule, questionIndex]);

  const resetModule = () => {
    setActiveModule(null);
    setQuestionIndex(0);
    setFeedback(null);
    setCompleted(false);
    setShuffledOptions([]);
  };

  const totalQuestions = active?.questions?.length || 0;
  const scorePercent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const passed = scorePercent >= 80;

  /* ---------------- HOME ---------------- */
  if (screen === "home") {
    return (
      <div className="app-shell">
        <Nav setScreen={setScreen} resetModule={resetModule} />

        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <h1 style={{ fontSize: "3.2rem" }}>
            Missouri Community Health Workers Learning System
          </h1>

          {!submittedName ? (
            <div className="card" style={{ width: "520px", margin: "0 auto" }}>
              <h2>Enter Your Name</h2>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                style={{ width: "100%", padding: "10px" }}
              />

              <button style={optionBtn} onClick={() => setSubmittedName(true)}>
                Start Learning Path
              </button>
            </div>
          ) : (
            <>
              <h2>Welcome, {name}</h2>

              <div className="card" style={{ maxWidth: "650px", margin: "0 auto" }}>
                <h3>Learning Path Instructions</h3>
                <p>1. Review Background information in full detail.</p>
                <p>2. Complete all modules in sequence.</p>
                <p>3. Analyze each case study carefully.</p>
                <p>4. Select answers and review explanations.</p>
                <p>5. Achieve ≥80% for CE completion.</p>
                <p>6. Play the simulation for an interactive way to see how actions impact community. </p>
              </div>

              <button style={optionBtn} onClick={() => setScreen("background")}>
                Enter Learning Path
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- BACKGROUND ---------------- */
if (screen === "background") {
  return (
    <div className="app-shell">
      <Nav setScreen={setScreen} resetModule={resetModule} />

      <h2 style={{ textAlign: "center" }}>
        CHW Health Learning Focus:
      </h2>

      <div
        className="grid"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px"
        }}
      >
        <div className="background-readonly" style={{ pointerEvents: "auto" }}>
          <h3>Addiction</h3>
          <p>Opioid and substance use disorder burden in Missouri.</p>
          <p>Rural areas face limited treatment access.</p>

          <p><strong>Resources:</strong></p>
          <a
            href="https://health.mo.gov/living/families/more/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Missouri Substance Use & Addiction Data →
          </a>
        </div>

        <div className="background-readonly" style={{ pointerEvents: "auto" }}>
          <h3>Mental Health</h3>
          <p>Psychiatric illness impacts statewide health outcomes.</p>
          <p>Provider shortages remain critical.</p>

          <p><strong>Resources:</strong></p>
          <a
            href="https://dmh.mo.gov/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Missouri Department of Mental Health →
          </a>
        </div>

        <div className="background-readonly" style={{ pointerEvents: "auto" }}>
          <h3>Food Deserts</h3>
          <p>Limited access to healthy foods in urban and rural Missouri.</p>
          <p>Transportation barriers increase disparities.</p>

          <p><strong>Resources:</strong></p>
          <a
            href="https://foodsecurity.missouri.edu/wp-content/uploads/2025/07/Missouri-Hunger-Atlas-2025_Final.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Missouri Hunger Atlas 2025 →
          </a>
        </div>

        <div className="background-readonly" style={{ pointerEvents: "auto" }}>
          <h3>Social Determinants</h3>
          <p>Income, housing, and education shape health outcomes.</p>
          <p>Missouri disparities persist across counties.</p>

          <p><strong>Resources:</strong></p>
          <a
            href="https://www.cdc.gov/about/priorities/social-determinants-of-health-at-cdc.html?CDC_AAref_Val=https://www.cdc.gov/about/sdoh/index.html"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            CDC Social Determinants of Health →
          </a>
        </div>
      </div>

      <button style={optionBtn} onClick={() => setScreen("modules")}>
        Continue to Modules
      </button>
    </div>
  );
}

  /* ---------------- MODULES ---------------- */
  if (screen === "modules") {
    return (
      <div className="app-shell">
        <Nav setScreen={setScreen} resetModule={resetModule} />

        <h2 style={{ textAlign: "center" }}>Training Modules</h2>

        {!activeModule ? (
          <div className="grid">
            {moduleCases.map((m) => {
              const isCompleted = (moduleScores[m.id] || 0) >= 80;

              return (
                <div
                  key={m.id}
                  className="card"
                  style={{ cursor: "pointer", textAlign: "center" }}
                  onClick={() => {
                    setActiveModule(m.id);
                    setQuestionIndex(0);
                    setCorrectCount(0);
                    setCompleted(false);
                  }}
                >
                  <h3>
                    Module {m.id} {isCompleted ? "✔ Completed" : ""}
                  </h3>
                  <p>{m.caseStudy}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center" }}>
            <h2>Module {active.id}</h2>

            <p style={{ fontSize: "1.35rem", fontWeight: "500" }}>
              {active.caseStudy}
            </p>

            {!completed && (
              <>
                <h3>Question {questionIndex + 1}</h3>

                <p>{active.questions[questionIndex]?.question}</p>

                {shuffledOptions.map((opt, i) => (
                  <button
                    key={i}
                    style={optionBtn}
                    onClick={() => {
                      const q = active.questions[questionIndex];
                      const isCorrect = opt === q.correctAnswer;

                      const originalIndex = q.options.indexOf(opt);

                      setFeedback({
                        text: isCorrect ? "Correct" : "Incorrect",
                        explanation: q.explanationMap?.[originalIndex]
                      });

                      if (isCorrect) setCorrectCount((p) => p + 1);
                    }}
                  >
                    {opt}
                  </button>
                ))}

                {feedback && (
                  <div className="feedback">
                    <strong>{feedback.text}</strong>
                    <p>{feedback.explanation}</p>
                  </div>
                )}

                <button
                  style={nextBtn}
                  onClick={() => {
                    if (questionIndex < active.questions.length - 1) {
                      setQuestionIndex((p) => p + 1);
                      setFeedback(null);
                    } else {
                      setCompleted(true);
                      setModuleScores((prev) => ({
                        ...prev,
                        [active.id]: scorePercent
                      }));
                    }
                  }}
                >
                  {questionIndex === active.questions.length - 1
                    ? "Finish Module"
                    : "Next Question"}
                </button>
              </>
            )}

            {completed && (
              <div className="card">
                <h3>Module Score: {scorePercent}%</h3>
                <p>{passed ? "PASS" : "FAIL"}</p>
              </div>
            )}

            <button style={backBtn} onClick={resetModule}>
              Back to Modules
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- GIS ---------------- */
  if (screen === "gis") {
    return (
      <div className="app-shell">
        <Nav setScreen={setScreen} resetModule={resetModule} />

        <div style={{ minHeight: "80vh", padding: "20px" }}>
          {GISGameMap ? (
            <GISGameMap onBack={() => setScreen("home")} />
          ) : (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <h2 style={{ color: "red" }}>GIS MODULE FAILED TO LOAD</h2>
              <p>Check GISGameMap import or export.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- CERTIFICATE ---------------- */
  if (screen === "certificate") {
    const userName = name || "User";

    const allPassed =
      moduleCases.length > 0 &&
      moduleCases.every((m) => (moduleScores[m.id] || 0) >= 80);

    if (!allPassed) {
      return (
        <div className="app-shell">
          <Nav setScreen={setScreen} resetModule={resetModule} />
          <h2 style={{ textAlign: "center" }}>
            Complete all modules with ≥80% to unlock certificate.
          </h2>
        </div>
      );
    }

    return (
      <div className="app-shell">
        <Nav setScreen={setScreen} resetModule={resetModule} />

        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h1>Completion Certificate</h1>

          <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
              <strong>
                {userName} has completed learning modules for CHW Learning in the
                following high interest areas: Addiction, Mental Health, Food
                Deserts and Social Determinants of Health.
              </strong>
            </p>

            <p style={{ fontSize: "1.2rem" }}>
              They have successfully completed <strong>3.0 CE credit hours</strong>.
            </p>

            <p style={{ fontSize: "1.2rem" }}>
              This certificate shall act as documentation for the state's Credentialing Board.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
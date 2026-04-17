import React, { useMemo, useState, useEffect } from "react";
import modules from "./modules";

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  const [mapNode, setMapNode] = useState("downtown");

  const [worldState, setWorldState] = useState({
    downtown: { name: "Downtown", x: 50, y: 40, overdose: 8, food: 3, trust: 4 },
    central: { name: "Central Corridor", x: 70, y: 30, overdose: 6, food: 5, trust: 6 },
    north: { name: "North County", x: 80, y: 15, overdose: 4, food: 7, trust: 8 }
  });

  const currentCase = selectedModule?.cases?.[selectedCaseIndex];

  const xpToNextLevel = useMemo(() => level * 100, [level]);
  const xpPercent = Math.min((xp / xpToNextLevel) * 100, 100);

  const addXP = (amt) => setXp((p) => p + amt);

  const handleAnswer = (opt) => {
    setShowFeedback(true);
    const isCorrect = opt === currentCase.correctAnswer;

    if (isCorrect) {
      addXP(20 + streak * 5);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextCase = () => {
    setShowFeedback(false);
    setSelectedCaseIndex((i) => i + 1);
  };

  const MAP = worldState;

  const activeNode = MAP?.[mapNode];

  const moveNode = (id) => {
    setMapNode(id);
    setWorldState((p) => ({
      ...p,
      [id]: {
        ...p[id],
        trust: Math.min(10, p[id].trust + 1),
        overdose: Math.max(0, p[id].overdose - 1)
      }
    }));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-[320px] border-r border-white/10 bg-black/40 backdrop-blur-xl p-5">

        <h1 className="text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
          CHW Simulation Engine
        </h1>

        {/* STATS CARD */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-sm text-white/60">Level</div>
          <div className="text-2xl font-bold">{level}</div>

          <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="text-xs mt-2 text-white/60">
            XP: {xp} / {xpToNextLevel}
          </div>

          <div className="mt-2 text-sm">
            🔥 Streak: <span className="text-pink-400">{streak}</span>
          </div>
        </div>

        {/* MODULE LIST */}
        <div className="mt-6 space-y-2">
          {modules.map((m, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedModule(m);
                setSelectedCaseIndex(0);
              }}
              className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <div className="font-semibold text-sm">{m.title}</div>
              <div className="text-xs text-white/60 mt-1">
                {m.description}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-6">

        {/* ================= DASHBOARD HEADER ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white/90">
            Training Dashboard
          </h2>
          <p className="text-white/50 text-sm">
            Interactive CHW Simulation System
          </p>
        </div>

        {/* ================= MAP MODE ================= */}
        {selectedModule?.title?.includes("Module 7") ? (
          <div className="relative h-[620px] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">

            <div className="absolute top-4 left-4 text-cyan-300 font-bold">
              Missouri Systems Map
            </div>

            {Object.entries(MAP).map(([id, node]) => (
              <button
                key={id}
                onClick={() => moveNode(id)}
                className="absolute px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/30 hover:bg-cyan-400/40 border border-white/10 backdrop-blur"
                style={{ left: node.x + "%", top: node.y + "%" }}
              >
                {node.name}
              </button>
            ))}

            {activeNode && (
              <div className="absolute bottom-0 w-full p-5 bg-black/70 border-t border-white/10">

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{activeNode.name}</h3>
                  <div className="text-xs text-white/50">
                    OD {activeNode.overdose} | TR {activeNode.trust}
                  </div>
                </div>

                <p className="text-white/60 mt-2 text-sm">
                  System conditions updating in real-time simulation model.
                </p>

              </div>
            )}

          </div>

        ) : !selectedModule ? (
          <div className="grid place-items-center h-[60vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 text-transparent bg-clip-text">
                CHW Training Simulation
              </h1>
              <p className="text-white/50 mt-3">
                Select a module to begin training
              </p>
            </div>
          </div>

        ) : !currentCase ? (
          <div className="text-center mt-24 text-white/60">
            Module Complete ✔
          </div>

        ) : (
          <div className="max-w-2xl mx-auto">

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

              <div className="text-white/80 mb-4 text-lg">
                {currentCase.scenario}
              </div>

              <div className="space-y-3">
                {currentCase.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={showFeedback}
                    className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mt-5">
                  <div className="text-green-300 text-sm mb-3">
                    {currentCase.rationale}
                  </div>

                  <button
                    onClick={nextCase}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 font-semibold"
                  >
                    Next →
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
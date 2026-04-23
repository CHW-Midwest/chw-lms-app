export function createInitialState() {
  return {
    day: 1,
    budget: 10,
    stress: 0,
    counties: [
      { id: "stl_city", name: "St. Louis City", risk: 5, neighbors: ["stl_county"] },
      { id: "stl_county", name: "St. Louis County", risk: 4, neighbors: ["stl_city", "jefferson", "st_charles"] },
      { id: "jefferson", name: "Jefferson County", risk: 3, neighbors: ["stl_county"] },
      { id: "st_charles", name: "St. Charles County", risk: 2, neighbors: ["stl_county"] }
    ],
    log: [],
    status: "PLAYING"
  };
}

/* ---------------- UTIL ---------------- */

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const avgRisk = (state) =>
  state.counties.reduce((s, c) => s + c.risk, 0) / state.counties.length;

/* ---------------- ACTIONS ---------------- */

export function applyAction(state, type, id) {
  const costMap = {
    naloxone: 3,
    outreach: 2,
    funding: 4
  };

  if (state.budget < costMap[type]) return state;

  const updated = {
    ...state,
    budget: state.budget - costMap[type],
    counties: state.counties.map((c) => {
      if (c.id !== id) return c;

      let r = c.risk;

      if (type === "naloxone") r -= 1.3;
      if (type === "outreach") r -= 0.8;
      if (type === "funding") r -= 0.5;

      return { ...c, risk: clamp(r, 1, 6) };
    }),
    log: [...state.log, `Action: ${type} on ${id}`]
  };

  return updated;
}

/* ---------------- SPREAD MODEL ---------------- */

function spread(counties, stress) {
  return counties.map((c) => {
    let r = c.risk;

    c.neighbors.forEach((nId) => {
      const n = counties.find((x) => x.id === nId);
      if (!n) return;

      r += n.risk * 0.1;
    });

    r += stress * 0.25;

    return { ...c, risk: clamp(r, 1, 6) };
  });
}

/* ---------------- CRISIS ENGINE ---------------- */

function generateCrisis(state) {
  const avg = avgRisk(state);

  if (avg > 4.5) return "SYSTEM_OVERLOAD";
  if (avg > 3.5) return Math.random() > 0.5 ? "LOCAL_SPIKE" : "STABLE";
  if (avg < 2.5) return "STABLE";
  return Math.random() > 0.7 ? "LOCAL_SPIKE" : "STABLE";
}

/* ---------------- MAIN TURN ENGINE ---------------- */

export function nextDay(state) {
  let counties = spread(state.counties, state.stress);

  const crisis = generateCrisis(state);

  counties = counties.map((c) => {
    if (crisis === "SYSTEM_OVERLOAD") return { ...c, risk: c.risk + 0.4 };
    if (crisis === "LOCAL_SPIKE" && c.risk >= 3) return { ...c, risk: c.risk + 0.3 };
    return c;
  });

  const newAvg = avgRisk({ counties });

  const newStress =
    newAvg > 3.5 ? state.stress + 0.3 : Math.max(0, state.stress - 0.1);

  const newState = {
    ...state,
    day: state.day + 1,
    counties,
    stress: newStress,
    budget: 10,
    log: [...state.log, `Day ${state.day}: ${crisis}`]
  };

  if (newAvg >= 6) newState.status = "LOSE";
  if (newAvg <= 2) newState.status = "WIN";

  return newState;
}

// ------------------------------
// 🌎 INITIAL STATE
// ------------------------------
export const initialState = {
  regions: {
    "stl-metro": { risk: 0.75, intervention: 0.3, trend: 0 },
    "kc-metro": { risk: 0.65, intervention: 0.25, trend: 0 },
    "bootheel": { risk: 0.85, intervention: 0.15, trend: 0 },
    "north-rural": { risk: 0.6, intervention: 0.2, trend: 0 }
  },
  time: 0,
  history: [],
  policy: {
    educationFunding: 0.3,
    treatmentFunding: 0.5,
    preventionFunding: 0.2
  }
};

// ------------------------------
// ⏳ DELAYED EFFECT QUEUE
// ------------------------------
const delayedEffects = [];

// ------------------------------
// 🏛 POLICY MULTIPLIERS
// ------------------------------
function getPolicyModifiers(policy) {
  return {
    educationBoost: 1 + policy.educationFunding * 0.6,
    treatmentBoost: 1 + policy.treatmentFunding * 0.8,
    preventionBoost: 1 + policy.preventionFunding * 0.5
  };
}

// ------------------------------
// 🧩 APPLY INTERVENTION
// ------------------------------
export function applyIntervention(state, regionId, action, role) {
  const region = state.regions[regionId];
  if (!region) return state;

  const policy = state.policy || {
    educationFunding: 0.3,
    treatmentFunding: 0.5,
    preventionFunding: 0.2
  };

  const mods = getPolicyModifiers(policy);

  const roleMultiplier =
    role === "navigator" ? 1.15 :
    role === "outreach" ? 1.25 :
    role === "analyst" ? 0.95 : 1;

  let effect = 0;

  if (action === "education") {
    effect = -0.06 * roleMultiplier * mods.educationBoost;
  }
  if (action === "treatment") {
    effect = -0.1 * roleMultiplier * mods.treatmentBoost;
  }
  if (action === "prevention") {
    effect = -0.04 * roleMultiplier * mods.preventionBoost;
  }

  // ⏳ delayed system response
  delayedEffects.push({
    turn: state.time + 2,
    regionId,
    effect
  });

  return state;
}

// ------------------------------
// ⏩ STEP SIMULATION (CORE ENGINE)
// ------------------------------
export function stepSimulation(state) {
  state.time += 1;

  // apply delayed effects
  const remaining = [];

  for (const e of delayedEffects) {
    if (e.turn === state.time) {
      if (state.regions[e.regionId]) {
        state.regions[e.regionId].intervention += e.effect;
      }
    } else {
      remaining.push(e);
    }
  }

  delayedEffects.length = 0;
  delayedEffects.push(...remaining);

  // 🌎 SYSTEM DYNAMICS LOOP
  Object.keys(state.regions).forEach((id) => {
    const r = state.regions[id];

    const interventionImpact = r.intervention * 0.35;
    const noise = (Math.random() - 0.5) * 0.04;

    r.risk += noise - interventionImpact;

    r.risk = Math.max(0, Math.min(1, r.risk));
    r.trend = -interventionImpact;
  });

  // 📊 store history snapshot
  state.history.push(structuredClone(state));

  return state;
}

// ------------------------------
// 📈 FORECAST ENGINE (10-STEP PROJECTION)
// ------------------------------
export function forecast(state, steps = 10) {
  const clone = structuredClone(state);
  const projection = [];

  for (let i = 0; i < steps; i++) {
    stepSimulation(clone);

    const avg =
      Object.values(clone.regions)
        .reduce((sum, r) => sum + r.risk, 0) /
      Object.values(clone.regions).length;

    projection.push({
      step: clone.time,
      risk: avg
    });
  }

  return projection;
}
const modules = [
  // =========================
  // MODULE 1
  // =========================
  {
    title: "Module 1: Communication & Engagement",
    description:
      "Build trust, active listening, and motivational interviewing skills.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Communication scenario ${i + 1}: A client shows hesitation and limited engagement.`,
      options: [
        "Use open-ended questions and reflective listening",
        "Speak faster to finish the session",
        "Avoid emotional topics",
        "Give instructions without discussion"
      ],
      correctAnswer: "Use open-ended questions and reflective listening",
      rationale: "Active listening builds trust and improves engagement."
    }))
  },

  // =========================
  // MODULE 2
  // =========================
  {
    title: "Module 2: Care Coordination",
    description: "Navigate healthcare systems and social services.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Care coordination scenario ${i + 1}: A client faces barriers accessing care.`,
      options: [
        "Connect client to community resources",
        "Tell them to search online alone",
        "Delay action until next visit",
        "Avoid system barriers discussion"
      ],
      correctAnswer: "Connect client to community resources",
      rationale: "CHWs bridge access gaps to services."
    }))
  },

  // =========================
  // MODULE 3
  // =========================
  {
    title: "Module 3: Behavioral Health",
    description:
      "Support mental health and substance use challenges.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Behavioral health scenario ${i + 1}: Client shows distress or substance concerns.`,
      options: [
        "Provide empathetic support and refer services",
        "Ignore emotional concerns",
        "Focus only on physical symptoms",
        "Tell them to handle it alone"
      ],
      correctAnswer: "Provide empathetic support and refer services",
      rationale: "Integrated support improves outcomes."
    }))
  },

  // =========================
  // MODULE 4
  // =========================
  {
    title: "Module 4: Chronic Disease Management",
    description:
      "Support long-term health conditions and prevention.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Chronic disease scenario ${i + 1}: Client managing diabetes or hypertension.`,
      options: [
        "Support lifestyle and medication adherence",
        "Ignore condition management",
        "Give prescriptions directly",
        "Avoid follow-up"
      ],
      correctAnswer: "Support lifestyle and medication adherence",
      rationale: "CHWs reinforce clinical care."
    }))
  },

  // =========================
  // MODULE 5
  // =========================
  {
    title: "Module 5: Cultural Competency & Ethics",
    description:
      "Deliver equitable and respectful care.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Cultural scenario ${i + 1}: Client has cultural beliefs affecting care.`,
      options: [
        "Respect beliefs and provide accurate info",
        "Dismiss beliefs",
        "Force compliance",
        "Avoid discussion"
      ],
      correctAnswer: "Respect beliefs and provide accurate info",
      rationale: "Cultural humility builds trust."
    }))
  },

  // =========================
  // MODULE 6
  // =========================
  {
    title: "Module 6: CHW Training Orientation & LMS Guide",
    description:
      "How to use the LMS effectively in training settings.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Training scenario ${i + 1}: Effective CHW education strategy.`,
      options: [
        "Use guided instruction and reflection",
        "Avoid structured learning",
        "Only use testing",
        "Skip engagement strategies"
      ],
      correctAnswer: "Use guided instruction and reflection",
      rationale: "Structured learning improves retention."
    }))
  },

  // =========================
  // MODULE 7 (MAP SIMULATION)
  // =========================
  {
  title: "Module 7: Missouri CHW Simulation Game Engine",
  description:
    "Interactive systems map with connected regions, CHW interventions, and dynamic outcomes.",

  startNode: "downtown",

  nodes: {
    downtown: {
      id: "downtown",
      name: "Downtown",
      x: 50,
      y: 40,
      connections: ["central", "clinic"],

      state: { overdose: 8, foodAccess: 4, trust: 5 },

      text: "Downtown crisis zone: overdoses rising, low food access.",

      choices: [
        { text: "Harm Reduction Outreach", next: "central", impact: { overdose: -2, trust: 2 } },
        { text: "Clinic Referral Only", next: "clinic", impact: { trust: 1 } }
      ]
    },

    clinic: {
      id: "clinic",
      name: "Clinic Hub",
      x: 65,
      y: 55,
      connections: ["downtown"],

      state: { overdose: 7, foodAccess: 4, trust: 4 },

      text: "Clinic-only model improves individuals but not systems.",

      choices: [
        { text: "Return to field outreach", next: "downtown", impact: { trust: 1 } }
      ]
    },

    central: {
      id: "central",
      name: "Central Corridor",
      x: 70,
      y: 30,
      connections: ["downtown", "north"],

      state: { overdose: 6, foodAccess: 6, trust: 7 },

      text: "Central corridor stabilizing due to outreach programs.",

      choices: [
        { text: "Expand to North County", next: "north", impact: { foodAccess: 2 } }
      ]
    },

    north: {
      id: "north",
      name: "North County",
      x: 80,
      y: 15,
      connections: ["central"],

      state: { overdose: 4, foodAccess: 7, trust: 9 },

      text: "System-wide improvement achieved.",

      choices: []
    }
  }
}
];

export default modules;
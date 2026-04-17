const modules = [
  {
    title: "Module 1: Communication & Engagement",
    description: "Build trust, active listening, and motivational interviewing skills.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Communication scenario ${i + 1}: Client shows hesitation and limited engagement.`,
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

  {
    title: "Module 2: Care Coordination",
    description: "Navigate healthcare systems and social services.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Care coordination scenario ${i + 1}: Client faces barriers accessing care.`,
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

  {
    title: "Module 3: Behavioral Health",
    description: "Support mental health and substance use challenges.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Behavioral health scenario ${i + 1}: Client shows distress or substance concerns.`,
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

  {
    title: "Module 4: Chronic Disease Management",
    description: "Support long-term health conditions and prevention.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Chronic disease scenario ${i + 1}: Client managing diabetes or hypertension.`,
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

  {
    title: "Module 5: Cultural Competency & Ethics",
    description: "Deliver equitable and respectful care.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Cultural scenario ${i + 1}: Client has cultural beliefs affecting care.`,
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

  {
    title: "Module 6: CHW Training Orientation",
    description: "How to use the LMS effectively in training settings.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario: `Training scenario ${i + 1}: Effective CHW education strategy.`,
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

  {
    title: "Module 7: Missouri CHW Simulation Map",
    description: "Interactive systems map with real-world CHW intervention zones.",

    nodes: {
      downtown: {
        id: "downtown",
        name: "Downtown",
        x: 50,
        y: 40,
        overdose: 8,
        food: 3,
        trust: 4,
        text: "Urban core with high overdose rates and low food access.",
        connections: ["central", "north"]
      },
      central: {
        id: "central",
        name: "Central Corridor",
        x: 70,
        y: 30,
        overdose: 6,
        food: 5,
        trust: 6,
        text: "Mixed stability region with active interventions.",
        connections: ["downtown", "north"]
      },
      north: {
        id: "north",
        name: "North County",
        x: 80,
        y: 15,
        overdose: 4,
        food: 7,
        trust: 8,
        text: "More stable region with improving outcomes.",
        connections: ["central"]
      }
    }
  },

  {
    title:
      "Module 8: Missouri Context — Addiction, Food Deserts & Policy Systems",

    description:
      "Understand how history and policy shape addiction and food access.",

    cases: Array.from({ length: 20 }, (_, i) => ({
      scenario:
        i < 5
          ? `Historical scenario ${i + 1}: How did segregation and housing policy shape health outcomes?`
          : i < 10
          ? `Policy scenario ${i + 1}: Medicaid access changes affect treatment availability.`
          : i < 15
          ? `Food system scenario ${i + 1}: Grocery store closures impact food deserts.`
          : `Structural scenario ${i + 1}: Systems interact to influence overdose risk.`,

      options: [
        "These outcomes are driven by structural and policy systems",
        "They are mainly due to individual choices",
        "They are unrelated to healthcare systems",
        "They cannot be influenced"
      ],

      correctAnswer:
        "These outcomes are driven by structural and policy systems",

      rationale:
        "Health outcomes are shaped by long-term structural determinants including housing, healthcare access, transportation, and economic inequality."
    }))
  }
];

export default modules;
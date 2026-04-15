const modules = [
  // =========================
  // MODULE 1
  // =========================
  {
    title: "Module 1: Communication & Engagement",
    description: "Build trust, active listening, and motivational interviewing skills.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Communication scenario ${i + 1}: A client shows hesitation and limited engagement during a CHW interaction.`,
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
      case: `Care coordination scenario ${i + 1}: A client faces barriers accessing healthcare and social services.`,
      options: [
        "Connect client to appropriate community resources",
        "Tell them to search online independently",
        "Delay action until next visit",
        "Avoid discussing system barriers"
      ],
      correctAnswer: "Connect client to appropriate community resources",
      rationale: "CHWs help bridge access gaps to essential services."
    }))
  },

  // =========================
  // MODULE 3
  // =========================
  {
    title: "Module 3: Behavioral Health",
    description: "Support mental health and substance use challenges.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Behavioral health scenario ${i + 1}: A client shows signs of emotional distress or substance use concerns.`,
      options: [
        "Provide empathetic support and refer to services",
        "Ignore emotional concerns",
        "Focus only on physical symptoms",
        "Tell them to handle it alone"
      ],
      correctAnswer: "Provide empathetic support and refer to services",
      rationale: "Integrated behavioral support improves outcomes."
    }))
  },

  // =========================
  // MODULE 4
  // =========================
  {
    title: "Module 4: Chronic Disease Management",
    description: "Support long-term health conditions and prevention.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Chronic disease scenario ${i + 1}: A client manages diabetes or hypertension with difficulty.`,
      options: [
        "Support lifestyle changes and medication adherence education",
        "Ignore condition management",
        "Give medical prescriptions directly",
        "Avoid follow-up discussions"
      ],
      correctAnswer: "Support lifestyle changes and medication adherence education",
      rationale: "CHWs reinforce clinical care through education and support."
    }))
  },

  // =========================
  // MODULE 5
  // =========================
  {
    title: "Module 5: Cultural Competency & Ethics",
    description: "Deliver equitable, respectful, and ethical care.",
    cases: Array.from({ length: 20 }, (_, i) => ({
      case: `Cultural competency scenario ${i + 1}: A client has cultural beliefs affecting healthcare decisions.`,
      options: [
        "Respect beliefs while providing accurate information",
        "Dismiss cultural beliefs",
        "Force compliance with instructions",
        "Avoid discussing differences"
      ],
      correctAnswer: "Respect beliefs while providing accurate information",
      rationale: "Cultural humility improves trust and care effectiveness."
    }))
  },

  // =========================
  // MODULE 6
  // =========================
  {
    title: "Module 6: CHW Training Orientation & LMS Guide",
    description: "How to use this training platform effectively in education settings.",
    cases: [
      {
        case: "How should CHW educators best use this LMS?",
        options: [
          "As a structured guided learning tool with discussion",
          "As a replacement for all field training",
          "As optional entertainment only",
          "Without tracking progress"
        ],
        correctAnswer: "As a structured guided learning tool with discussion",
        rationale: "Blended learning strengthens CHW competency."
      },
      {
        case: "A learner struggles with pacing. What should the educator do?",
        options: [
          "Break content into smaller sections",
          "Force faster completion",
          "Remove learner from program",
          "Skip difficult content"
        ],
        correctAnswer: "Break content into smaller sections",
        rationale: "Scaffolded learning improves retention."
      }
    ].concat(
      Array.from({ length: 18 }, (_, i) => ({
        case: `Orientation scenario ${i + 3}: Effective CHW education strategy ${i + 1}.`,
        options: [
          "Use guided instruction and reflection",
          "Avoid structured learning",
          "Only use testing",
          "Skip engagement strategies"
        ],
        correctAnswer: "Use guided instruction and reflection",
        rationale: "Structured engagement improves learning outcomes."
      }))
    )
  },

  // =========================
  // MODULE 7 (GAMIFIED SIMULATION)
  // =========================
  {
  title: "Module 7: Missouri Community Health Simulation",
  description: "Interactive systems simulation: addiction, food deserts, and CHW interventions in real-time.",
  cases: [
    {
      case: "Simulation Start: You enter a St. Louis community with rising overdoses and limited food access. What is your first move?",
      options: [
        "Assess community systems and map resources",
        "Focus on one individual client",
        "Distribute pamphlets only",
        "Wait for external referrals"
      ],
      correctAnswer: "Assess community systems and map resources",
      impact: 10,
      rationale: "System mapping is the foundation of effective CHW intervention."
    },
    {
      case: "Food desert identified. What intervention has highest system impact?",
      options: [
        "Mobile grocery + food access programs",
        "Tell residents to travel farther",
        "Ignore food access systems",
        "Focus only on education"
      ],
      correctAnswer: "Mobile grocery + food access programs",
      impact: 15,
      rationale: "Structural food interventions improve population health."
    },
    {
      case: "Overdose rates increase. Best CHW response?",
      options: [
        "Harm reduction + treatment linkage",
        "Punitive enforcement",
        "Avoid discussion",
        "Wait for hospitals"
      ],
      correctAnswer: "Harm reduction + treatment linkage",
      impact: 20,
      rationale: "Harm reduction reduces mortality and improves outcomes."
    },
    {
      case: "Which combined intervention is strongest?",
      options: [
        "Food access + addiction services + transportation support",
        "Single education campaign",
        "No intervention",
        "Isolated services only"
      ],
      correctAnswer: "Food access + addiction services + transportation support",
      impact: 25,
      rationale: "Multi-system interventions address root causes."
    },
    {
      case: "Community outcomes improving but uneven. Next step?",
      options: [
        "Strengthen weak systems",
        "Stop intervention",
        "Focus only on food",
        "Ignore data trends"
      ],
      correctAnswer: "Strengthen weak systems",
      impact: 20,
      rationale: "Adaptive systems produce sustained improvements."
    }
  ]
    }
];

export default modules;
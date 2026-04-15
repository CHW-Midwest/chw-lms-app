const createCase = (text, correct, rationale) => ({
  case: text,
  options: [
    correct,
    "Delay action and revisit later",
    "Ignore the issue",
    "Refer without explanation"
  ].sort(() => Math.random() - 0.5),
  correctAnswer: correct,
  rationale
});

const buildCases = (topic) => {
  return Array.from({ length: 20 }, (_, i) =>
    createCase(
      `${topic} scenario ${i + 1}: A client is experiencing a barrier related to ${topic.toLowerCase()}. As a CHW, what is the BEST response?`,
      "Use a client-centered approach to assess needs and provide appropriate support",
      "Client-centered approaches improve trust, outcomes, and engagement."
    )
  );
};

const modules = [
  {
    title: "Module 1: Communication & Engagement",
    description: "Build trust, listening, and rapport.",
    cases: buildCases("Communication")
  },
  {
    title: "Module 2: Care Coordination",
    description: "Navigate healthcare and social systems.",
    cases: buildCases("Care Coordination")
  },
  {
    title: "Module 3: Behavioral Health",
    description: "Support mental and emotional health.",
    cases: buildCases("Behavioral Health")
  },
  {
    title: "Module 4: Chronic Disease",
    description: "Support long-term health conditions.",
    cases: buildCases("Chronic Disease")
  },
  {
    title: "Module 5: Cultural Competency & Ethics",
    description: "Deliver equitable and ethical care.",
    cases: buildCases("Cultural Competency")
  }
];

export default modules;
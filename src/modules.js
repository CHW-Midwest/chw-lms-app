
/**
 * =========================
 * CHW MIDWEST MODULES (UPDATED)
 * - Complex CE-level questions
 * - Non-repeating answer design
 * - Missouri-specific case studies
 * =========================
 */

/**
 * GLOBAL POOL (prevents repeating distractors across modules)
 */
export const globalDistractorPool = [
  "A temporary disruption in service access unrelated to structural barriers",
  "A personal dietary preference limiting healthy food selection",
  "A seasonal agricultural pricing fluctuation affecting short-term availability",
  "A non-clinical behavioral choice unrelated to environmental access factors",
  "A short-term emotional response without clinical significance",
  "A transportation barrier limiting access to essential community resources",
  "A systemic gap in resource distribution across underserved regions",
  "A clinically insignificant variation in mood or behavior",
  "An acute situational stressor without long-term diagnostic criteria",
  "A misunderstanding of available community health resources"
];

/**
 * =========================
 * MODULE 1: ADDICTION & MENTAL HEALTH
 * =========================
 */

export const module1 = {
  title: "Addiction and Mental Health",

  caseStudies: [
    {
      id: 1,
      text:
        "A 34-year-old client in St. Louis reports increasing alcohol use following job loss at a manufacturing plant. Over the past six months, they have experienced sleep disruption, withdrawal from family activities, and difficulty maintaining housing stability. The client expresses feelings of hopelessness but denies immediate suicidal intent. Local access to behavioral health services is limited due to transportation barriers and long clinic wait times. The client relies heavily on a peer support network but lacks formal treatment engagement."
    },

    {
      id: 2,
      text:
        "A rural family in southeast Missouri reports that their teenage son has begun misusing prescription opioids following a sports injury. The nearest behavioral health provider is over 40 miles away, and transportation is inconsistent due to limited public transit options. The family expresses concern about stigma in their small community, which discourages them from seeking help. School counselors are aware but report limited intervention resources. The situation has escalated over the past three months."
    },

    {
      id: 3,
      text:
        "A 28-year-old pregnant client in Kansas City presents with untreated anxiety and intermittent opioid use. She reports inconsistent prenatal care due to unstable housing and difficulty accessing Medicaid-covered providers. The client expresses fear of child protective services involvement if she discloses substance use. She also reports isolation after moving from another state and limited family support. Symptoms have worsened during the second trimester."
    },

    {
      id: 4,
      text:
        "A middle-aged client in rural Missouri with a history of alcohol use disorder recently returned to the community after incarceration. They report difficulty reintegrating into employment and face community stigma that limits social reintegration. The client has inconsistent access to medication-assisted treatment due to pharmacy shortages. Emotional distress has increased due to lack of structured support systems. They are currently in early recovery but at high relapse risk."
    },

    {
      id: 5,
      text:
        "A 22-year-old college student in Columbia, Missouri reports escalating panic attacks and increased cannabis use to manage academic stress. They report difficulty accessing campus mental health services due to long wait times and appointment delays. The student has withdrawn from social groups and is struggling academically. They express uncertainty about continuing enrollment. Symptoms have intensified during exam periods."
    }
  ],

  questions: [
    {
      question:
        "Which factor most strongly contributes to the client's increased risk of substance misuse in rural Missouri settings?",

      correctAnswer:
        "Limited access to behavioral health services combined with geographic isolation and transportation barriers",

      distractors: globalDistractorPool
    },

    {
      question:
        "Which approach best supports recovery-oriented care in clients experiencing co-occurring mental health and substance use disorders?",

      correctAnswer:
        "Integrated, trauma-informed care that addresses both behavioral health and environmental stressors",

      distractors: globalDistractorPool
    }
  ]
};

/**
 * =========================
 * MODULE 2: FOOD DESERTS & NUTRITION
 * =========================
 */

export const module2 = {
  title: "Food Deserts and Nutrition",

  caseStudies: [
    {
      id: 1,
      text:
        "A family living in rural Missouri reports that the nearest full-service grocery store is 18 miles away. They rely primarily on gas stations and dollar stores for food purchases. The family reports difficulty accessing fresh produce due to transportation limitations and rising fuel costs. Children in the household consume mostly processed foods with limited nutritional variety. Community food assistance programs are available but underutilized due to lack of awareness."
    },

    {
      id: 2,
      text:
        "An elderly client in East St. Louis reports difficulty maintaining a balanced diet after the closure of the only nearby grocery store. They rely on fixed income benefits and have limited mobility due to chronic illness. Meals on Wheels provides partial support but does not fully meet dietary needs. The client reports increased fatigue and weight loss over the past several months. Family support is limited due to geographic separation."
    },

    {
      id: 3,
      text:
        "A single-parent household in Kansas City experiences inconsistent access to fresh food due to unpredictable work hours and limited childcare options. The parent reports reliance on fast food due to time constraints and affordability. Nutritional education resources are available but have not been accessed due to scheduling barriers. Children in the household show early signs of dietary imbalance. The household recently applied for SNAP benefits."
    },

    {
      id: 4,
      text:
        "A migrant farmworker community in Missouri reports seasonal food insecurity during off-harvest months. Access to culturally appropriate foods is limited in local stores. Community members rely heavily on bulk purchasing and shared resources. Transportation to urban grocery centers is inconsistent. Nutritional intake decreases significantly during winter months."
    },

    {
      id: 5,
      text:
        "A suburban Missouri neighborhood experiences a growing disparity in food access following the relocation of a major supermarket chain. Residents report increased reliance on convenience stores and vending machines. Fresh produce availability has declined significantly. Community health workers note rising rates of diet-related chronic conditions. Local advocacy groups are beginning to organize food access interventions."
    }
  ],

  questions: [
    {
      question:
        "What best describes a structural food desert in Missouri communities?",

      correctAnswer:
        "A geographic area with limited access to affordable, nutrient-dense food options due to systemic distribution barriers",

      distractors: globalDistractorPool
    },

    {
      question:
        "Which intervention most effectively improves long-term food security in underserved Missouri populations?",

      correctAnswer:
        "Community-based food access programs combined with transportation and nutrition education support",

      distractors: globalDistractorPool
    }
  ]
};

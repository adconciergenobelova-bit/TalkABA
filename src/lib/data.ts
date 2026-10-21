export type CeuType = "BACB Learning" | "BACB Ethics" | "BACB Supervision" | "ASHA" | "APA";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  free?: boolean;
  kind: "video" | "reading" | "activity" | "quiz";
}

export interface Module {
  id: string;
  title: string;
  blurb: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  ceus: number;
  ceuTypes: CeuType[];
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  learners: number;
  level: "Foundations" | "Intermediate" | "Advanced";
  hours: number;
  lessonsCount: number;
  format: "On-Demand" | "Live Cohort" | "Blended";
  image: string;
  color: string;
  deep: string;
  soft: string;
  tags: string[];
  outcomes: string[];
  modules: Module[];
  quiz: QuizQuestion[];
  instructorId: string;
  featured?: boolean;
  bestseller?: boolean;
  new?: boolean;
  bacbEvent?: string;
}

export interface Instructor {
  id: string;
  name: string;
  creds: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
  color: string;
  specialties: string[];
  courses: number | string[];
  learners: number;
  rating: number;
}

export const instructors: Instructor[] = [
  {
    id: "nene-frey",
    name: "Nene Frey",
    creds: "M.A., BCBA",
    role: "Co-Founder, Talk ABA with Nene and Helen",
    bio: "Over 15 years she has pioneered assent-based, joy-first intervention models. Specializing in the legal and regulatory pathways for CEU certification, Nene bridges the gap between clinical practice and compliance — ensuring every learner gets credit they deserve under QABA and IBAO frameworks.",
    image: "/images/instructor-3.jpg",
    initials: "NF",
    color: "#E14E40",
    specialties: ["Legal CEUs", "QABA Pathway", "IBAO Compliance", "BACB ACE Provider"],
    courses: ["assent-dignity-ethics", "supervising-with-heart"],
    learners: 2840,
    rating: 4.9,
  },
  {
    id: "helen-patel",
    name: "Helen Patel",
    creds: "J.D., BCBA",
    role: "Co-Founder, Talk ABA with Nene and Helen",
    bio: "Attorney and Board-Certified Behavior Analyst, Helen brings deep knowledge of the legal side of the ABA world. She guides clinicians through QABA and IBAO certification pathways and ensures every CEU activity meets rigorous legal and ethical standards.",
    image: "/images/instructor-4.jpg",
    initials: "HP",
    color: "#7C6FF0",
    specialties: ["Legal Ethics", "QABA Certification", "IBAO Pathway", "BACB Compliance"],
    courses: ["assent-dignity-ethics", "supervising-with-heart", "pfa-interview-informed"],
    learners: 3120,
    rating: 4.8,
  },
];

export const courses: Course[] = [
  {
    id: "todays-aba-foundations",
    slug: "todays-aba-foundations",
    title: "Today's ABA Foundations: From Compliance to Compassion",
    tagline: "The paradigm shift every modern clinician needs — safety, rapport, and joy before demands.",
    category: "Today's ABA Core",
    ceus: 3.5,
    ceuTypes: ["BACB Learning", "ASHA"],
    price: 129,
    compareAt: 159,
    rating: 4.9,
    reviews: 1284,
    learners: 12480,
    level: "Foundations",
    hours: 3.5,
    lessonsCount: 18,
    format: "On-Demand",
    image: "/images/hero-play.jpg",
    color: "#FF6B5B",
    deep: "#E14E40",
    soft: "#FFE3DC",
    tags: ["Assent", "Rapport", "Trauma-Informed", "Start Here"],
    outcomes: [
      "Contrast historical compliance-based ABA with today's assent-based, trauma-informed practice",
      "Build a Happy–Relaxed–Engaged (HRE) context before placing a single demand",
      "Recognize and immediately honor assent withdrawal at any moment",
      "Design trust-first session plans families actually want to attend",
      "Explain the shift to families, funders, and skeptical colleagues with confidence",
    ],
    modules: [
      {
        id: "m1",
        title: "Why ABA Had to Change",
        blurb: "Listening to autistic voices and the data that demanded a kinder science.",
        lessons: [
          { id: "m1l1", title: "Welcome: A More Perfect ABA", minutes: 8, free: true, kind: "video" },
          { id: "m1l2", title: "What Autistic Adults Want You to Know", minutes: 22, kind: "video" },
          { id: "m1l3", title: "Compliance vs. Cooperation: Reading", minutes: 14, kind: "reading" },
          { id: "m1l4", title: "Reflection: Your ABA Story", minutes: 10, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Safety, Rapport & the HRE Learner",
        blurb: "Enrichment, child-led play, and reading the learner's joy signals.",
        lessons: [
          { id: "m2l1", title: "Learn by Listening: The Opening Conversation", minutes: 18, kind: "video" },
          { id: "m2l2", title: "Learn by Creating Joy: Enrichment Masterclass", minutes: 26, kind: "video" },
          { id: "m2l3", title: "What HRE Looks Like (Video Library)", minutes: 20, kind: "video" },
          { id: "m2l4", title: "Design Your HRE Space", minutes: 15, kind: "activity" },
        ],
      },
      {
        id: "m3",
        title: "Assent in Action",
        blurb: "From empowerment to teaching — without ever working through tears.",
        lessons: [
          { id: "m3l1", title: "Learn by Empowering", minutes: 24, kind: "video" },
          { id: "m3l2", title: "The 3-Second Rule: Honoring Withdrawal", minutes: 16, kind: "video" },
          { id: "m3l3", title: "Learn While Teaching: Skills That Matter", minutes: 22, kind: "video" },
          { id: "m3l4", title: "Final Quiz & CEU Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "What is the FIRST priority when starting therapy with a new autistic learner in Today's ABA?",
        options: ["Running baseline probes to find deficits", "Creating a safe context where the learner is happy, relaxed, and engaged", "Teaching compliance with simple instructions", "Completing a standardized developmental assessment"],
        answer: 1,
        explain: "Today's ABA starts with safety and rapport. Demands and assessment wait until the learner is happy, relaxed, and engaged — trust first, teaching second.",
      },
      {
        q: "A learner shows distress when you signal a transition to a work area. What should you do?",
        options: ["Prompt through it to build tolerance", "Acknowledge it immediately and let them return to their preferred context", "Offer a token for completing the transition", "Ignore it and redirect"],
        answer: 1,
        explain: "Any sign of distress or protest is honored immediately. Relent, restore HRE, and repeat — this is how empowerment and trust are built.",
      },
      {
        q: "Which best describes 'assent' in behavioral treatment?",
        options: ["A signed consent form from a guardian", "Ongoing agreement communicated through words and behavior that can be withdrawn at any time", "Compliance with 80% of instructions", "Agreeing to a behavior plan once per year"],
        answer: 1,
        explain: "Assent is continuous, observable, and revocable — the learner votes with their feet, voice, and affect in every moment.",
      },
      {
        q: "Why is Today's ABA described as trauma-informed?",
        options: ["It avoids all challenging tasks forever", "It assumes learners may carry trauma histories and prioritizes safety, choice, and trust", "It only serves learners with PTSD diagnoses", "It replaces behavior analysis with talk therapy"],
        answer: 1,
        explain: "By enriching contexts, following the learner's lead, never coercing through distress, and making decisions from performance — the process itself avoids re-traumatization.",
      },
      {
        q: "'Vote with their feet' means:",
        options: ["Learners earn foot-sticker tokens", "Keeping the door open so leaving signals something is missing or aversive", "Data on elopement frequency", "A gross-motor assessment"],
        answer: 1,
        explain: "Freedom to leave is both dignifying and informative — it tells you exactly when your context needs revision.",
      },
    ],
    instructorId: "nene-frey",
    featured: true,
    bestseller: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-101",
  },
  {
    id: "pfa-interview-informed",
    slug: "pfa-interview-informed",
    title: "Practical Functional Assessment: The Interview-Informed Process",
    tagline: "Understand problem behavior before treating it — safe, fast, and televisable assessment.",
    category: "PFA & SBT",
    ceus: 5,
    ceuTypes: ["BACB Learning"],
    price: 189,
    compareAt: 229,
    rating: 5.0,
    reviews: 862,
    learners: 7310,
    level: "Intermediate",
    hours: 5,
    lessonsCount: 22,
    format: "On-Demand",
    image: "/images/joy-learning.jpg",
    color: "#0EA58C",
    deep: "#0B7C69",
    soft: "#D7F3E5",
    tags: ["Functional Assessment", "IISCA", "Safety", "Open-Ended Interview"],
    outcomes: [
      "Conduct an open-ended interview that families describe as the best conversation they've had about their child",
      "Design an interview-informed synthesized contingency analysis (IISCA) safely",
      "Identify synthesized establishing operations driving severe problem behavior",
      "Write PFA reports funders approve and families understand",
      "Transition PFA findings directly into a Skills-Based Treatment plan",
    ],
    modules: [
      {
        id: "m1",
        title: "The Open-Ended Interview",
        blurb: "Questions that reveal loves, hates, and the story behind behavior.",
        lessons: [
          { id: "m1l1", title: "Why Open-Ended Beats Checklists", minutes: 16, free: true, kind: "video" },
          { id: "m1l2", title: "The 15 Questions (Annotated Demo)", minutes: 34, kind: "video" },
          { id: "m1l3", title: "Interview Practice Lab", minutes: 20, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Designing the IISCA",
        blurb: "Synthesizing contingencies safely and ethically.",
        lessons: [
          { id: "m2l1", title: "From Interview to Hypothesis", minutes: 22, kind: "video" },
          { id: "m2l2", title: "Safety-First Analysis Design", minutes: 28, kind: "video" },
          { id: "m2l3", title: "Televisibility: Would You Show This on TV?", minutes: 15, kind: "reading" },
        ],
      },
      {
        id: "m3",
        title: "From Analysis to Action",
        blurb: "Interpreting results and launching treatment.",
        lessons: [
          { id: "m3l1", title: "Reading IISCA Data", minutes: 24, kind: "video" },
          { id: "m3l2", title: "Writing the PFA Report", minutes: 18, kind: "activity" },
          { id: "m3l3", title: "Final Quiz & CEU Certificate", minutes: 25, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "What is the primary purpose of the open-ended interview in PFA?",
        options: ["To diagnose the learner", "To learn about the learner's preferences, contexts, and the conditions around problem behavior from people who know them", "To train parents on extinction", "To complete insurance paperwork faster"],
        answer: 1,
        explain: "The interview centers voices of those who know and love the learner — revealing loves, aversions, and evocative contexts no checklist can capture.",
      },
      {
        q: "What makes an IISCA different from a traditional functional analysis?",
        options: ["It tests isolated contingencies one at a time", "It synthesizes the multiple, combined contingencies reported in the interview into one test condition", "It skips the control condition", "It requires no safety planning"],
        answer: 1,
        explain: "Real life doesn't isolate variables — the IISCA tests the synthesized establishing operation (e.g., denied access + demands + removed attention) together.",
      },
      {
        q: "'Televisible' means the assessment process should be:",
        options: ["Recorded on broadcast TV", "Safe, dignified, and transparent enough that you'd be comfortable if anyone watched it", "Conducted over telehealth only", "Hidden from families for validity"],
        answer: 1,
        explain: "Televisibility is an ethical test: if you'd flinch at a family watching, redesign the procedure.",
      },
      {
        q: "What must be true before evoking problem behavior in an analysis?",
        options: ["Nothing — behavior must be evoked quickly", "A safe, enriched HRE context exists to return to, and safety procedures are in place", "The learner must be deprived for 24 hours", "Parents must leave the building"],
        answer: 1,
        explain: "Safety first: enriched return contexts, clear termination criteria, and trained implementers are non-negotiable.",
      },
      {
        q: "The direct output of a PFA is:",
        options: ["A list of topographies to extinguish", "An understanding of the synthesized contingencies maintaining behavior, ready to inform SBT", "A medication recommendation", "A school placement decision"],
        answer: 1,
        explain: "PFA answers 'why' — understanding first — so treatment (SBT) can teach replacement skills under the same motivating conditions.",
      },
    ],
    instructorId: "helen-patel",
    featured: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-201",
  },
  {
    id: "sbt-skills-based-treatment",
    slug: "sbt-skills-based-treatment",
    title: "Skills-Based Treatment: Communication, Toleration & Cooperation",
    tagline: "Teach the skills that set learners free — paced by joy, never by tears.",
    category: "PFA & SBT",
    ceus: 5,
    ceuTypes: ["BACB Learning"],
    price: 189,
    rating: 4.9,
    reviews: 743,
    learners: 6890,
    level: "Advanced",
    hours: 5,
    lessonsCount: 24,
    format: "On-Demand",
    image: "/images/play-home.jpg",
    color: "#7C6FF0",
    deep: "#5B4ED6",
    soft: "#E4E0FF",
    tags: ["FCT", "Delay Tolerance", "CABs", "Treatment"],
    outcomes: [
      "Teach functional communication responses that replace severe problem behavior",
      "Shape delay and denial tolerance without extinguishing hope",
      "Build contextually appropriate behavior (CABs) across home, school, and community",
      "Progress treatment using learner performance — adjusting in the moment, not at the team meeting",
      "Generalize and maintain gains with families as co-therapists",
    ],
    modules: [
      {
        id: "m1",
        title: "Functional Communication First",
        blurb: "Replacing behavior with a voice that works everywhere.",
        lessons: [
          { id: "m1l1", title: "Choosing the FCR", minutes: 18, free: true, kind: "video" },
          { id: "m1l2", title: "Teaching the FCR Under EO", minutes: 26, kind: "video" },
          { id: "m1l3", title: "When the FCR Doesn't Work: Troubleshooting", minutes: 20, kind: "video" },
        ],
      },
      {
        id: "m2",
        title: "Toleration & Cooperation",
        blurb: "Stretching delays and demands at the learner's pace.",
        lessons: [
          { id: "m2l1", title: "Delay Tolerance Without Despair", minutes: 28, kind: "video" },
          { id: "m2l2", title: "Denial Tolerance: Teaching 'No' Safely", minutes: 24, kind: "video" },
          { id: "m2l3", title: "CABs: Cooperation That Looks Like Childhood", minutes: 22, kind: "video" },
        ],
      },
      {
        id: "m3",
        title: "Generalize & Graduate",
        blurb: "Taking skills into real life — and knowing when you're done.",
        lessons: [
          { id: "m3l1", title: "Chaining Contexts: Home → School → Community", minutes: 20, kind: "video" },
          { id: "m3l2", title: "Relapse Prevention & Booster Plans", minutes: 16, kind: "reading" },
          { id: "m3l3", title: "Final Quiz & CEU Certificate", minutes: 25, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "In SBT, the functional communication response (FCR) is first taught:",
        options: ["In isolation with flashcards", "Under the same establishing operation that evoked problem behavior, with immediate reinforcement", "Only after problem behavior is extinguished", "Through punishment of the problem behavior"],
        answer: 1,
        explain: "The FCR must work where it matters — under the real EO — and work every time at first, so the learner trusts their new voice.",
      },
      {
        q: "How should treatment progression decisions be made?",
        options: ["By the calendar — advance weekly", "By learner performance in the moment", "By funder authorization windows", "By supervisor preference"],
        answer: 1,
        explain: "The learner's behavior is the compass. Progress, pause, or back up based on what you see now — not at next week's meeting.",
      },
      {
        q: "Problem behavior returns during a delay trial. Best response?",
        options: ["Push through to teach persistence", "Honor the communication, reinforce, and shorten the next delay — adjust immediately", "End treatment entirely", "Remove all reinforcement for a week"],
        answer: 1,
        explain: "Resurgence is information, not defiance. Adjust the challenge to match current capacity and protect trust.",
      },
      {
        q: "What are CABs in the SBT model?",
        options: ["Crisis behavior protocols", "Contextually Appropriate Behaviors — the cooperation skills that let learners thrive in real routines", "Certified ABA credentials", "Computer-assisted blockers"],
        answer: 1,
        explain: "CABs are the payoff: participating in circle time, waiting in line, doing homework — childhood, reclaimed.",
      },
      {
        q: "The ultimate goal of SBT is:",
        options: ["Zero problem behavior at any cost", "A joyous lifestyle with communication, toleration, and cooperation skills valued by the learner and family", "Discharge in under 6 months", "Full-time mainstream placement"],
        answer: 1,
        explain: "SBT aims at lives, not just data paths — skills the learner and family genuinely value, generalized everywhere.",
      },
    ],
    instructorId: "nene-frey",
    bestseller: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-202",
  },
  {
    id: "assent-dignity-ethics",
    slug: "assent-dignity-ethics",
    title: "Assent, Dignity & Trauma-Informed Care",
    tagline: "Meet your ethics requirement while transforming how you see every learner. (2 Ethics CEUs)",
    category: "Ethics & Assent",
    ceus: 2,
    ceuTypes: ["BACB Ethics"],
    price: 89,
    rating: 4.9,
    reviews: 1102,
    learners: 9870,
    level: "Foundations",
    hours: 2,
    lessonsCount: 12,
    format: "On-Demand",
    image: "/images/family-coaching.jpg",
    color: "#0EA58C",
    deep: "#0B7C69",
    soft: "#D7F3E5",
    tags: ["Ethics CEUs", "Assent", "Core Principles", "Required"],
    outcomes: [
      "Apply BACB Core Principles (benefit others, treat with compassion, dignity, respect) to daily decisions",
      "Obtain and monitor assent continuously — and document it defensibly",
      "Recognize trauma responses vs. 'noncompliance'",
      "Navigate assent withdrawal mid-session with a clear protocol",
      "Align behavior plans with client dignity from goals to discharge",
    ],
    modules: [
      {
        id: "m1",
        title: "Ethics Beyond the Code Book",
        blurb: "Core principles as a living practice, not a checkbox.",
        lessons: [
          { id: "m1l1", title: "The Four Core Principles in Real Life", minutes: 20, free: true, kind: "video" },
          { id: "m1l2", title: "Dignity Audits for Behavior Plans", minutes: 18, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Assent: The Continuous Conversation",
        blurb: "From first hello to discharge — assent never expires.",
        lessons: [
          { id: "m2l1", title: "Assent vs. Consent vs. Compliance", minutes: 22, kind: "video" },
          { id: "m2l2", title: "The Withdrawal Protocol", minutes: 20, kind: "video" },
          { id: "m2l3", title: "Final Quiz & Ethics Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "Which BACB Core Principle most directly supports assent-based practice?",
        options: ["Behave with integrity", "Treat others with compassion, dignity, and respect", "Behave in a culturally responsive manner", "All Core Principles together"],
        answer: 3,
        explain: "Assent-based practice weaves all four principles together — benefiting others, integrity, compassion/dignity/respect, and cultural responsiveness.",
      },
      {
        q: "A non-speaking learner pushes materials away and turns their body. This is:",
        options: ["Noncompliance to be worked through", "Communication — likely assent withdrawal — to be honored", "Attention-seeking behavior", "A skill deficit in tolerance"],
        answer: 1,
        explain: "All behavior communicates. Turning away and pushing materials are classic withdrawal signals — honor first, analyze second.",
      },
      {
        q: "Trauma-informed ABA assumes:",
        options: ["Only diagnosed learners need gentleness", "Learners in our care have likely experienced adverse events, so safety and choice are universal", "We should avoid all demands permanently", "BCBAs should provide trauma therapy"],
        answer: 1,
        explain: "Universal precautions for dignity: assume trauma histories, prioritize safety, rapport, and agency for everyone.",
      },
      {
        q: "Proper documentation of assent should show:",
        options: ["A single signed form per year", "Ongoing monitoring, withdrawal events honored, and plan adjustments made", "100% compliance data", "Parent satisfaction scores only"],
        answer: 1,
        explain: "Assent is continuous — document the ongoing conversation, not a one-time signature.",
      },
    ],
    instructorId: "helen-patel",
    featured: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-301 (Ethics)",
  },
  {
    id: "play-first-naturalistic",
    slug: "play-first-naturalistic",
    title: "Play First: Naturalistic Teaching for Early Learners",
    tagline: "The signature Talk ABA approach — turn every giggle into a learning opportunity.",
    category: "Communication & Play",
    ceus: 3,
    ceuTypes: ["BACB Learning", "ASHA"],
    price: 119,
    compareAt: 149,
    rating: 4.9,
    reviews: 934,
    learners: 8120,
    level: "Foundations",
    hours: 3,
    lessonsCount: 16,
    format: "On-Demand",
    image: "/images/course-speech.jpg",
    color: "#FFC93C",
    deep: "#E0A81A",
    soft: "#FFF0C4",
    tags: ["NET", "Early Intervention", "Play", "Toddlers"],
    outcomes: [
      "Follow a child's lead while embedding powerful teaching moments",
      "Use naturalistic strategies (modeling, mand-model, time delay) in play",
      "Pair yourself with reinforcement until you're the favorite toy",
      "Coach parents to be play partners, not drill sergeants",
      "Measure progress without killing the fun",
    ],
    modules: [
      {
        id: "m1",
        title: "The Play-First Mindset",
        blurb: "Why joy is the fastest route to learning.",
        lessons: [
          { id: "m1l1", title: "Therapy That Feels Like Play", minutes: 14, free: true, kind: "video" },
          { id: "m1l2", title: "Pairing: Becoming the Reinforcer", minutes: 20, kind: "video" },
          { id: "m1l3", title: " Toy Audit Activity", minutes: 12, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Teaching Inside Play",
        blurb: "Naturalistic strategies that don't interrupt the fun.",
        lessons: [
          { id: "m2l1", title: "Mand-Model & Time Delay", minutes: 24, kind: "video" },
          { id: "m2l2", title: "Expanding Language in the Moment", minutes: 22, kind: "video" },
          { id: "m2l3", title: "Final Quiz & CEU Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "What does 'pairing' mean in early intervention?",
        options: ["Matching two identical toys", "Associating yourself with fun and reinforcement so the child seeks you out", "Pairing two therapists per child", "A data collection method"],
        answer: 1,
        explain: "Pairing makes YOU the reinforcer — the child should light up when you arrive, before any demand is ever placed.",
      },
      {
        q: "A child is spinning a car wheel. Best naturalistic response?",
        options: ["Block it and redirect to functional play", "Join in, imitate, then expand — spin together, add sounds, offer choices", "Remove all cars", "Begin discrete trials at the table"],
        answer: 1,
        explain: "Join first, then gently expand. Shared joy opens the door to new play and language.",
      },
      {
        q: "Naturalistic teaching differs from DTT mainly in that:",
        options: ["It uses no reinforcement", "Teaching follows the child's motivation within natural routines and play", "It never collects data", "It only works for older learners"],
        answer: 1,
        explain: "NET harnesses intrinsic motivation in real contexts — learning sticks because it's meaningful.",
      },
      {
        q: "Parents should be coached to:",
        options: ["Run 40 trials per day at the table", "Embed playful language opportunities into daily routines", "Withhold all preferred items", "Avoid playing to prevent dependence"],
        answer: 1,
        explain: "Routines are the curriculum — snack, bath, and bedtime beat flashcards every time.",
      },
    ],
    instructorId: "nene-frey",
    new: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-401",
  },
  {
    id: "speech-aba-collaboration",
    slug: "speech-aba-collaboration",
    title: "Speech + ABA Collaboration: Building Total Communicators",
    tagline: "End the turf wars. SLPs and BCBAs building one plan, one team, one voice. (BACB + ASHA)",
    category: "Communication & Play",
    ceus: 2.5,
    ceuTypes: ["BACB Learning", "ASHA"],
    price: 109,
    rating: 4.8,
    reviews: 521,
    learners: 4340,
    level: "Intermediate",
    hours: 2.5,
    lessonsCount: 14,
    format: "On-Demand",
    image: "/images/joy-learning.jpg",
    color: "#3EA6FF",
    deep: "#2B7FD4",
    soft: "#DCEEFF",
    tags: ["SLP", "Interdisciplinary", "AAC", "Language"],
    outcomes: [
      "Write shared goals both disciplines can target and measure",
      "Support multimodal communication (speech, sign, AAC) without hierarchy",
      "Run joint sessions where SLP and ABA strategies amplify each other",
      "Resolve scope-of-practice tensions with collaborative frameworks",
      "Document co-treatment for funders and schools",
    ],
    modules: [
      {
        id: "m1",
        title: "One Child, One Team",
        blurb: "Frameworks for genuine collaboration.",
        lessons: [
          { id: "m1l1", title: "Why Collaboration Fails (and How to Fix It)", minutes: 18, free: true, kind: "video" },
          { id: "m1l2", title: "Shared Goals Workshop", minutes: 22, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Total Communication in Practice",
        blurb: "AAC, sign, speech — all voices honored.",
        lessons: [
          { id: "m2l1", title: "Multimodal Communication Deep-Dive", minutes: 26, kind: "video" },
          { id: "m2l2", title: "Joint Session Masterclass", minutes: 24, kind: "video" },
          { id: "m2l3", title: "Final Quiz & CEU Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "'Total communicator' means a learner who:",
        options: ["Uses speech exclusively", "Communicates effectively using any and all modalities — speech, AAC, sign, gestures", "Scores average on language tests", "Needs no communication support"],
        answer: 1,
        explain: "No modality hierarchy — the best communication is the communication that works for the learner right now.",
      },
      {
        q: "Best practice for SLP–BCBA shared goals:",
        options: ["Each discipline writes separate goals secretly", "One measurable goal both disciplines target with their unique strategies", "Only the SLP targets communication", "Only the BCBA targets behavior"],
        answer: 1,
        explain: "Shared, measurable goals with complementary strategies — communication IS behavior.",
      },
      {
        q: "Introducing AAC will:",
        options: ["Prevent speech development", "Support language growth and reduce frustration — it does not block speech", "Only work for adults", "Replace the need for therapy"],
        answer: 1,
        explain: "Decades of research: AAC supports spoken language development while giving learners a voice today.",
      },
    ],
    instructorId: "nene-frey",
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-402",
  },
  {
    id: "supervising-with-heart",
    slug: "supervising-with-heart",
    title: "Supervising with Heart: Compassionate Supervision & Mentorship",
    tagline: "Grow RBTs and trainees who love the field — and meet your supervision CEU requirement.",
    category: "Supervision & Leadership",
    ceus: 2,
    ceuTypes: ["BACB Supervision"],
    price: 89,
    rating: 4.8,
    reviews: 689,
    learners: 5620,
    level: "Intermediate",
    hours: 2,
    lessonsCount: 11,
    format: "On-Demand",
    image: "/images/family-coaching.jpg",
    color: "#7C6FF0",
    deep: "#5B4ED6",
    soft: "#E4E0FF",
    tags: ["Supervision CEUs", "RBT", "Mentorship", "Leadership"],
    outcomes: [
      "Apply the BACB supervision requirements with warmth and structure",
      "Give feedback RBTs actually implement (and thank you for)",
      "Build competency-based training plans that respect adult learners",
      "Navigate difficult supervision conversations with compassion",
      "Prevent burnout — yours and your team's",
    ],
    modules: [
      {
        id: "m1",
        title: "The Heart-Led Supervisor",
        blurb: "Structure plus warmth equals growth.",
        lessons: [
          { id: "m1l1", title: "Beyond Compliance Supervision", minutes: 16, free: true, kind: "video" },
          { id: "m1l2", title: "Feedback That Lands", minutes: 22, kind: "video" },
        ],
      },
      {
        id: "m2",
        title: "Systems That Sustain",
        blurb: "Competency tracks, hard conversations, and burnout shields.",
        lessons: [
          { id: "m2l1", title: "Competency-Based Training Plans", minutes: 20, kind: "video" },
          { id: "m2l2", title: "Hard Conversations, Soft Landings", minutes: 18, kind: "video" },
          { id: "m2l3", title: "Final Quiz & Supervision Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "Effective supervision feedback should be:",
        options: ["Saved up for annual reviews", "Specific, behavior-focused, timely, and paired with support", "Only positive to avoid hurt feelings", "Delivered only in writing"],
        answer: 1,
        explain: "Timely, specific, behavior-focused feedback with a clear path forward — kindness AND clarity.",
      },
      {
        q: "Competency-based training means:",
        options: ["Hours logged equal competence", "Demonstrated skills in practice determine readiness, not seat time", "Only supervisors need competencies", "Online quizzes are sufficient"],
        answer: 1,
        explain: "Show me, don't tell me — competence is demonstrated with real learners under observation.",
      },
      {
        q: "A supervisee seems burned out. First step?",
        options: ["Assign more hours to build stamina", "Listen with empathy, assess workload, and problem-solve together", "Terminate the supervision", "Ignore it — burnout is normal"],
        answer: 1,
        explain: "Supervisors protect the workforce. Listen first, then adjust systems — starting with your own expectations.",
      },
    ],
    instructorId: "helen-patel",
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-501 (Supervision)",
  },
  {
    id: "family-partnership-coaching",
    slug: "family-partnership-coaching",
    title: "Partnering with Families: Caregiver Coaching That Sticks",
    tagline: "From homework battles to confident co-therapists — coaching families love.",
    category: "Supervision & Leadership",
    ceus: 2,
    ceuTypes: ["BACB Learning", "ASHA"],
    price: 99,
    rating: 4.9,
    reviews: 477,
    learners: 3980,
    level: "Intermediate",
    hours: 2,
    lessonsCount: 12,
    format: "On-Demand",
    image: "/images/play-home.jpg",
    color: "#FF6B5B",
    deep: "#E14E40",
    soft: "#FFE3DC",
    tags: ["Caregiver Training", "Family", "Coaching", "Generalization"],
    outcomes: [
      "Shift from 'parent training' to true family partnership",
      "Coach in the moment with the Tell–Show–Try–Cheer model",
      "Adapt coaching to family culture, capacity, and chaos (lovingly)",
      "Handle resistance and fatigue without judgment",
      "Measure caregiver implementation and celebrate wins",
    ],
    modules: [
      {
        id: "m1",
        title: "Partnership Mindset",
        blurb: "Families as experts on their own children.",
        lessons: [
          { id: "m1l1", title: "Training vs. Partnership", minutes: 15, free: true, kind: "video" },
          { id: "m1l2", title: "Cultural Humility in Coaching", minutes: 20, kind: "video" },
        ],
      },
      {
        id: "m2",
        title: "Coaching in Action",
        blurb: "Live models, real homes, lasting change.",
        lessons: [
          { id: "m2l1", title: "Tell–Show–Try–Cheer", minutes: 24, kind: "video" },
          { id: "m2l2", title: "When Coaching Gets Hard", minutes: 20, kind: "video" },
          { id: "m2l3", title: "Final Quiz & CEU Certificate", minutes: 20, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "The partnership model views caregivers as:",
        options: ["Untrained staff to direct", "Experts on their child and equal partners in treatment", "Barriers to progress", "Passive observers"],
        answer: 1,
        explain: "Families know their child best. Our job is to add tools to their expertise — not replace it.",
      },
      {
        q: "Tell–Show–Try–Cheer is:",
        options: ["A cheerleading routine", "A coaching cycle: explain, model, practice together, celebrate", "A data system", "A punishment hierarchy"],
        answer: 1,
        explain: "Explain briefly, model it, practice together with support, then celebrate — every coaching moment follows the rhythm.",
      },
      {
        q: "A family stops implementing strategies. Best first response?",
        options: ["Discharge for noncompliance", "Curiously explore barriers — time, fit, confidence — and redesign together", "Double the homework", "Report to the funder immediately"],
        answer: 1,
        explain: "Non-implementation is feedback about OUR plan's fit. Redesign with the family, not against them.",
      },
    ],
    instructorId: "helen-patel",
    new: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-502",
  },
  {
    id: "immersion-cohort",
    slug: "immersion-cohort",
    title: "Today's ABA Immersion Cohort (Live, 6 Weeks)",
    tagline: "Small-group live training with case consultation, role-plays, and a capstone. Our flagship.",
    category: "Today's ABA Core",
    ceus: 12,
    ceuTypes: ["BACB Learning", "BACB Ethics", "BACB Supervision"],
    price: 349,
    compareAt: 429,
    rating: 5.0,
    reviews: 214,
    learners: 1860,
    level: "Advanced",
    hours: 12,
    lessonsCount: 30,
    format: "Live Cohort",
    image: "/images/hero-play.jpg",
    color: "#0EA58C",
    deep: "#0B7C69",
    soft: "#D7F3E5",
    tags: ["Live", "Cohort", "Capstone", "Consultation"],
    outcomes: [
      "Run a complete PFA→SBT case from interview to generalization with live mentorship",
      "Practice assent-honoring decisions in role-plays with expert feedback",
      "Present a capstone case to your cohort and earn a Verified Practitioner badge",
      "Build a professional network of compassion-driven clinicians",
      "Earn 12 CEUs including Ethics + Supervision coverage",
    ],
    modules: [
      {
        id: "m1",
        title: "Weeks 1–2: Foundations Live",
        blurb: "Live workshops + your first HRE design.",
        lessons: [
          { id: "m1l1", title: "Live Workshop: The Trust-First Session", minutes: 90, free: true, kind: "video" },
          { id: "m1l2", title: "Case Match & Cohort Kickoff", minutes: 60, kind: "activity" },
        ],
      },
      {
        id: "m2",
        title: "Weeks 3–4: PFA→SBT Practicum",
        blurb: "Real cases, role-plays, expert feedback.",
        lessons: [
          { id: "m2l1", title: "Live Practicum: Interview to IISCA", minutes: 90, kind: "video" },
          { id: "m2l2", title: "Live Practicum: FCR to CABs", minutes: 90, kind: "video" },
        ],
      },
      {
        id: "m3",
        title: "Weeks 5–6: Capstone & Celebration",
        blurb: "Present, reflect, and graduate.",
        lessons: [
          { id: "m3l1", title: "Capstone Presentations", minutes: 90, kind: "activity" },
          { id: "m3l2", title: "Capstone Quiz & 12-CEU Certificate", minutes: 30, kind: "quiz" },
        ],
      },
    ],
    quiz: [
      {
        q: "The Immersion capstone requires demonstrating:",
        options: ["Perfect data sheets", "A complete trust-first case arc from rapport through generalization, honoring assent throughout", "A published paper", "100 supervision hours"],
        answer: 1,
        explain: "Your capstone tells a story: how safety, listening, and skill-building changed a learner's trajectory.",
      },
      {
        q: "Cohort learning's biggest advantage for Today's ABA is:",
        options: ["It's cheaper", "Practicing relational skills live with feedback — you can't learn trust from slides alone", "It's faster", "It requires no homework"],
        answer: 1,
        explain: "Today's ABA is profoundly relational. Live practice with coaching builds the judgment no recording can.",
      },
    ],
    instructorId: "nene-frey",
    featured: true,
    bacbEvent: "BACB ACE Provider OP-24-1107 · Event #TAA-900 (Live)",
  },
];

export interface Path {
  id: string;
  title: string;
  blurb: string;
  courseIds: string[];
  totalCeus: number;
  price: number;
  compareAt: number;
  color: string;
  deep: string;
  soft: string;
  icon: string;
  level: string;
}

export const paths: Path[] = [
  {
    id: "start-here",
    title: "New to Today's ABA",
    blurb: "The perfect on-ramp: compassion-first foundations, play-based teaching, and ethics — everything a newcomer needs.",
    courseIds: ["todays-aba-foundations", "play-first-naturalistic", "assent-dignity-ethics"],
    totalCeus: 8.5,
    price: 279,
    compareAt: 337,
    color: "#FF6B5B",
    deep: "#E14E40",
    soft: "#FFE3DC",
    icon: "Sprout",
    level: "Foundations",
  },
  {
    id: "pfa-sbt-practitioner",
    title: "PFA & SBT Practitioner",
    blurb: "From interview to independence: master the full assessment-to-treatment arc with mentored depth.",
    courseIds: ["todays-aba-foundations", "pfa-interview-informed", "sbt-skills-based-treatment"],
    totalCeus: 13.5,
    price: 429,
    compareAt: 507,
    color: "#0EA58C",
    deep: "#0B7C69",
    soft: "#D7F3E5",
    icon: "Compass",
    level: "Intermediate → Advanced",
  },
  {
    id: "renewal-bundle",
    title: "Ethics + Supervision Renewal",
    blurb: "Knock out your BACB Ethics and Supervision requirements in one joyful weekend — plus caregiver coaching.",
    courseIds: ["assent-dignity-ethics", "supervising-with-heart", "family-partnership-coaching"],
    totalCeus: 6,
    price: 219,
    compareAt: 277,
    color: "#7C6FF0",
    deep: "#5B4ED6",
    soft: "#E4E0FF",
    icon: "BadgeCheck",
    level: "All Levels",
  },
];

export const testimonials = [
  {
    name: "Priya Natarajan",
    creds: "BCBA, Seattle WA",
    quote: "I cried during module 2 — in the best way. This is the ABA I always wanted to practice but didn't have words for. My RBTs are happier, my families stay, and my learners are thriving.",
    course: "Today's ABA Foundations",
    rating: 5,
    color: "#FF6B5B",
  },
  {
    name: "Marcus Bell",
    creds: "BCBA, Atlanta GA",
    quote: "The PFA course paid for itself in one week. I ran my first interview-informed assessment and the mom said it was the first time anyone truly listened. Funders approved in days.",
    course: "Practical Functional Assessment",
    rating: 5,
    color: "#0EA58C",
  },
  {
    name: "Elena Rodriguez",
    creds: "SLP-CCC, Fresno CA",
    quote: "Finally — training that treats SLPs and BCBAs as one team. The joint-session masterclass changed how our whole clinic writes goals. Worth every penny.",
    course: "Speech + ABA Collaboration",
    rating: 5,
    color: "#3EA6FF",
  },
  {
    name: "David Kim",
    creds: "BCBA, Chicago IL",
    quote: "I came for the Ethics CEUs and stayed for everything. The assent withdrawal protocol alone transformed my supervision. My trainees quote it constantly.",
    course: "Assent, Dignity & Trauma-Informed Care",
    rating: 5,
    color: "#7C6FF0",
  },
  {
    name: "Amara Osei",
    creds: "RBT → BCBA Candidate, Houston TX",
    quote: "The Immersion Cohort was the best professional decision I've made. Live role-plays, real feedback, and a capstone I'm genuinely proud of. I got hired before I even finished.",
    course: "Immersion Cohort",
    rating: 5,
    color: "#E0A81A",
  },
  {
    name: "Jenna Whitaker",
    creds: "BCBA, Portland OR",
    quote: "Caregiver coaching used to be my dread — now it's my favorite hour. Tell–Show–Try–Cheer works with every family, every culture, every chaos level.",
    course: "Partnering with Families",
    rating: 5,
    color: "#FF6B5B",
  },
];

export const faqs = [
  {
    q: "Are your courses BACB-approved for CEUs?",
    a: "Yes! Talk ABA Academy is a BACB Authorized Continuing Education (ACE) Provider. Every course page lists its event number and CEU breakdown (Learning, Ethics, Supervision). Certificates are issued instantly when you pass the final quiz at 80% or higher.",
  },
  {
    q: "Do you offer ASHA CEUs for SLPs?",
    a: "Selected courses — including Today's ABA Foundations, Play First, Speech + ABA Collaboration, and Partnering with Families — are registered for ASHA CEUs. Look for the ASHA badge on the course card.",
  },
  {
    q: "How do I earn my certificate?",
    a: "Enroll, complete all lessons, and pass the final quiz (80%+, unlimited retakes). Your personalized PDF certificate with verification ID is generated instantly and stored forever in your dashboard transcript.",
  },
  {
    q: "How long do I have access?",
    a: "Forever. On-demand courses never expire — including all future updates. Live cohorts include lifetime access to recordings plus 6 weeks of live sessions and consultation.",
  },
  {
    q: "What if I fail the quiz?",
    a: "No stress — retakes are unlimited and free, and every question includes a detailed explanation so you actually learn. We want mastery, not memorization.",
  },
  {
    q: "Can my whole team enroll? Do you offer group rates?",
    a: "Absolutely — clinics and school districts get 20% off for 5+ seats and 30% off for 15+, plus a team dashboard to track everyone's CEUs. Email teams@talkaba.academy and we'll set you up within a day.",
  },
  {
    q: "What is 'Today's ABA' and PFA/SBT?",
    a: "Today's ABA is the compassion-led evolution of our field: prioritizing safety, rapport, assent, and joy — teaching communication, toleration, and cooperation without coercion. PFA (Practical Functional Assessment) and SBT (Skills-Based Treatment) are the interview-informed assessment and treatment technologies at its heart. Our Philosophy page traces the full story.",
  },
  {
    q: "What's your refund policy?",
    a: "30-day, no-questions-asked happiness guarantee. If a course isn't for you, email us within 30 days for a full refund — and keep any downloaded resources.",
  },
];

export const liveEvents = [
  { date: "Oct 28, 2026", title: "Free Workshop: Your First HRE Session", time: "4pm PT · 1 hr · 1 free Learning CEU", seats: 214, color: "#FF6B5B" },
  { date: "Nov 10, 2026", title: "Immersion Cohort #14 Kickoff", time: "6 weeks · Tuesdays 4–6pm PT · 12 CEUs", seats: 18, color: "#0EA58C" },
  { date: "Nov 19, 2026", title: "Journal Club: Assent Research Roundup", time: "12pm PT · 1 hr · 1 free Ethics CEU", seats: 96, color: "#7C6FF0" },
];

export function instructorOf(id: string): Instructor {
  return instructors.find((i) => i.id === id)!;
}

export function courseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function formatMoney(n: number): string {
  return `$${n}`;
}
import founderDivyansh from "@/assets/founder-divyansh.jpeg";
import founderAditya from "@/assets/founder-aditya.jpeg";
import founderKrishnanshu from "@/assets/founder-krishnanshu.jpeg";

export type VisionLeader = {
  role: "CEO" | "CTO" | "CFO";
  name: string;
  question: string;
  answer: string;
  backgroundHeading: string;
  background: string;
  image?: string;
  characterImage?: string;
  initials: string;
  accent: string;
};

export const visionLeaders: VisionLeader[] = [
  {
    role: "CEO",
    name: "Divyansh Diwakar",
    question: "why i built wise chicky?",
    answer:
      "I built Wise Chicky so families can notice the quiet signals early, before shame, confusion, or delayed support turns childhood into survival.",
    backgroundHeading: "The wound that became the mission",
    background:
      "Add Divyansh's exact founder background here: his personal story, education, lived experience, and the moment that made early child mental-health screening non-negotiable.",
    image: founderDivyansh,
    initials: "DD",
    accent: "from-[#1DB954] via-[#6EE7A8] to-[#FFC107]",
  },
  {
    role: "CTO",
    name: "Aditya Pranjal",
    question: "why i joined wise chicky?",
    answer:
      "I joined Wise Chicky to turn care into a dependable system: fast, private, role-aware, and simple enough for every parent to trust from the first minute.",
    backgroundHeading: "The person behind the promise",
    background:
      "Add Aditya's background here: technical strengths, product-building history, AI or platform experience, and why he is responsible for the engineering spine of Wise Chicky.",
    image: founderAditya,
    initials: "AP",
    accent: "from-[#111111] via-[#3752FF] to-[#1DB954]",
  },
  {
    role: "CFO",
    name: "Krishnanshu Jha",
    question: "why i joined wise chicky?",
    answer:
      "I joined Wise Chicky to make early support financially reachable, operationally strong, and scalable without losing the humanity at the center of care.",
    backgroundHeading: "The discipline behind the dream",
    background:
      "Add Krishnanshu's background here: finance experience, operating discipline, fundraising or growth exposure, and how he keeps the mission sustainable.",
    image: founderKrishnanshu,
    initials: "KJ",
    accent: "from-[#FFC107] via-[#FF6B35] to-[#111111]",
  },
];

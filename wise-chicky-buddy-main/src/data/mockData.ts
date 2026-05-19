export interface DomainScore {
  key: "emotional" | "behavior" | "attention" | "social" | "safety";
  label: string;
  level: "good" | "monitor" | "concern";
  pct: number;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  classGrade: string;
  initials: string;
  colorIndex: number;
  lastScreened: string;
  domains: DomainScore[];
  reports: { id: string; psychologist: string; date: string }[];
  lastPsychologist?: string;
}

export const children: Child[] = [
  {
    id: "c1",
    name: "Aarav",
    age: 7,
    classGrade: "Class 2",
    initials: "A",
    colorIndex: 0,
    lastScreened: "5 days ago",
    domains: [
      { key: "emotional", label: "Emotional", level: "good", pct: 82 },
      { key: "behavior", label: "Behavior", level: "monitor", pct: 58 },
      { key: "attention", label: "Attention", level: "monitor", pct: 54 },
      { key: "social", label: "Social", level: "good", pct: 78 },
      { key: "safety", label: "Safety", level: "good", pct: 92 },
    ],
    reports: [
      { id: "r1", psychologist: "Dr. Priya Sharma", date: "12 Mar 2026" },
      { id: "r2", psychologist: "Dr. Anil Kapoor", date: "04 Jan 2026" },
    ],
    lastPsychologist: "Dr. Priya Sharma",
  },
  {
    id: "c2",
    name: "Riya",
    age: 11,
    classGrade: "Class 6",
    initials: "R",
    colorIndex: 1,
    lastScreened: "2 weeks ago",
    domains: [
      { key: "emotional", label: "Emotional", level: "good", pct: 88 },
      { key: "behavior", label: "Behavior", level: "good", pct: 85 },
      { key: "attention", label: "Attention", level: "good", pct: 80 },
      { key: "social", label: "Social", level: "good", pct: 90 },
      { key: "safety", label: "Safety", level: "good", pct: 95 },
    ],
    reports: [{ id: "r3", psychologist: "Dr. Meera Iyer", date: "20 Feb 2026" }],
    lastPsychologist: "Dr. Meera Iyer",
  },
];

export const psychologists = [
  {
    id: "p1",
    name: "Dr. Priya Sharma",
    degree: "PhD, Child Psychology",
    specialty: "Anxiety, Behavior",
    rating: 4.9,
    languages: "Hindi, English",
    fee: 1499,
    initials: "PS",
  },
  {
    id: "p2",
    name: "Dr. Arjun Mehta",
    degree: "MPhil, Clinical Psychology",
    specialty: "ADHD, Attention",
    rating: 4.8,
    languages: "Hindi, English",
    fee: 1799,
    initials: "AM",
  },
  {
    id: "p3",
    name: "Dr. Meera Iyer",
    degree: "PhD, Developmental Psych",
    specialty: "Development, Speech",
    rating: 4.9,
    languages: "English, Tamil",
    fee: 1899,
    initials: "MI",
  },
  {
    id: "p4",
    name: "Dr. Anil Kapoor",
    degree: "MD, Child Psychiatry",
    specialty: "Mood, Anxiety",
    rating: 4.7,
    languages: "Hindi, English",
    fee: 2199,
    initials: "AK",
  },
];

export const avatarColors = [
  "bg-primary-soft text-primary",
  "bg-accent-soft text-accent-foreground",
  "bg-[hsl(200_70%_94%)] text-[hsl(200_70%_30%)]",
  "bg-[hsl(330_70%_95%)] text-[hsl(330_55%_40%)]",
];

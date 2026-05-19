import {
  BookOpenCheck,
  Brain,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  UsersRound,
} from "lucide-react";

export type RoleKey = "student" | "teacher" | "parent" | "doctor";

export interface RoleAction {
  label: string;
  detail: string;
  icon: typeof Sparkles;
}

export interface RoleProfile {
  key: RoleKey;
  label: string;
  shortLabel: string;
  opener: string;
  headline: string;
  subhead: string;
  tone: string;
  icon: typeof Sparkles;
  focus: string[];
  firstAction: RoleAction;
  dailyActions: RoleAction[];
}

export const roleProfiles: Record<RoleKey, RoleProfile> = {
  student: {
    key: "student",
    label: "Student",
    shortLabel: "Student",
    opener: "I want to understand myself",
    headline: "A calm place to check feelings, school stress, and friendships.",
    subhead: "Students get gentle language, private check-ins, and clear next steps when something feels too heavy.",
    tone: "from-sky-50 via-white to-emerald-50 border-sky-100",
    icon: UserRound,
    focus: ["Feelings check-in", "Study stress", "Friendship signals"],
    firstAction: {
      label: "Start today's check-in",
      detail: "Five quick questions, written in student-friendly language.",
      icon: MessageCircleHeart,
    },
    dailyActions: [
      { label: "Mood journal", detail: "Notice patterns before they build up.", icon: Brain },
      { label: "Ask for help", detail: "Share a concern with a trusted adult.", icon: HeartHandshake },
    ],
  },
  teacher: {
    key: "teacher",
    label: "Teacher",
    shortLabel: "Teacher",
    opener: "I support students in class",
    headline: "A classroom lens for attention, behaviour, learning, and peer patterns.",
    subhead: "Teachers see lightweight screeners, class observations, and referral-ready summaries.",
    tone: "from-amber-50 via-white to-sky-50 border-amber-100",
    icon: GraduationCap,
    focus: ["Classroom screener", "Learning patterns", "Parent handoff"],
    firstAction: {
      label: "Open teacher screener",
      detail: "Capture classroom observations in under 8 minutes.",
      icon: ClipboardCheck,
    },
    dailyActions: [
      { label: "Flag a concern", detail: "Mark patterns without diagnosing.", icon: ShieldCheck },
      { label: "Share context", detail: "Help parents and doctors see the school picture.", icon: UsersRound },
    ],
  },
  parent: {
    key: "parent",
    label: "Parent",
    shortLabel: "Parent",
    opener: "I care for my child",
    headline: "Early signals, expert help, and one place to understand your child.",
    subhead: "Parents get screening, Super Parent AI guidance, expert sessions, and child progress in plain language.",
    tone: "from-emerald-50 via-white to-amber-50 border-emerald-100",
    icon: UsersRound,
    focus: ["Child overview", "Parent screening", "Expert booking"],
    firstAction: {
      label: "Begin parent screening",
      detail: "Understand wellbeing across emotional, attention, social, and safety domains.",
      icon: BookOpenCheck,
    },
    dailyActions: [
      { label: "Ask Super Parent AI", detail: "Get guidance before panic turns into guessing.", icon: Sparkles },
      { label: "Book an expert", detail: "Connect with a child psychologist when needed.", icon: CalendarCheck },
    ],
  },
  doctor: {
    key: "doctor",
    label: "Specialist",
    shortLabel: "Specialist",
    opener: "I provide clinical support",
    headline: "A clean clinical view of multi-informant signals before the session.",
    subhead: "Doctors see parent, teacher, and student inputs together, with session context and follow-up nudges.",
    tone: "from-violet-50 via-white to-emerald-50 border-violet-100",
    icon: Stethoscope,
    focus: ["Multi-informant view", "Risk context", "Follow-up plan"],
    firstAction: {
      label: "Review new intake",
      detail: "See parent, teacher, and student signals before consultation.",
      icon: Stethoscope,
    },
    dailyActions: [
      { label: "Session notes", detail: "Keep recommendations connected to the child's journey.", icon: ClipboardCheck },
      { label: "Care coordination", detail: "Guide parents and teachers with shared next steps.", icon: HeartHandshake },
    ],
  },
};

export const roles = Object.values(roleProfiles);

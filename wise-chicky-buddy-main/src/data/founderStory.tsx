import { ReactNode } from "react";
import {
  Heart, MessageCircle, Clock, Pill, Shield, Bot, Stethoscope,
} from "lucide-react";
import founder from "@/assets/founder-divyansh.jpeg";

export type StoryCard =
  | {
      kind: "intro";
      indicator: number;
      total: number;
    }
  | {
      kind: "story";
      indicator: number;
      total: number;
      icon: ReactNode;
      heading: string;
      body: string;
      tinted?: boolean;
    }
  | { kind: "quote"; indicator: number; total: number }
  | { kind: "cta"; indicator: number; total: number };

const TOTAL = 7; // 1 intro + 4 story + 1 solutions + 1 quote (+ optional CTA appended in component)

export const founderCards: StoryCard[] = [
  { kind: "intro", indicator: 1, total: TOTAL },
  {
    kind: "story", indicator: 2, total: TOTAL,
    icon: <Heart className="w-10 h-10 text-primary" />,
    heading: "Every night was terrifying.",
    body: "Panic attacks, racing heart, and an eating disorder made everyday life a battle — diet, health, academics, and confidence collapsed together.",
  },
  {
    kind: "story", indicator: 3, total: TOTAL,
    icon: <MessageCircle className="w-10 h-10 text-primary" />,
    heading: "Nobody had a name for it.",
    body: "Friends called me a coward. In our world, words like 'panic attacks' or 'eating disorder' simply didn't exist — so I believed them for years.",
  },
  {
    kind: "story", indicator: 4, total: TOTAL,
    icon: <Clock className="w-10 h-10 text-primary" />,
    heading: "'He'll grow out of it.'",
    body: "That false hope quietly stole years. Four words were never spoken by a teacher or relative: 'See a child psychologist.' That's all it would have taken.",
  },
  {
    kind: "story", indicator: 5, total: TOTAL,
    icon: <Pill className="w-10 h-10 text-primary" />,
    heading: "A decade later — four medicines a day.",
    body: "By the time I got help, symptoms had compounded for years. Even today, skipping medication for four days brings everything back — all of it preventable with early support.",
  },
  {
    kind: "story", indicator: 6, total: TOTAL, tinted: true,
    icon: (
      <div className="flex items-center gap-2">
        <Shield className="w-8 h-8 text-primary" />
        <Bot className="w-8 h-8 text-primary" />
        <Stethoscope className="w-8 h-8 text-primary" />
      </div>
    ),
    heading: "So I built Wise Chicky.",
    body: "Early screening tools to catch patterns before they become disorders. A 24/7 Super Parent AI guide. Real psychologist access — the support my parents never had.",
  },
  { kind: "quote", indicator: 7, total: TOTAL },
];

export { founder };

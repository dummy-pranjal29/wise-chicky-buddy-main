import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleDot,
  Compass,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import logo from "@/assets/wise-chicky-logo.png";
import { RoleKey, roles } from "@/data/roles";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RoleSelectionProps {
  onSelect: (role: RoleKey) => void;
}

const roleMeaning: Record<
  RoleKey,
  { means: string; unlocks: string[]; suggestion: string }
> = {
  parent: {
    means:
      "You are choosing Wise Chicky as the adult responsible for noticing, understanding, and supporting a child at home.",
    unlocks: [
      "Child profile",
      "Parent screening",
      "Super Parent AI",
      "Expert booking",
    ],
    suggestion:
      "Select this role if you're concerned that your child may benefit from professional assessment or support. You'll receive evidence-based guidance tailored for caregivers and can arrange consultations with specialists.",
  },
  student: {
    means:
      "You are using Wise Chicky for your own feelings, school pressure, friendships, focus, and daily wellbeing.",
    unlocks: [
      "Private check-ins",
      "Mood notes",
      "Student-friendly guidance",
      "Ask for help",
    ],
    suggestion:
      "Use this role only if you are mature enough to understand your own feelings and can use the app responsibly. Your child should be able to navigate independently and articulate their experiences.",
  },
  teacher: {
    means:
      "You are adding the classroom view: attention, learning, peer interaction, behaviour, and school patterns.",
    unlocks: [
      "Classroom screeners",
      "Observation notes",
      "Parent handoff",
      "Learning pattern flags",
    ],
    suggestion:
      "Choose this role if you've identified a student who may be struggling in ways they cannot fully articulate. Your classroom observations provide critical context for comprehensive assessment.",
  },
  doctor: {
    means:
      "You are reviewing multi-source signals as a care professional before or after consultation.",
    unlocks: [
      "Clinical intake",
      "Parent-teacher context",
      "Session notes",
      "Follow-up planning",
    ],
    suggestion:
      "This role is reserved for licensed medical professionals, mental health practitioners, and certified clinical specialists conducting professional assessments or clinical care.",
  },
};

const RoleSelection = ({ onSelect }: RoleSelectionProps) => {
  const [selected, setSelected] = useState<RoleKey>("parent");
  const activeRole = roles.find((role) => role.key === selected) ?? roles[0];
  const ActiveIcon = activeRole.icon;
  const activeMeaning = roleMeaning[selected];

  return (
    <section className="role-screen min-h-screen overflow-hidden pb-7 text-foreground">
      <div className="relative px-4 pb-7 pt-5">
        <div className="role-screen-bg" />

        <header className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Wise Chicky"
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="role-kicker text-primary">Wise Chicky</p>
              <h1 className="role-nav-title">Choose role</h1>
            </div>
          </div>
          <span className="role-pill">Step 2</span>
        </header>

        <section className="role-board relative z-10 mt-6">
          <div className="role-board-head">
            <div className="role-compass">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="role-kicker text-primary-glow">
                Customize your app
              </p>
              <h2>Who are you here as?</h2>
            </div>
          </div>

          <div className="role-switcher" aria-label="Select role">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = role.key === selected;
              return (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setSelected(role.key)}
                  className={`role-token ${isActive ? "is-active" : ""}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{role.shortLabel}</span>
                </button>
              );
            })}
          </div>

          <article className="role-dossier">
            <div className="role-dossier-top">
              <div className="role-dossier-icon">
                <ActiveIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="role-kicker text-primary">Selected role</p>
                <h3>{activeRole.label}</h3>
              </div>
            </div>

            <div className="role-meaning">
              <p>{activeMeaning.means}</p>
            </div>

            <div className="role-unlocks">
              {activeMeaning.unlocks.map((item) => (
                <span key={item}>
                  <Check className="h-3.5 w-3.5" />
                  {item}
                </span>
              ))}
            </div>

            <div className="role-suggestion">
              <CircleDot className="h-5 w-5" />
              <p>{activeMeaning.suggestion}</p>
            </div>

            {selected === "student" && (
              <Alert
                variant="default"
                className="mt-4 border-yellow-200 bg-yellow-50"
              >
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  You'll need to navigate this app independently and be able to
                  express how you're feeling. Make sure you have reliable access
                  to a device and that you're ready to be honest with yourself.
                </AlertDescription>
              </Alert>
            )}

            <button
              type="button"
              onClick={() => onSelect(selected)}
              className="role-confirm"
            >
              <span>Continue as {activeRole.shortLabel}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </article>
        </section>

        <section className="role-note relative z-10 mt-4">
          <Sparkles className="h-5 w-5" />
          <p>
            You can add more perspectives later—this is just where we start.
            We'll help parents, teachers, doctors, and others stay connected
            around the same child.
          </p>
        </section>
      </div>
    </section>
  );
};

export default RoleSelection;

import { Home, ClipboardCheck, Calendar, BookOpen, User, Telescope } from "lucide-react";

export type TabKey = "vision" | "home" | "assessments" | "sessions" | "resources" | "profile";

const tabs: { key: TabKey; label: string; Icon: typeof Home }[] = [
  { key: "vision", label: "Vision", Icon: Telescope },
  { key: "home", label: "Home", Icon: Home },
  { key: "assessments", label: "Assess", Icon: ClipboardCheck },
  { key: "sessions", label: "Sessions", Icon: Calendar },
  { key: "resources", label: "Resources", Icon: BookOpen },
  { key: "profile", label: "Profile", Icon: User },
];

interface Props {
  active: TabKey;
  onChange: (k: TabKey) => void;
}

const BottomNav = ({ active, onChange }: Props) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-card/95 backdrop-blur-md border-t border-card-border safe-bottom">
      <ul className="flex items-stretch justify-around px-2 pt-2 pb-2">
        {tabs.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <li key={key} className="flex-1">
              <button
                onClick={() => onChange(key)}
                className="w-full flex flex-col items-center justify-center gap-0.5 py-1.5 min-h-[48px] rounded-xl transition-colors"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <span
                  className={`text-[11px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`h-1 w-1 rounded-full transition-all ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;

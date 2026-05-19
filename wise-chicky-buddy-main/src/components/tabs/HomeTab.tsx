import { ArrowRight, Brain, HeartHandshake, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import founder from "@/assets/founder-divyansh.jpeg";
import logo from "@/assets/wise-chicky-logo.png";
import { RoleKey, roleProfiles } from "@/data/roles";

interface HomeTabProps {
  role: RoleKey;
  onChangeRole: () => void;
}

const commonPromises = [
  {
    icon: ShieldCheck,
    label: "Catch early",
    text: "Screen for emotional, attention, learning, behaviour, social, and safety signals.",
  },
  {
    icon: HeartHandshake,
    label: "Connect care",
    text: "Bring students, parents, teachers, and doctors into one child-first support loop.",
  },
  {
    icon: Brain,
    label: "Explain gently",
    text: "Turn patterns into plain next steps before confusion becomes crisis.",
  },
];

const HomeTab = ({ role, onChangeRole }: HomeTabProps) => {
  const profile = roleProfiles[role];
  const RoleIcon = profile.icon;
  const FirstActionIcon = profile.firstAction.icon;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,hsl(96_50%_98%)_0%,hsl(0_0%_100%)_46%,hsl(220_60%_97%)_100%)] pb-7">
      <section className="px-5 pt-7">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Wise Chicky" className="h-11 w-11 object-contain" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Wise Chicky
              </p>
              <h1 className="font-display text-2xl leading-none text-foreground">
                {profile.shortLabel} Home
              </h1>
            </div>
          </div>
          <button
            onClick={onChangeRole}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-card-border bg-card text-muted-foreground shadow-card"
            aria-label="Change role"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="px-5 pt-5">
        <div className={`rounded-[28px] border bg-gradient-to-br ${profile.tone} p-5 shadow-elevated`}>
          <div className="flex items-start gap-3">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-white/90 text-foreground shadow-card">
              <RoleIcon className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {profile.opener}
              </p>
              <h2 className="mt-2 font-display text-[29px] leading-tight text-foreground">
                {profile.headline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {profile.subhead}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {profile.focus.map((item) => (
              <span
                key={item}
                className="rounded-pill bg-white/80 px-3 py-1 text-[11px] font-bold text-foreground shadow-card"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pt-5">
        <button className="flex w-full items-center gap-3 rounded-[24px] bg-foreground p-4 text-left text-primary-foreground shadow-elevated">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary">
            <FirstActionIcon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{profile.firstAction.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-primary-foreground/70">
              {profile.firstAction.detail}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-primary-glow" />
        </button>
      </section>

      <section className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">For today</h2>
          <span className="rounded-pill bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
            Day 1
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {profile.dailyActions.map((action) => {
            const Icon = action.icon;
            return (
              <article
                key={action.label}
                className="min-h-[148px] rounded-[22px] border border-card-border bg-card p-4 shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-bold leading-tight text-foreground">{action.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{action.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-7">
        <h2 className="font-display text-xl text-foreground">Common for everyone</h2>
        <div className="mt-3 space-y-3">
          {commonPromises.map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex gap-3 rounded-[22px] border border-card-border bg-card p-4 shadow-card">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pt-7">
        <div className="overflow-hidden rounded-[28px] border border-primary/20 bg-card shadow-elevated">
          <div className="flex gap-4 p-4">
            <img
              src={founder}
              alt="Divyansh, founder of Wise Chicky"
              className="h-24 w-20 shrink-0 rounded-[22px] object-cover object-top"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                Founder vision
              </p>
              <h3 className="mt-1 font-display text-xl leading-tight text-foreground">
                Built because delay can change a childhood.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Divyansh's story gives the product its spine: early understanding, less shame, and faster access to the right support.
              </p>
            </div>
          </div>
          <button className="flex h-12 w-full items-center justify-center gap-2 border-t border-card-border text-sm font-bold text-primary">
            Read the mission <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeTab;

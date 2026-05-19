import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  AlertCircle,
  User,
  GraduationCap,
  Smile,
  Clock,
} from "lucide-react";

type Informant = "parent" | "teacher" | "child";

interface Assessment {
  id: string;
  informant: Informant;
  badge?: string;
  icon: typeof Sparkles;
  title: string;
  desc: string;
  duration: string;
  age: string;
  domains: string[];
  cta: string;
  href: string;
}

const informantMeta: Record<
  Informant,
  { label: string; sub: string; icon: typeof User; tone: string }
> = {
  parent: {
    label: "Parent as informant",
    sub: "You answer based on your child's behaviour over the last 4 weeks.",
    icon: User,
    tone: "bg-primary-soft text-primary",
  },
  teacher: {
    label: "Teacher as informant",
    sub: "Shareable with your child's class teacher for an outside perspective.",
    icon: GraduationCap,
    tone: "bg-accent-soft text-accent-foreground",
  },
  child: {
    label: "Child self-report",
    sub: "A gentle, gamified feelings check-in your child completes themselves.",
    icon: Smile,
    tone: "bg-[hsl(200_70%_94%)] text-foreground",
  },
};

const assessments: Assessment[] = [
  {
    id: "parent-screening",
    informant: "parent",
    badge: "Recommended",
    icon: Sparkles,
    title: "Parent Screening Assessment",
    desc: "A comprehensive parent-completed check-in to understand your child’s wellbeing across multiple domains.",
    duration: "≈ 10–15 min",
    age: "Ages 0–17",
    domains: ["Emotional", "Behavior", "Attention", "Social", "Safety"],
    cta: "Start Screening",
    href: "/assessments/parent-screening.html",
  },
  {
    id: "teacher-screener",
    informant: "teacher",
    badge: "Send to Teacher",
    icon: GraduationCap,
    title: "Teacher Informant Screener",
    desc: "Classroom-focused observations across attention, behaviour, peer interactions and learning.",
    duration: "≈ 8 min",
    age: "Ages 4–17",
    domains: ["Classroom", "Peer", "Learning", "Behavior"],
    cta: "Open Teacher Form",
    href: "/assessments/teacher-screening.html",
  },
  {
    id: "child-checkin",
    informant: "child",
    badge: "Kid-friendly",
    icon: Smile,
    title: "Feelings Check-in",
    desc: "An animated, gamified self-report so your child can share how they're really feeling.",
    duration: "≈ 5 min",
    age: "Ages 6–14",
    domains: ["Mood", "Worries", "Friends", "School"],
    cta: "Start Check-in",
    href: "/assessments/child-checkin.html",
  },
];

const order: Informant[] = ["parent", "teacher", "child"];

const AssessmentsTab = () => {
  return (
    <div className="pb-6">
      <PageHeader
        title="Assessments"
        subtitle="Regular check-ins help catch issues early — before they grow."
        hero
      />

      {/* Recommendation banner */}
      <section className="px-5 mt-4">
        <div className="rounded-2xl bg-accent-soft border border-accent/30 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Aarav: a gentle nudge</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              We noticed an attention pattern worth exploring together. Speaking with a child psychologist may help.
            </p>
            <button className="text-xs font-semibold text-primary mt-2">
              Book a Session with an Expert →
            </button>
          </div>
        </div>
      </section>

      {/* Informant intro */}
      <section className="px-5 mt-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Choose informant
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The clearest picture comes from triangulating perspectives. Wise Chicky offers
          assessments designed for parents, teachers, and children themselves.
        </p>
      </section>

      {order.map((informant) => {
        const meta = informantMeta[informant];
        const items = assessments.filter((a) => a.informant === informant);
        if (!items.length) return null;
        const Icon = meta.icon;
        return (
          <section key={informant} className="px-5 mt-6">
            <div className="flex items-start gap-3 mb-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${meta.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg text-foreground leading-tight">
                  {meta.label}
                </h2>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {meta.sub}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((a) => (
                <article
                  key={a.id}
                  className="rounded-[22px] bg-card border border-card-border shadow-card p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
                      <a.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {a.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-pill bg-primary text-primary-foreground">
                            {a.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-pill bg-muted text-muted-foreground">
                          {a.age}
                        </span>
                      </div>
                      <h3 className="font-display text-[17px] leading-tight text-foreground mt-1.5">
                        {a.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[13px] text-muted-foreground leading-relaxed mt-3">
                    {a.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {a.domains.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-pill bg-primary-soft text-primary"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {a.duration}
                    </span>
                    <Button asChild className="rounded-xl h-10 px-4 text-sm">
                      <a href={a.href} target="_blank" rel="noopener noreferrer">
                        {a.cta}
                      </a>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Past results */}
      <section className="px-5 mt-7">
        <h2 className="font-display text-xl text-foreground mb-3">Your assessment results</h2>
        <div className="space-y-2.5">
          {[
            { name: "Aarav", a: "5-Domain Wellbeing (Parent)", date: "12 Mar 2026", level: "Monitor", color: "bg-accent text-accent-foreground" },
            { name: "Aarav", a: "Teacher Screener", date: "08 Mar 2026", level: "Monitor", color: "bg-accent text-accent-foreground" },
            { name: "Riya", a: "Feelings Check-in (Child)", date: "20 Feb 2026", level: "All Good", color: "bg-primary text-primary-foreground" },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl bg-card border border-card-border p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name} — {r.a}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.date}</p>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-pill ${r.color}`}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AssessmentsTab;

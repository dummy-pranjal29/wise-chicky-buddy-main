import PageHeader from "@/components/app/PageHeader";
import { Search, Lightbulb, ArrowRight } from "lucide-react";

const famous = [
  { name: "Aamir Khan", challenge: "Dyslexia awareness", color: "bg-[hsl(20_80%_94%)]" },
  { name: "APJ Abdul Kalam", challenge: "Perseverance", color: "bg-[hsl(200_70%_94%)]" },
  { name: "Simone Biles", challenge: "ADHD", color: "bg-[hsl(330_70%_95%)]" },
  { name: "Michael Phelps", challenge: "ADHD", color: "bg-primary-soft" },
];

const personalized = [
  { name: "Arjun, 24", tag: "Like Aarav's attention profile", story: "Struggled with attention in school — today an IIT Delhi engineer." },
  { name: "Priya, 19", tag: "Like Aarav's behavior pattern", story: "Faced behavioral challenges early — now a national-level chess player." },
];

const articles = [
  { tag: "Child Development", title: "What 'normal' really looks like at age 7" },
  { tag: "Mental Health", title: "Anxiety in children often looks like anger" },
  { tag: "School", title: "Talking to teachers without labelling your child" },
];

const ResourcesTab = () => {
  return (
    <div className="pb-6">
      <PageHeader
        title="Resources"
        subtitle="Stories that inspire. Knowledge that empowers."
        hero
      />

      {/* Search */}
      <section className="px-5 mt-2">
        <div className="flex items-center gap-2 rounded-pill bg-card border border-card-border px-4 h-11">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search articles, stories..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      {/* Daily tip */}
      <section className="px-5 mt-4">
        <div className="rounded-2xl bg-accent-soft border border-accent/30 p-4 flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Lightbulb className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
              Today's Parenting Insight
            </p>
            <p className="text-sm text-foreground mt-1 leading-snug">
              Children often "act out" when they don't have the words. Naming the feeling helps them feel safe.
            </p>
          </div>
        </div>
      </section>

      {/* Famous Stories */}
      <section className="mt-7">
        <div className="px-5 mb-3">
          <h2 className="font-display text-xl text-foreground">They struggled. They succeeded.</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Remarkable people who achieved great things while facing challenges.
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {famous.map((f) => (
            <article key={f.name} className="shrink-0 w-44 rounded-2xl bg-card border border-card-border shadow-card overflow-hidden">
              <div className={`h-24 ${f.color} flex items-center justify-center`}>
                <span className="font-display text-3xl text-foreground/40">
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground leading-tight">{f.name}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{f.challenge}</p>
                <button className="text-[11px] font-semibold text-primary mt-2 inline-flex items-center gap-0.5">
                  Read Story <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Personalized */}
      <section className="px-5 mt-7">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-display text-xl text-foreground">Children like yours, who thrived</h2>
        </div>
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-pill bg-accent text-accent-foreground mb-3">
          Personalized for Aarav
        </span>
        <div className="space-y-2.5">
          {personalized.map((p) => (
            <article key={p.name} className="rounded-2xl bg-card border border-card-border p-4">
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="text-[11px] text-primary mt-0.5">{p.tag}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.story}</p>
              <button className="text-xs font-semibold text-primary mt-2 inline-flex items-center gap-0.5">
                Read Story <ArrowRight className="h-3 w-3" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="px-5 mt-7">
        <h2 className="font-display text-xl text-foreground mb-3">For curious, caring parents</h2>
        <div className="space-y-2.5">
          {articles.map((a, i) => (
            <article key={i} className="rounded-2xl bg-card border border-card-border p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary-soft flex items-center justify-center font-display text-primary">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {a.tag}
                </span>
                <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
                  {a.title}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesTab;

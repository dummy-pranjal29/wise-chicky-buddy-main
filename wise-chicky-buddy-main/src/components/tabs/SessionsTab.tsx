import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { psychologists } from "@/data/mockData";
import { Star, Video, Clock } from "lucide-react";

const filters = ["All", "Child Psychology", "ADHD", "Anxiety", "Behavior", "Development"];

const SessionsTab = () => {
  return (
    <div className="pb-6">
      <PageHeader
        title="Expert Sessions"
        subtitle="Connect with qualified child psychologists — real support, right here."
        hero
      />

      {/* Upcoming */}
      <section className="px-5 mt-4">
        <h2 className="font-display text-lg text-foreground mb-3">Upcoming</h2>
        <div className="rounded-[24px] bg-primary-soft border border-primary/20 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">Dr. Priya Sharma</p>
              <p className="text-xs text-muted-foreground">First consultation • for Aarav</p>
            </div>
            <span className="text-[11px] font-semibold text-primary inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> in 2 days
            </span>
          </div>
          <p className="text-xs text-foreground mt-3 mb-3">Tomorrow, 4:00 PM IST • Video</p>
          <div className="grid grid-cols-2 gap-2">
            <Button className="rounded-xl h-10 text-sm gap-1.5">
              <Video className="h-4 w-4" /> Join Session
            </Button>
            <Button variant="outline" className="rounded-xl h-10 text-sm border-primary text-primary hover:bg-primary-soft">
              Reschedule
            </Button>
          </div>
        </div>
      </section>

      {/* Browse experts */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-foreground">Find an expert</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`shrink-0 text-xs font-semibold px-3.5 py-2 rounded-pill border transition ${
                i === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-card-border hover:border-primary/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {psychologists.map((p) => (
            <article key={p.id} className="rounded-2xl bg-card border border-card-border p-3 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-12 w-12 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold text-sm">
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground truncate leading-tight">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{p.degree}</p>
                </div>
              </div>
              <p className="text-[11px] text-foreground font-medium">{p.specialty}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-accent-foreground">
                  <Star className="h-3 w-3 fill-accent text-accent" /> {p.rating}
                </span>
                <span className="text-[11px] text-muted-foreground">₹{p.fee}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{p.languages}</p>
              <Button className="w-full mt-2.5 rounded-lg h-8 text-xs">Book</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SessionsTab;

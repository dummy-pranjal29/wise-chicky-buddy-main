import { DomainScore } from "@/data/mockData";

const colorByLevel = {
  good: "bg-primary",
  monitor: "bg-accent",
  concern: "bg-destructive",
} as const;

const labelByLevel = {
  good: "Good",
  monitor: "Monitor",
  concern: "Attention",
} as const;

const DomainBars = ({ domains }: { domains: DomainScore[] }) => {
  return (
    <div className="space-y-2.5">
      {domains.map((d) => (
        <div key={d.key} className="grid grid-cols-[80px_1fr_60px] items-center gap-3">
          <span className="text-xs font-medium text-foreground">{d.label}</span>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${colorByLevel[d.level]}`}
              style={{ width: `${d.pct}%` }}
            />
          </div>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wide text-right ${
              d.level === "good"
                ? "text-primary"
                : d.level === "monitor"
                ? "text-accent-foreground"
                : "text-destructive"
            }`}
          >
            {labelByLevel[d.level]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DomainBars;

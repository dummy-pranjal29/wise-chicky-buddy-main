import { Child, avatarColors } from "@/data/mockData";
import DomainBars from "./DomainBars";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ClipboardCheck, Calendar } from "lucide-react";

interface Props {
  child: Child;
  onBookSession: (child: Child) => void;
}

const ChildCard = ({ child, onBookSession }: Props) => {
  return (
    <article className="rounded-[24px] bg-card border-l-4 border-primary border-y border-r border-y-card-border border-r-card-border shadow-card overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center font-display text-xl ${
              avatarColors[child.colorIndex % avatarColors.length]
            }`}
          >
            {child.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-lg text-foreground leading-none">{child.name}</p>
            <p className="text-[13px] text-muted-foreground mt-1">
              {child.age} yrs • {child.classGrade}
            </p>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Updated {child.lastScreened}
          </span>
        </div>

        {/* Wellbeing Profile */}
        <div className="rounded-2xl bg-primary-soft/40 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Wellbeing Profile
            </p>
            <span className="text-[11px] text-muted-foreground">Last screened: {child.lastScreened}</span>
          </div>
          <DomainBars domains={child.domains} />
        </div>

        {/* Past reports */}
        {child.reports.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
              Past Expert Reports
            </p>
            <ul className="space-y-1.5">
              {child.reports.slice(0, 2).map((r) => (
                <li key={r.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{r.psychologist}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                    <button className="text-primary"><Download className="h-4 w-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="text-xs font-semibold text-primary mt-2 inline-flex items-center gap-0.5">
              View all reports <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            onClick={() => onBookSession(child)}
            className="rounded-xl h-11 text-sm gap-1.5"
          >
            <Calendar className="h-4 w-4" />
            Book Session
          </Button>
          <Button
            variant="outline"
            className="rounded-xl h-11 text-sm gap-1.5 border-primary text-primary hover:bg-primary-soft"
          >
            <ClipboardCheck className="h-4 w-4" />
            Start Assessment
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ChildCard;

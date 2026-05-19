import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Child, psychologists } from "@/data/mockData";
import { Star, UserPlus, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  child: Child | null;
  onClose: () => void;
}

const BookSessionSheet = ({ child, onClose }: Props) => {
  const [option, setOption] = useState<"new" | "follow" | null>(null);
  const followPsy = psychologists.find((p) => p.name === child?.lastPsychologist);

  const confirm = () => {
    toast.success("Booking confirmed", {
      description: `Session for ${child?.name} scheduled successfully.`,
    });
    setOption(null);
    onClose();
  };

  return (
    <Sheet open={!!child} onOpenChange={(o) => { if (!o) { setOption(null); onClose(); } }}>
      <SheetContent side="bottom" className="rounded-t-[28px] border-card-border">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">Book a session</SheetTitle>
          <SheetDescription>
            {child ? `Choose how you'd like to support ${child.name}.` : ""}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-5 space-y-3">
          {/* Option A: New */}
          <button
            onClick={() => setOption("new")}
            className={`w-full text-left p-4 rounded-2xl border transition ${
              option === "new"
                ? "border-primary bg-primary-soft"
                : "border-card-border bg-card hover:border-primary/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-full bg-primary-soft flex items-center justify-center text-primary">
                <UserPlus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">New Psychologist</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Browse our experts and choose who fits best for {child?.name}.
                </p>
              </div>
            </div>
          </button>

          {/* Option B: Follow-up */}
          {followPsy && (
            <button
              onClick={() => setOption("follow")}
              className={`w-full text-left p-4 rounded-2xl border transition ${
                option === "follow"
                  ? "border-primary bg-primary-soft"
                  : "border-card-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-full bg-accent-soft flex items-center justify-center text-accent-foreground font-semibold text-sm">
                  {followPsy.initials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    Follow-up with {followPsy.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Continue your journey with a familiar face.
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-0.5 text-accent-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" /> {followPsy.rating}
                    </span>
                    <span>•</span>
                    <span>{followPsy.specialty}</span>
                  </div>
                </div>
                <Repeat className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          )}
        </div>

        <Button
          disabled={!option}
          onClick={confirm}
          className="w-full mt-6 rounded-xl h-12"
        >
          Confirm Booking
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default BookSessionSheet;

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/wise-chicky-logo.png";
import { founderCards, founder } from "@/data/founderStory";

interface Props {
  onComplete: () => void;
  onSkip?: () => void;
  showCTA?: boolean; // include final "Get Started" card
}

const dotRow = (current: number, total: number) => (
  <div className="flex items-center justify-center gap-1.5 pt-2">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={`h-1.5 rounded-full transition-all ${
          i === current ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
        }`}
      />
    ))}
  </div>
);

const FounderStory = ({ onComplete, onSkip, showCTA = true }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const cards = showCTA
    ? [...founderCards, { kind: "cta" as const, indicator: founderCards.length + 1, total: founderCards.length + 1 }]
    : founderCards;
  const total = cards.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const next = () => {
    if (index < total - 1) goTo(index + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Wise Chicky" className="h-8 w-8 object-contain" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">Founder's Story</span>
        <button
          onClick={onSkip ?? onComplete}
          className="text-sm text-muted-foreground font-medium hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </header>

      {/* Dots */}
      {dotRow(index, total)}

      {/* Cards */}
      <div
        ref={scrollerRef}
        className="flex-1 flex overflow-x-auto snap-x-mandatory no-scrollbar"
      >
        {cards.map((card, i) => (
          <section
            key={i}
            className="snap-center shrink-0 w-full h-full flex flex-col px-5 py-4"
          >
            <div
              className={`flex-1 flex flex-col rounded-[28px] border shadow-card overflow-hidden ${
                card.kind === "story" && card.tinted
                  ? "bg-green-tint border-primary/15"
                  : card.kind === "quote"
                  ? "bg-primary-gradient border-transparent"
                  : "bg-card border-card-border"
              }`}
            >
              {card.kind !== "quote" && card.kind !== "cta" && (
                <div className="h-1.5 w-full bg-primary" />
              )}

              {card.kind === "intro" && (
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
                  <div className="rounded-full p-1.5 bg-primary-gradient">
                    <img
                      src={founder}
                      alt="Divyansh, Founder of Wise Chicky"
                      className="h-44 w-44 rounded-full object-cover border-4 border-card"
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-[22px] text-foreground">Divyansh</h2>
                    <p className="text-sm text-muted-foreground">Founder, Wise Chicky</p>
                  </div>
                  <p className="font-display italic text-xl text-foreground/90 max-w-xs leading-snug">
                    "I was that child nobody recognized in time."
                  </p>
                </div>
              )}

              {card.kind === "story" && (
                <div className="flex-1 flex flex-col items-center justify-center px-7 text-center gap-6">
                  <div className="h-24 w-24 rounded-full bg-primary-soft flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h2 className="font-display text-[26px] leading-tight text-foreground max-w-sm">
                    {card.heading}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-muted-foreground max-w-sm">
                    {card.body}
                  </p>
                </div>
              )}

              {card.kind === "quote" && (
                <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6 text-primary-foreground">
                  <span className="font-display text-7xl leading-none opacity-60">"</span>
                  <p className="font-display text-2xl leading-snug">
                    Every child deserves to be understood early — not medicated late.
                  </p>
                  <p className="text-sm opacity-90">— Divyansh, Founder, Wise Chicky</p>
                </div>
              )}

              {card.kind === "cta" && (
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-5">
                  <img src={logo} alt="" className="h-44 w-44 object-contain" />
                  <h2 className="font-display text-[26px] leading-tight text-foreground">
                    You're not alone in this journey.
                  </h2>
                  <p className="text-[15px] text-muted-foreground max-w-xs">
                    Join thousands of parents across India who are taking the first step.
                  </p>
                  <div className="w-full max-w-xs flex flex-col gap-3 pt-2">
                    <Button size="lg" className="rounded-xl h-12 text-base" onClick={onComplete}>
                      Create Account
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl h-12 text-base border-primary text-primary hover:bg-primary-soft"
                      onClick={onComplete}
                    >
                      I already have an account
                    </Button>
                  </div>
                </div>
              )}

              {card.kind === "story" && !card.tinted && (
                <div className="h-2 w-full bg-primary/80" />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer Next button (hidden on CTA card) */}
      {cards[index]?.kind !== "cta" && (
        <div className="px-5 pb-6 pt-2">
          <Button
            onClick={next}
            size="lg"
            className="w-full rounded-xl h-12 text-base shadow-soft"
          >
            {index === total - 1 ? "Get Started" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FounderStory;

import { Bot, Mic, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "Is my 7-year-old's behavior normal?",
  "What does anxiety look like in kids?",
  "How to talk to my child about emotions?",
];

const SuperParentAI = () => {
  const [q, setQ] = useState("");

  return (
    <div className="rounded-[24px] bg-ai p-5 text-primary-foreground shadow-elevated relative overflow-hidden">
      <div className="absolute -right-6 -top-6 opacity-15">
        <Sparkles className="h-32 w-32" strokeWidth={1} />
      </div>
      <div className="flex items-center gap-2.5 mb-2">
        <div className="h-9 w-9 rounded-full bg-primary-foreground/15 flex items-center justify-center backdrop-blur-sm">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-lg leading-none">Super Parent AI</p>
          <p className="text-[11px] opacity-90 mt-1">Available 24/7</p>
        </div>
      </div>
      <p className="text-sm opacity-95 mb-3">
        Ask me anything about your child's development.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); setQ(""); }}
        className="flex items-center gap-2 bg-primary-foreground rounded-pill pl-4 pr-1 py-1"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask about your child..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2"
        />
        <button type="button" className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
          <Mic className="h-4 w-4" />
        </button>
        <button
          type="submit"
          className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-1 px-1">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQ(s)}
            className="shrink-0 text-[11px] px-3 py-1.5 rounded-pill bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuperParentAI;

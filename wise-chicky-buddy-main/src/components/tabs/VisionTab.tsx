import { type CSSProperties, useState } from "react";
import { ArrowRight, BookOpen, CornerDownRight, Feather, X } from "lucide-react";
import logo from "@/assets/wise-chicky-logo.png";
import mantraWellbeingBg from "@/assets/mantra-wellbeing-bg.png";
import { Button } from "@/components/ui/button";
import { VisionLeader, visionLeaders } from "@/data/vision";

interface VisionTabProps {
  onContinue?: () => void;
  showOnboardingActions?: boolean;
}

type FounderPage = "answer" | "background";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const mantraLines = [
  {
    label: "Mission",
    title: "Notice early.",
    text: "Give every parent a calm way to read emotional, learning, attention, and behaviour signals before they harden into crisis.",
  },
  {
    label: "Method",
    title: "Understand gently.",
    text: "Translate patterns into human language, reduce shame, and help families know what deserves attention today.",
  },
  {
    label: "Promise",
    title: "Guide before fear.",
    text: "Connect screening, parent guidance, and expert support so the first step feels clear, private, and possible.",
  },
];

const founderPositionStyle = {
  ceo: {
    left: "50%",
    top: "0px",
    transform: "translateX(-50%)",
    height: "150px",
    width: "150px",
  },
  cto: {
    right: "-58px",
    top: "390px",
    transform: "rotate(4deg)",
    height: "190px",
    width: "150px",
  },
  cfo: {
    left: "-70px",
    top: "720px",
    transform: "rotate(-8deg)",
    height: "160px",
    width: "170px",
  },
} satisfies Record<string, CSSProperties>;

const playPageFlip = () => {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;

  const audio = new AudioContextCtor();
  const buffer = audio.createBuffer(1, audio.sampleRate * 0.16, audio.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * 0.2;
  }

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();

  source.buffer = buffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(950, audio.currentTime);
  filter.frequency.exponentialRampToValueAtTime(2600, audio.currentTime + 0.12);
  gain.gain.setValueAtTime(0.001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audio.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.16);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
  source.stop(audio.currentTime + 0.16);
};

const FounderCutout = ({
  leader,
  position,
  active,
  onClick,
}: {
  leader: VisionLeader;
  position: "ceo" | "cto" | "cfo";
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    className={`mantra-founder mantra-founder-${position} ${active ? "is-active" : ""}`}
    style={founderPositionStyle[position]}
    onClick={onClick}
    aria-label={`Open ${leader.name} ${leader.role} card`}
  >
    {leader.characterImage ? (
      <img className="mantra-character-image" src={leader.characterImage} alt="" />
    ) : (
      <span className="mantra-sketch">
        <span className="sketch-head">
          <span className="sketch-eye left" />
          <span className="sketch-eye right" />
          <span className="sketch-smile" />
        </span>
        <span className="sketch-neck" />
        <span className="sketch-body" />
        <span className="sketch-arm left" />
        <span className="sketch-arm right" />
      </span>
    )}
    <span className="mantra-founder-label">{leader.role.toLowerCase()}</span>
  </button>
);

const FounderCard = ({
  leader,
  page,
  onFlip,
  onClose,
}: {
  leader: VisionLeader;
  page: FounderPage;
  onFlip: () => void;
  onClose: () => void;
}) => {
  const isAnswer = page === "answer";

  return (
    <div className="mantra-card-overlay">
      <article className="mantra-founder-card">
        <header className="mantra-founder-card-header">
          <div>
            <p>{leader.role} note</p>
            <h3>{leader.name}</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close founder card">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="mantra-page-stage">
          <section className={`mantra-page ${isAnswer ? "is-open" : "is-hidden"}`}>
            <div className="mantra-page-heading">
              <span className={`bg-gradient-to-br ${leader.accent}`}>
                <Feather className="h-5 w-5" />
              </span>
              <div>
                <p>Question</p>
                <h4>{leader.question}</h4>
              </div>
            </div>
            <p className="mantra-answer">{leader.answer}</p>
          </section>

          <section className={`mantra-page ${!isAnswer ? "is-open" : "is-hidden"}`}>
            <div className="mantra-page-heading">
              <span className="bg-accent text-accent-foreground">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p>Background</p>
                <h4>{leader.backgroundHeading}</h4>
              </div>
            </div>
            <p className="mantra-background">{leader.background}</p>
          </section>
        </div>

        <button type="button" className="mantra-flip" onClick={onFlip} aria-label="Move to next card">
          <CornerDownRight className="h-6 w-6" />
        </button>
      </article>
    </div>
  );
};

const VisionTab = ({ onContinue, showOnboardingActions = false }: VisionTabProps) => {
  const [activeLeader, setActiveLeader] = useState<VisionLeader | null>(null);
  const [page, setPage] = useState<FounderPage>("answer");

  const ceo = visionLeaders.find((leader) => leader.role === "CEO") ?? visionLeaders[0];
  const cto = visionLeaders.find((leader) => leader.role === "CTO") ?? visionLeaders[1];
  const cfo = visionLeaders.find((leader) => leader.role === "CFO") ?? visionLeaders[2];

  const openLeader = (leader: VisionLeader) => {
    setActiveLeader(leader);
    setPage("answer");
  };

  const flipPage = () => {
    playPageFlip();
    setPage((current) => (current === "answer" ? "background" : "answer"));
  };

  return (
    <section className="mantra-screen min-h-screen overflow-hidden pb-8 text-foreground">
      <div className="relative px-4 pb-8 pt-5">
        <div className="mantra-screen-bg" />

        <header className="relative z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Wise Chicky" className="h-11 w-11 object-contain" />
            <div>
              <p className="mantra-kicker text-primary">Wise Chicky</p>
              <h1 className="mantra-nav-title">Vision</h1>
            </div>
          </div>
          <span className="mantra-pill">Our Mantra</span>
        </header>

        <section className="mantra-stage relative z-10 mt-8">
          <FounderCutout
            leader={ceo}
            position="ceo"
            active={activeLeader?.role === ceo.role}
            onClick={() => openLeader(ceo)}
          />
          <FounderCutout
            leader={cto}
            position="cto"
            active={activeLeader?.role === cto.role}
            onClick={() => openLeader(cto)}
          />
          <FounderCutout
            leader={cfo}
            position="cfo"
            active={activeLeader?.role === cfo.role}
            onClick={() => openLeader(cfo)}
          />

          <article className="mantra-board">
            <img className="mantra-board-bg-image" src={mantraWellbeingBg} alt="" />
            <div className="mantra-board-inner">
              <p className="mantra-kicker text-primary-glow">Our Mantra</p>
              <h2>The Early Signal Doctrine</h2>
              <div className="mantra-pages">
                {mantraLines.map((line, index) => (
                  <article key={line.label} className={`mantra-page-note note-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")} / {line.label}</span>
                    <h3>{line.title}</h3>
                    <p>{line.text}</p>
                  </article>
                ))}
              </div>
              <footer>Before role. Before signup. Before fear.</footer>
            </div>
          </article>

          {activeLeader && (
            <FounderCard
              leader={activeLeader}
              page={page}
              onFlip={flipPage}
              onClose={() => setActiveLeader(null)}
            />
          )}
        </section>

        {showOnboardingActions && (
          <div className="vision-fixed-cta">
            <Button
              onClick={onContinue}
              size="lg"
              className="h-14 w-full rounded-[18px] text-base font-black shadow-elevated"
            >
              Customize your role <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisionTab;

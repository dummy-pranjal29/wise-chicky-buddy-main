import { useEffect, useState } from "react";
import logo from "@/assets/wise-chicky-logo.png";

interface Props {
  onDone: () => void;
}

const Splash = ({ onDone }: Props) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center animate-float-up">
        <img
          src={logo}
          alt="Wise Chicky logo"
          className="h-40 w-40 object-contain drop-shadow-sm"
          style={{ animation: phase === 1 ? "bounce-cap 1s ease-in-out infinite" : undefined }}
        />
        <h1 className="font-display text-3xl mt-6 text-foreground">Wise Chicky</h1>
        <p
          className={`mt-2 text-muted-foreground text-sm transition-opacity duration-700 ${
            phase >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          Catch it early. Change it forever.
        </p>
      </div>
    </div>
  );
};

export default Splash;

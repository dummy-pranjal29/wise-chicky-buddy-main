import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/wise-chicky-logo.png";

const GettingStarted = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <img src={logo} alt="Wise Chicky" className="h-28 w-28 object-contain" />
        <h1 className="font-display text-3xl mt-4 text-foreground">Wise Chicky</h1>
        <p className="text-base text-muted-foreground mt-2">
          Catch it early. Change it forever.
        </p>

        <div className="mt-8 w-full space-y-3">
          <Button className="w-full" onClick={() => navigate("/auth?mode=signup")}>
            Get Started
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/auth")}>
            I already have an account
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Trusted by parents for early developmental screening.
        </p>
      </div>
    </main>
  );
};

export default GettingStarted;

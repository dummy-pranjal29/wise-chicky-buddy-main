import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import logo from "@/assets/wise-chicky-logo.png";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";

interface AuthProps {
  embedded?: boolean;
  onAuthenticated?: () => void;
}

const Auth = ({ embedded = false, onAuthenticated }: AuthProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    // Validation
    if (!normalizedEmail) {
      toast.error("Please enter your email.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { error: signupError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });

        if (signupError) {
          if (
            signupError.message.includes("already registered") ||
            signupError.message.includes("already exists")
          ) {
            toast.error("Email already in use. Try signing in instead.");
          } else {
            toast.error(signupError.message || "Signup failed");
          }
        } else {
          toast.success("Account created successfully!");
          // Clear fields and switch to signin
          setEmail("");
          setPassword("");
          setMode("signin");
        }
      } else {
        const { error: signinError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (signinError) {
          if (signinError.message.includes("Invalid login credentials")) {
            toast.error("Incorrect email or password.");
          } else if (signinError.message.includes("Email not confirmed")) {
            toast.info("Please confirm your email before signing in.");
          } else {
            toast.error(signinError.message || "Sign in failed");
          }
        } else {
          toast.success("Signed in successfully!");
          onAuthenticated?.();
          navigate("/", { replace: true });
        }
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={logo}
          alt="Wise Chicky"
          className="h-20 w-20 object-contain"
        />
        <h1 className="font-display text-3xl mt-4 text-foreground">
          Wise Chicky
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Catch it early. Change it forever.
        </p>
      </div>

      <div className="rounded-3xl border border-card-border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "signin"
              ? "Sign in to your Wise Chicky account"
              : "Create your Wise Chicky account"}
          </p>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={
                  mode === "signup" ? "6+ characters" : "Enter your password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-primary hover:bg-primary-hover text-primary-foreground"
            disabled={loading}
          >
            {loading
              ? mode === "signup"
                ? "Creating account..."
                : "Signing in..."
              : mode === "signup"
                ? "Create Account"
                : "Sign In"}
          </Button>
        </form>

        {/* Mode Toggle */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {mode === "signin"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setEmail("");
                setPassword("");
              }}
              disabled={loading}
              className="font-semibold text-primary hover:underline disabled:opacity-50"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Security Callout */}
        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-800 ml-3">
            <strong>Your data is secure.</strong> Powered by Supabase with
            enterprise-grade encryption.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary-soft flex items-center justify-center p-4">
      {content}
    </main>
  );
};

export default Auth;

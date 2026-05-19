import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { AuthError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import logo from "@/assets/wise-chicky-logo.png";
import { RoleKey, roleProfiles } from "@/data/roles";
import {
  clearPendingRole,
  getSavedRole,
  isRoleKey,
  saveRole,
} from "@/lib/role";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Check,
  Phone,
  AlertCircle,
} from "lucide-react";

interface AuthProps {
  selectedRole?: RoleKey | null;
  confirmedRole?: RoleKey | null;
  embedded?: boolean;
  onAuthenticated?: () => void;
}

const Auth = ({
  selectedRole,
  confirmedRole,
  embedded = false,
  onAuthenticated,
}: AuthProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [authMode, setAuthMode] = useState<"email" | "phone">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const signupRole = selectedRole;
  const loginRole = confirmedRole ?? getSavedRole();
  const displayRole = mode === "signup" ? signupRole : loginRole;
  const roleProfile = displayRole ? roleProfiles[displayRole] : null;

  const completeAuth = (role?: string) => {
    if (role && isRoleKey(role)) {
      saveRole(role as RoleKey);
    } else {
      const savedRole = getSavedRole();
      if (savedRole) saveRole(savedRole);
    }
    clearPendingRole();
    onAuthenticated?.();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          completeAuth(signupRole || undefined);
        }
      },
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, [signupRole]);

  const isPasswordStrong = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!signupRole) {
          toast.error("Choose your role before creating an account.");
          navigate("/", { replace: true });
          return;
        }

        if (!isPasswordStrong) {
          toast.error("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: signupRole,
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Email already in use. Try signing in instead.");
          } else if (error.message.includes("password")) {
            toast.error("Password should be at least 6 characters.");
          } else {
            toast.error(error.message || "Signup failed");
          }
        } else {
          toast.success("Account created successfully!");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Incorrect email or password.");
          } else if (error.message.includes("not found")) {
            toast.error("Email not found. Create an account first.");
          } else {
            toast.error(error.message || "Sign in failed");
          }
        } else {
          toast.success("Signed in successfully!");
        }
      }
    } catch (err) {
      const error = err as AuthError | Error;
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      // Send OTP
      setLoading(true);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneNumber,
        });

        if (error) {
          toast.error(error.message || "Failed to send OTP");
        } else {
          setOtpSent(true);
          toast.success("OTP sent to your phone!");
        }
      } catch (err) {
        const error = err as Error;
        toast.error(error.message || "Failed to send OTP");
      } finally {
        setLoading(false);
      }
    } else {
      // Verify OTP
      setVerifying(true);
      try {
        const { error } = await supabase.auth.verifyOtp({
          phone: phoneNumber,
          token: otp,
          type: "sms",
        });

        if (error) {
          toast.error(error.message || "Invalid OTP");
        } else {
          toast.success("Phone verified successfully!");
        }
      } catch (err) {
        const error = err as Error;
        toast.error(error.message || "OTP verification failed");
      } finally {
        setVerifying(false);
      }
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            prompt: mode === "signup" ? "consent" : "login",
          },
        },
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed");
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setGoogleLoading(false);
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
        {roleProfile && (
          <div className="mb-6 rounded-2xl bg-primary-soft p-3.5 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {mode === "signup" ? "Signing up as" : "Your role"}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {roleProfile.label}
              </p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "signin"
              ? "Continue your journey with Wise Chicky"
              : "Join us to make a difference in early support"}
          </p>
        </div>

        {/* Auth Mode Selector */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode("email");
              setPhoneNumber("");
              setOtp("");
              setOtpSent(false);
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              authMode === "email"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            <Mail className="h-4 w-4 inline mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode("phone");
              setEmail("");
              setPassword("");
              setFullName("");
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              authMode === "phone"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            <Phone className="h-4 w-4 inline mr-2" />
            Phone
          </button>
        </div>

        {/* Email Auth */}
        {authMode === "email" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

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
                    mode === "signup"
                      ? "Create a strong password (6+ characters)"
                      : "Enter your password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {mode === "signup" && isPasswordStrong && (
                <div className="flex items-center gap-2 mt-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">
                    Strong password
                  </span>
                </div>
              )}
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
        )}

        {/* Phone Auth */}
        {authMode === "phone" && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                  disabled={otpSent}
                  required
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <Label htmlFor="otp" className="text-sm font-medium">
                  Enter OTP
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="pl-10 tracking-widest text-center"
                    maxLength={6}
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 bg-primary hover:bg-primary-hover text-primary-foreground"
              disabled={loading || verifying}
            >
              {loading || verifying
                ? otpSent
                  ? "Verifying..."
                  : "Sending OTP..."
                : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
            </Button>

            {otpSent && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
              >
                Try Different Phone Number
              </Button>
            )}
          </form>
        )}

        {/* Google Auth */}
        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            <svg
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </Button>
        </div>

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
                setFullName("");
                setPhoneNumber("");
                setOtp("");
                setOtpSent(false);
              }}
              className="font-semibold text-primary hover:underline"
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
            enterprise-grade encryption. We never track or sell your data.
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

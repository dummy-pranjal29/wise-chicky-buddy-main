import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import Splash from "@/components/Splash";
import BottomNav, { TabKey } from "@/components/app/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import AssessmentsTab from "@/components/tabs/AssessmentsTab";
import SessionsTab from "@/components/tabs/SessionsTab";
import ResourcesTab from "@/components/tabs/ResourcesTab";
import ProfileTab from "@/components/tabs/ProfileTab";
import VisionTab from "@/components/tabs/VisionTab";
import RoleSelection from "@/components/onboarding/RoleSelection";
import { RoleKey } from "@/data/roles";
import Auth from "./Auth";
import { supabase } from "@/integrations/supabase/client";

type Phase = "splash" | "vision" | "role" | "auth" | "app";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("splash");
  const [tab, setTab] = useState<TabKey>("vision");
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionChecked(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  // Phase progression logic
  useEffect(() => {
    if (!sessionChecked) return;

    // If user is authenticated, go to app
    if (session && selectedRole) {
      setPhase("app");
      return;
    }

    // If splash is done, progress through onboarding
    if (splashDone && phase === "splash") {
      setPhase("vision");
      return;
    }

    // If user hasn't selected role, show role selection
    if (!selectedRole && phase !== "splash" && phase !== "vision") {
      setPhase("role");
      return;
    }

    // If user is not authenticated and has selected role, show auth
    if (!session && selectedRole && phase === "role") {
      setPhase("auth");
      return;
    }

    // If user logs out, return to auth
    if (!session && phase === "app") {
      setPhase("auth");
      return;
    }
  }, [sessionChecked, splashDone, phase, session, selectedRole]);

  const completeSplash = () => {
    setSplashDone(true);
  };

  const selectRole = (role: RoleKey) => {
    setSelectedRole(role);
  };

  const handleAuthenticated = () => {
    // User will be redirected by auth state change listener
  };

  const changeRole = () => {
    setSelectedRole(null);
    setPhase("role");
  };

  return (
    <main className="min-h-screen bg-background mx-auto max-w-[480px] relative">
      {phase === "splash" && <Splash onDone={completeSplash} />}

      {phase === "vision" && (
        <VisionTab showOnboardingActions onContinue={() => setPhase("role")} />
      )}

      {phase === "role" && <RoleSelection onSelect={selectRole} />}

      {phase === "auth" && (
        <Auth embedded onAuthenticated={handleAuthenticated} />
      )}

      {phase === "app" && selectedRole && session && (
        <>
          <div className="pb-24 animate-float-up">
            {tab === "vision" && <VisionTab />}
            {tab === "home" && (
              <HomeTab role={selectedRole} onChangeRole={changeRole} />
            )}
            {tab === "assessments" && <AssessmentsTab />}
            {tab === "sessions" && <SessionsTab />}
            {tab === "resources" && <ResourcesTab />}
            {tab === "profile" && <ProfileTab />}
          </div>
          <BottomNav active={tab} onChange={setTab} />
        </>
      )}
    </main>
  );
};

export default Index;

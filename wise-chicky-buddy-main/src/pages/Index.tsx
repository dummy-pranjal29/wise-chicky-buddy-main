import { useState } from "react";
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
import { clearSavedRole, getSavedRole } from "@/lib/role";
import { useEffect } from "react";

type Phase = "splash" | "vision" | "role" | "auth" | "app";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("splash");
  const [tab, setTab] = useState<TabKey>("vision");
  const [role, setRole] = useState<RoleKey | null>(() => getSavedRole());
  const [pendingRole, setPendingRole] = useState<RoleKey | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionChecked(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const goToNextPhase = () => {
    if (!sessionChecked) return;
    if (session && role) {
      setPhase("app");
      return;
    }
    if (phase === "splash") {
      setPhase("vision");
      return;
    }
    if (!session && role) {
      setPhase("auth");
      return;
    }
    if (!pendingRole) {
      setPhase("role");
      return;
    }
    setPhase("auth");
  };

  useEffect(() => {
    if (!sessionChecked) return;
    if (splashDone && phase === "splash") goToNextPhase();
    if (phase === "app" && !session) setPhase("auth");
    if (phase === "auth" && session && role) setPhase("app");
  }, [sessionChecked, splashDone, phase, session, role, pendingRole]);

  const completeSplash = () => {
    setSplashDone(true);
    goToNextPhase();
  };

  const selectRole = (nextRole: RoleKey) => {
    setPendingRole(nextRole);
    setTab("home");
    setPhase("auth");
  };

  const completeVision = () => {
    goToNextPhase();
  };

  const changeRole = () => {
    clearSavedRole();
    setRole(null);
    setTab("home");
    setPhase("role");
  };

  const handleAuthenticated = () => {
    const savedRole = getSavedRole();
    if (savedRole) setRole(savedRole);
    setPendingRole(null);
    setPhase("app");
  };

  return (
    <main className="min-h-screen bg-background mx-auto max-w-[480px] relative">
      {phase === "splash" && <Splash onDone={completeSplash} />}

      {phase === "vision" && <VisionTab showOnboardingActions onContinue={completeVision} />}

      {phase === "role" && <RoleSelection onSelect={selectRole} />}

      {phase === "auth" && (
        <Auth
          embedded
          selectedRole={pendingRole}
          confirmedRole={role}
          onAuthenticated={handleAuthenticated}
        />
      )}

      {phase === "app" && role && session && (
        <>
          <div className="pb-24 animate-float-up">
            {tab === "vision" && <VisionTab />}
            {tab === "home" && <HomeTab role={role} onChangeRole={changeRole} />}
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

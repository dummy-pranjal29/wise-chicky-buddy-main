import PageHeader from "@/components/app/PageHeader";
import { children } from "@/data/mockData";
import {
  ChevronRight, Bell, Shield, HelpCircle, Globe, Users,
  Info, LogOut, type LucideIcon,
} from "lucide-react";

const SettingsRow = ({
  icon: Icon, label, hint,
}: { icon: LucideIcon; label: string; hint?: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/50 transition text-left">
    <div className="h-9 w-9 rounded-xl bg-primary-soft flex items-center justify-center text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">{label}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </button>
);

const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-5">
    <p className="px-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
      {title}
    </p>
    <div className="mx-5 rounded-2xl bg-card border border-card-border overflow-hidden divide-y divide-card-border">
      {children}
    </div>
  </section>
);

const ProfileTab = () => {
  return (
    <div className="pb-6">
      <PageHeader title="Profile" hero />

      {/* Parent profile */}
      <section className="px-5 -mt-2">
        <div className="rounded-[24px] bg-card border border-card-border p-5 shadow-card flex items-center gap-4">
          <div className="rounded-full p-1 bg-primary-gradient">
            <div className="h-16 w-16 rounded-full bg-card flex items-center justify-center font-display text-2xl text-foreground">
              An
            </div>
          </div>
          <div className="flex-1">
            <p className="font-display text-xl text-foreground leading-none">Ananya Sharma</p>
            <p className="text-xs text-muted-foreground mt-1">Bengaluru, India</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Member since Jan 2026</p>
          </div>
        </div>
      </section>

      {/* Children */}
      <section className="mt-5 px-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Children
        </p>
        <div className="rounded-2xl bg-card border border-card-border divide-y divide-card-border overflow-hidden">
          {children.map((c) => (
            <button key={c.id} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40">
              <div className="h-10 w-10 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold">
                {c.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.age} yrs • {c.classGrade}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <Group title="Account">
        <SettingsRow icon={Users} label="Personal Information" />
        <SettingsRow icon={Globe} label="Language" hint="English" />
        <SettingsRow icon={Bell} label="Notifications" />
      </Group>

      <Group title="Privacy & Security">
        <SettingsRow icon={Shield} label="Data Privacy" hint="DPDP-compliant, India servers" />
      </Group>

      <Group title="Support">
        <SettingsRow icon={HelpCircle} label="Help Center" />
        <SettingsRow icon={Info} label="About Wise Chicky" />
      </Group>

      <button className="w-full mt-6 py-4 text-sm font-semibold text-destructive inline-flex items-center justify-center gap-2">
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </div>
  );
};

export default ProfileTab;

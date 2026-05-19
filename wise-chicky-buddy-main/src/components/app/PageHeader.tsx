import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  hero?: boolean;
}

const PageHeader = ({ title, subtitle, right, hero }: Props) => {
  return (
    <header className={`px-5 pt-6 pb-4 ${hero ? "bg-hero" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] leading-tight text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
    </header>
  );
};

export default PageHeader;

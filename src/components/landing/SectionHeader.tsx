import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn(centered && "text-center", "mb-12", className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#FFCC00]/10 text-[#FFCC00] border border-[#FFCC00]/30 mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

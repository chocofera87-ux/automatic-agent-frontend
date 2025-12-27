import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl bg-card border border-border",
        "hover:border-[#FFCC00]/50 hover:shadow-lg hover:shadow-[#FFCC00]/10",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FFCC00]/10 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-[#FFCC00]" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

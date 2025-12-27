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
        "group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border overflow-hidden",
        "hover:border-[#FFCC00]/50 hover:shadow-2xl hover:shadow-[#FFCC00]/20",
        "transition-all duration-500 ease-out hover:-translate-y-2",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#FFCC00]/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FFCC00]/10 to-transparent rounded-bl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon with animated glow */}
      <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#E6B800] mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-[#FFCC00]/20 group-hover:shadow-[#FFCC00]/40">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#141414]" />
        {/* Animated ring */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-[#FFCC00] opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-[#FFCC00] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom shine effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCC00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function OptionCard({ label, description, icon, isSelected, onClick, className }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full text-left rounded-xl border-2 p-4 transition-all duration-200 group",
        "hover:border-primary/50 hover:bg-accent/50 hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-[0.98]",
        isSelected
          ? "border-primary bg-accent shadow-primary-glow"
          : "border-border bg-card",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
              isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={cn("font-medium text-sm", isSelected ? "text-primary" : "text-foreground")}>
            {label}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            isSelected
              ? "border-primary bg-primary"
              : "border-border",
          )}
        >
          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
        </div>
      </div>
    </button>
  );
}

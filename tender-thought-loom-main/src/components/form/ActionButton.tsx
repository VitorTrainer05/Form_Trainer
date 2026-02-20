import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isSuccess?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, isSuccess, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-60",
          "active:scale-[0.98]",
          size === "sm" && "h-9 px-4 text-xs",
          size === "md" && "h-12 px-6 text-sm",
          size === "lg" && "h-14 px-8 text-base",
          variant === "primary" && [
            "gradient-primary text-primary-foreground shadow-primary-glow",
            "hover:opacity-90 hover:shadow-lg hover:-translate-y-px",
          ],
          variant === "secondary" && [
            "bg-secondary text-secondary-foreground border border-border",
            "hover:bg-secondary/80 hover:border-primary/30",
          ],
          variant === "ghost" && [
            "bg-transparent text-foreground",
            "hover:bg-secondary",
          ],
          variant === "destructive" && [
            "bg-destructive text-destructive-foreground",
            "hover:bg-destructive/90",
          ],
          isSuccess && "bg-success text-success-foreground",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);
ActionButton.displayName = "ActionButton";

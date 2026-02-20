import { cn } from "@/lib/utils";
import React from "react";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  isValid?: boolean;
}

export const StyledInput = React.forwardRef<HTMLInputElement, StyledInputProps>(
  ({ className, hasError, isValid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground ring-offset-background transition-all duration-200",
          "placeholder:text-muted-foreground/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !hasError && !isValid && "border-input focus-visible:ring-primary focus-visible:border-primary",
          hasError && "border-destructive focus-visible:ring-destructive/30 bg-destructive/5",
          isValid && !hasError && "border-success/50 focus-visible:ring-success/30",
          "hover:border-primary/40",
          className,
        )}
        {...props}
      />
    );
  },
);
StyledInput.displayName = "StyledInput";

interface StyledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  isValid?: boolean;
}

export const StyledSelect = React.forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ className, hasError, isValid, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground ring-offset-background transition-all duration-200 appearance-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !hasError && !isValid && "border-input focus-visible:ring-primary focus-visible:border-primary",
          hasError && "border-destructive focus-visible:ring-destructive/30 bg-destructive/5",
          isValid && !hasError && "border-success/50 focus-visible:ring-success/30",
          "hover:border-primary/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
StyledSelect.displayName = "StyledSelect";

interface StyledTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  isValid?: boolean;
}

export const StyledTextarea = React.forwardRef<HTMLTextAreaElement, StyledTextareaProps>(
  ({ className, hasError, isValid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground ring-offset-background transition-all duration-200 resize-none",
          "placeholder:text-muted-foreground/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !hasError && !isValid && "border-input focus-visible:ring-primary focus-visible:border-primary",
          hasError && "border-destructive focus-visible:ring-destructive/30 bg-destructive/5",
          isValid && !hasError && "border-success/50 focus-visible:ring-success/30",
          "hover:border-primary/40",
          className,
        )}
        {...props}
      />
    );
  },
);
StyledTextarea.displayName = "StyledTextarea";

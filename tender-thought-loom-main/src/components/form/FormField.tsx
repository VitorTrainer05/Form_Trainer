import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  isValid?: boolean;
}

export function FormField({ label, required, error, hint, children, className, isValid }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
        {isValid && !error && (
          <CheckCircle2 className="h-4 w-4 text-success animate-scale-in" />
        )}
      </div>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 animate-fade-in">
          <AlertCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

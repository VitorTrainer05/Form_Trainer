import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: { title: string; description?: string }[];
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex items-center flex-1 min-w-0">
              {/* Step node */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={cn(
                    "relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-400",
                    isCurrent && "border-primary bg-primary shadow-primary-glow",
                    (isCompleted || isPast) && !isCurrent && "border-primary bg-primary",
                    !isCurrent && !isCompleted && !isPast && "border-border bg-background",
                  )}
                >
                  {(isCompleted || isPast) && !isCurrent ? (
                    <svg className="h-3.5 w-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={cn("text-[11px] font-bold", isCurrent ? "text-primary-foreground" : "text-muted-foreground")}>
                      {index + 1}
                    </span>
                  )}
                  {isCurrent && <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring opacity-30" />}
                </div>

                {/* Label */}
                <div className="hidden sm:flex flex-col">
                  <span className={cn(
                    "text-[11px] font-semibold leading-tight whitespace-nowrap transition-colors",
                    isCurrent ? "text-primary" : (isCompleted || isPast) ? "text-muted-foreground" : "text-muted-foreground/50",
                  )}>
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-[10px] text-muted-foreground/50">{step.description}</span>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex-1 mx-2 h-px bg-border overflow-hidden rounded-full">
                  <div
                    className="h-full gradient-primary transition-all duration-700"
                    style={{ width: isPast || isCurrent ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile label */}
      <div className="flex items-center justify-between sm:hidden mt-2">
        <span className="text-[11px] text-muted-foreground">Etapa {currentStep + 1}/{steps.length}</span>
        <span className="text-[11px] font-semibold text-primary">{steps[currentStep]?.title}</span>
      </div>
    </div>
  );
}

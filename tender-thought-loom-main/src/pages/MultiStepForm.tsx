import { useState, useCallback } from "react";
import { StepIndicator } from "@/components/form/StepIndicator";
import { ActionButton } from "@/components/form/ActionButton";
import { Step1Personal } from "@/components/form/steps/Step1Personal";
import { Step2Academic } from "@/components/form/steps/Step2Academic";
import { Step3Profile } from "@/components/form/steps/Step3Profile";
import { StepSuccess } from "@/components/form/steps/StepSuccess";
import { FormData, initialFormData } from "@/types/form";
import { ChevronLeft, ChevronRight, Send, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Dados Pessoais", description: "Identificação" },
  { title: "Saúde & Objetivos", description: "Histórico" },
  { title: "PAR-Q", description: "Risco à Saúde" },
];

type ValidationErrors = {
  parq: Partial<Record<keyof FormData["parq"], string>>;
  personal: Partial<Record<keyof FormData["personal"], string>>;
  health: Partial<Record<keyof FormData["health"], string>>;
};

function validateStep(step: number, data: FormData): Partial<Record<string, string>> {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!data.personal.fullName.trim()) errors.fullName = "Nome é obrigatório";
    else if (data.personal.fullName.trim().length < 3) errors.fullName = "Nome deve ter ao menos 3 caracteres";
    if (!data.personal.email.trim()) errors.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) errors.email = "E-mail inválido";
    if (!data.personal.phone.trim()) errors.phone = "Telefone é obrigatório";
    if (!data.personal.age) errors.age = "Idade é obrigatória";
    if (!data.personal.height) errors.height = "Altura é obrigatória";
    if (!data.personal.weight.trim()) errors.weight = "Peso é obrigatório";
  }

  if (step === 1) {
    if (!data.health.hasHealthIssue) errors.hasHealthIssue = "Resposta obrigatória";
    if (!data.health.hasJointPain) errors.hasJointPain = "Resposta obrigatória";
    if (!data.health.hasInjuryOrSurgery) errors.hasInjuryOrSurgery = "Resposta obrigatória";
    if (!data.health.usesSupplements) errors.usesSupplements = "Resposta obrigatória";
    if (!data.health.weeklyAvailability.trim()) errors.weeklyAvailability = "Resposta obrigatória";
    if (!data.health.dailyGymTime.trim()) errors.dailyGymTime = "Resposta obrigatória";
    if (!data.health.sleepHours.trim()) errors.sleepHours = "Resposta obrigatória";
    if (!data.health.sleepQuality) errors.sleepQuality = "Selecione uma opção";
    if (!data.health.fitnessLevel) errors.fitnessLevel = "Selecione uma opção";
    if (!data.health.tiredEasily) errors.tiredEasily = "Resposta obrigatória";
    if (!data.health.mainGoals.trim()) errors.mainGoals = "Resposta obrigatória";
  }

  if (step === 2) {
    const keys: (keyof FormData["parq"])[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];
    for (const key of keys) {
      if (!data.parq[key]) errors[key] = "Resposta obrigatória";
    }
  }

  return errors;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({
    parq: {},
    personal: {},
    health: {},
  });
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const updateParq = useCallback((field: keyof FormData["parq"], value: string) => {
    setFormData((prev) => ({ ...prev, parq: { ...prev.parq, [field]: value } }));
    setErrors((prev) => ({ ...prev, parq: { ...prev.parq, [field]: undefined } }));
  }, []);

  const updatePersonal = useCallback((field: keyof FormData["personal"], value: string) => {
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
    setErrors((prev) => ({ ...prev, personal: { ...prev.personal, [field]: undefined } }));
  }, []);

  const updateHealth = useCallback((field: keyof FormData["health"], value: string) => {
    setFormData((prev) => ({ ...prev, health: { ...prev.health, [field]: value } }));
    setErrors((prev) => ({ ...prev, health: { ...prev.health, [field]: undefined } }));
  }, []);

  const handleNext = async () => {
    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      if (currentStep === 0) setErrors((prev) => ({ ...prev, personal: stepErrors }));
      if (currentStep === 1) setErrors((prev) => ({ ...prev, health: stepErrors }));
      if (currentStep === 2) setErrors((prev) => ({ ...prev, parq: stepErrors }));
      return;
    }

    setDirection("forward");
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);

    if (currentStep === STEPS.length - 1) {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsLoading(false);
      setIsSubmitted(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("back");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({ parq: {}, personal: {}, health: {} });
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsSubmitted(false);
  };

  const isLastStep = currentStep === STEPS.length - 1;
  const animationClass = direction === "forward" ? "animate-fade-in" : "animate-fade-in";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex flex-col items-center justify-start py-6 px-4">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-2xl">
        {/* Header compacto */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-primary-glow">
              <Dumbbell className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">
                <span className="text-gradient">PAR-Q</span> · Vitor Trainer
              </h1>
              <p className="text-[11px] text-muted-foreground">Questionário de Prontidão para Atividade Física</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Seus dados estão protegidos
          </div>
        </div>

        {/* Card principal */}
        <div className="rounded-2xl border bg-card shadow-dramatic overflow-hidden">
          <div className="h-0.5 w-full gradient-primary" />

          {/* Step indicator */}
          <div className="px-6 pt-5 pb-4 border-b bg-secondary/20">
            <StepIndicator steps={STEPS} currentStep={currentStep} completedSteps={completedSteps} />
          </div>

          <div className="p-5 sm:p-6">
            {!isSubmitted ? (
              <>
                <div key={currentStep} className={animationClass}>
                  {currentStep === 0 && (
                    <Step2Academic data={formData.personal} errors={errors.personal} onChange={updatePersonal} />
                  )}
                  {currentStep === 1 && (
                    <Step3Profile data={formData.health} errors={errors.health} onChange={updateHealth} />
                  )}
                  {currentStep === 2 && (
                    <Step1Personal data={formData.parq} errors={errors.parq} onChange={updateParq} />
                  )}
                </div>

                {/* Navegação */}
                <div className="mt-6 flex items-center justify-between gap-4 border-t pt-5">
                  <ActionButton
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                    className={cn(currentStep === 0 && "opacity-0 pointer-events-none")}
                  >
                    Voltar
                  </ActionButton>

                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === currentStep ? "w-5 bg-primary" : "w-1.5 bg-border",
                          completedSteps.includes(i) && i !== currentStep && "bg-primary/40",
                        )}
                      />
                    ))}
                  </div>

                  <ActionButton
                    onClick={handleNext}
                    isLoading={isLoading}
                    rightIcon={isLastStep ? <Send className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  >
                    {isLastStep ? "Enviar Questionário" : "Próximo"}
                  </ActionButton>
                </div>
              </>
            ) : (
              <StepSuccess data={formData} onReset={handleReset} />
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground/60 mt-4">
          © Vitor Trainer · Dados protegidos e não compartilhados com terceiros
        </p>
      </div>
    </div>
  );
}

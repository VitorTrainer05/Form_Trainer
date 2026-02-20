import { FormField } from "@/components/form/FormField";
import { StyledInput, StyledTextarea } from "@/components/form/StyledInputs";
import { HeartPulse, ClipboardList } from "lucide-react";
import { FormData } from "@/types/form";
import { cn } from "@/lib/utils";

interface Step3Props {
  data: FormData["health"];
  errors: Partial<Record<keyof FormData["health"], string>>;
  onChange: (field: keyof FormData["health"], value: string) => void;
}

function YesNoBtn({ value, selected, onClick }: { value: "sim" | "nao"; selected: boolean; onClick: () => void }) {
  const isYes = value === "sim";
  return (
    <button type="button" onClick={onClick} className={cn(
      "h-7 px-3 rounded-lg border-2 text-[11px] font-semibold transition-all duration-150 active:scale-95",
      selected && isYes && "border-destructive bg-destructive/10 text-destructive",
      selected && !isYes && "border-success bg-success/10 text-success",
      !selected && "border-border text-muted-foreground hover:border-primary/40",
    )}>
      {isYes ? "Sim" : "Não"}
    </button>
  );
}

function OptionChip({ label, selected, onClick, variant = "neutral" }: { label: string; selected: boolean; onClick: () => void; variant?: "neutral" | "yes" | "no" }) {
  return (
    <button type="button" onClick={onClick} className={cn(
      "h-7 px-3 rounded-lg border-2 text-[11px] font-semibold transition-all duration-150 active:scale-95",
      selected && variant === "yes" && "border-destructive bg-destructive/10 text-destructive",
      selected && variant === "no" && "border-success bg-success/10 text-success",
      selected && variant === "neutral" && "border-primary bg-primary/10 text-primary",
      !selected && "border-border text-muted-foreground hover:border-primary/40",
    )}>
      {label}
    </button>
  );
}

function HealthRow({ question, detail, yesNoField, detailField, data, errors, onChange }: {
  question: string; detail?: string; yesNoField: keyof FormData["health"]; detailField?: keyof FormData["health"];
  data: FormData["health"]; errors: Partial<Record<keyof FormData["health"], string>>; onChange: (field: keyof FormData["health"], value: string) => void;
}) {
  return (
    <div className={cn(
      "rounded-xl border p-3 space-y-2 transition-all duration-200",
      errors[yesNoField] && "border-destructive/50 bg-destructive/5",
      data[yesNoField] === "sim" && !errors[yesNoField] && "border-destructive/30 bg-destructive/5",
      data[yesNoField] === "nao" && !errors[yesNoField] && "border-success/30 bg-success/5",
      !data[yesNoField] && !errors[yesNoField] && "border-border bg-card hover:border-primary/20",
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground leading-relaxed">{question}</p>
          {detail && <p className="text-[10px] text-muted-foreground mt-0.5">{detail}</p>}
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <YesNoBtn value="nao" selected={data[yesNoField] === "nao"} onClick={() => onChange(yesNoField, "nao")} />
          <YesNoBtn value="sim" selected={data[yesNoField] === "sim"} onClick={() => onChange(yesNoField, "sim")} />
        </div>
      </div>
      {errors[yesNoField] && <p className="text-[10px] text-destructive">{errors[yesNoField]}</p>}
      {data[yesNoField] === "sim" && detailField && (
        <StyledInput placeholder="Especificar..." value={data[detailField] as string} onChange={(e) => onChange(detailField, e.target.value)} className="h-8 text-xs" />
      )}
    </div>
  );
}

export function Step3Profile({ data, errors, onChange }: Step3Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Seção 1: Histórico de Saúde */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
            <HeartPulse className="h-3 w-3 text-primary-foreground" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Histórico de Saúde e Lesões</h2>
        </div>
        <div className="space-y-1.5">
          <HealthRow question="Possui algum problema de saúde?" detail="Ex: Hérnia de disco, Pressão alta, Condromalácia" yesNoField="hasHealthIssue" detailField="healthIssueDetail" data={data} errors={errors} onChange={onChange} />
          <HealthRow question="Sente dor nas articulações?" detail="Ex: Joelho, Ombro, Cotovelo" yesNoField="hasJointPain" detailField="jointPainDetail" data={data} errors={errors} onChange={onChange} />
          <HealthRow question="Possui alguma lesão ou já realizou alguma cirurgia?" yesNoField="hasInjuryOrSurgery" detailField="injuryOrSurgeryDetail" data={data} errors={errors} onChange={onChange} />
          <HealthRow question="Utiliza algum suplemento?" detail="Ex: Creatina, Whey" yesNoField="usesSupplements" detailField="supplementsDetail" data={data} errors={errors} onChange={onChange} />
        </div>
      </div>

      {/* Seção 2: Perguntas Adicionais */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
            <ClipboardList className="h-3 w-3 text-primary-foreground" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Perguntas Adicionais</h2>
        </div>

        <div className="space-y-1.5">
          {/* Disponibilidade - 3 campos em linha */}
          <div className="grid grid-cols-3 gap-1.5">
            <FormField label="Dias/semana" required error={errors.weeklyAvailability} isValid={!!data.weeklyAvailability && !errors.weeklyAvailability}>
              <StyledInput placeholder="Ex: 4x" value={data.weeklyAvailability} onChange={(e) => onChange("weeklyAvailability", e.target.value)} hasError={!!errors.weeklyAvailability} isValid={!!data.weeklyAvailability && !errors.weeklyAvailability} className="h-9 text-sm" />
            </FormField>
            <FormField label="Tempo/dia" required error={errors.dailyGymTime} isValid={!!data.dailyGymTime && !errors.dailyGymTime}>
              <StyledInput placeholder="Ex: 1h" value={data.dailyGymTime} onChange={(e) => onChange("dailyGymTime", e.target.value)} hasError={!!errors.dailyGymTime} isValid={!!data.dailyGymTime && !errors.dailyGymTime} className="h-9 text-sm" />
            </FormField>
            <FormField label="Sono/noite" required error={errors.sleepHours} isValid={!!data.sleepHours && !errors.sleepHours}>
              <StyledInput placeholder="Ex: 7h" value={data.sleepHours} onChange={(e) => onChange("sleepHours", e.target.value)} hasError={!!errors.sleepHours} isValid={!!data.sleepHours && !errors.sleepHours} className="h-9 text-sm" />
            </FormField>
          </div>

          {/* Qualidade do sono + Condicionamento em linha */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className={cn("rounded-xl border p-3 space-y-1.5", errors.sleepQuality ? "border-destructive/50 bg-destructive/5" : "border-border bg-card")}>
              <p className="text-[11px] text-foreground font-medium">Qualidade do sono</p>
              <div className="flex gap-1.5">
                {["Boa", "Regular", "Ruim"].map((opt) => (
                  <OptionChip key={opt} label={opt} selected={data.sleepQuality === opt} onClick={() => onChange("sleepQuality", opt)} variant={opt === "Boa" ? "no" : opt === "Ruim" ? "yes" : "neutral"} />
                ))}
              </div>
              {errors.sleepQuality && <p className="text-[10px] text-destructive">{errors.sleepQuality}</p>}
            </div>

            <div className={cn("rounded-xl border p-3 space-y-1.5", errors.fitnessLevel ? "border-destructive/50 bg-destructive/5" : "border-border bg-card")}>
              <p className="text-[11px] text-foreground font-medium">Condicionamento físico</p>
              <div className="flex gap-1.5">
                {["Baixo", "Médio", "Alto"].map((opt) => (
                  <OptionChip key={opt} label={opt} selected={data.fitnessLevel === opt} onClick={() => onChange("fitnessLevel", opt)} variant="neutral" />
                ))}
              </div>
              {errors.fitnessLevel && <p className="text-[10px] text-destructive">{errors.fitnessLevel}</p>}
            </div>
          </div>

          {/* Cansa facilmente + Desconforto em linha */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className={cn("rounded-xl border p-3 space-y-1.5", errors.tiredEasily ? "border-destructive/50 bg-destructive/5" : "border-border bg-card")}>
              <p className="text-[11px] text-foreground font-medium leading-tight">Cansa facilmente em atividades diárias?</p>
              <div className="flex gap-1.5">
                <OptionChip label="Sim" selected={data.tiredEasily === "Sim"} onClick={() => onChange("tiredEasily", "Sim")} variant="yes" />
                <OptionChip label="Não" selected={data.tiredEasily === "Não"} onClick={() => onChange("tiredEasily", "Não")} variant="no" />
              </div>
              {errors.tiredEasily && <p className="text-[10px] text-destructive">{errors.tiredEasily}</p>}
            </div>

            <div className={cn("rounded-xl border p-3 space-y-1.5", data.discomfortExercise === "Sim" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card")}>
              <p className="text-[11px] text-foreground font-medium leading-tight">Exercício com desconforto extremo?</p>
              <div className="flex gap-1.5">
                <OptionChip label="Não" selected={data.discomfortExercise === "Não"} onClick={() => onChange("discomfortExercise", "Não")} variant="no" />
                <OptionChip label="Sim" selected={data.discomfortExercise === "Sim"} onClick={() => onChange("discomfortExercise", "Sim")} variant="yes" />
              </div>
              {data.discomfortExercise === "Sim" && (
                <StyledInput placeholder="Especificar..." value={data.discomfortExerciseDetail} onChange={(e) => onChange("discomfortExerciseDetail", e.target.value)} className="h-8 text-xs" />
              )}
            </div>
          </div>

          {/* Objetivos */}
          <FormField label="Principais objetivos com a academia" required error={errors.mainGoals} isValid={!!data.mainGoals && !errors.mainGoals}>
            <StyledTextarea placeholder="Descreva seus objetivos..." value={data.mainGoals} onChange={(e) => onChange("mainGoals", e.target.value)} hasError={!!errors.mainGoals} isValid={!!data.mainGoals && !errors.mainGoals} rows={2} />
          </FormField>

          <FormField label="Meta específica (peso, medida ou desempenho)" error={errors.specificGoal} isValid={!!data.specificGoal && !errors.specificGoal}>
            <StyledTextarea placeholder="Descreva sua meta... (opcional)" value={data.specificGoal} onChange={(e) => onChange("specificGoal", e.target.value)} hasError={!!errors.specificGoal} isValid={!!data.specificGoal && !errors.specificGoal} rows={2} />
          </FormField>
        </div>
      </div>
    </div>
  );
}

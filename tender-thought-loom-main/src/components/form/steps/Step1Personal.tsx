import { ShieldAlert, AlertTriangle } from "lucide-react";
import { FormData } from "@/types/form";
import { cn } from "@/lib/utils";

interface Step1Props {
  data: FormData["parq"];
  errors: Partial<Record<keyof FormData["parq"], string>>;
  onChange: (field: keyof FormData["parq"], value: string) => void;
}

const questions: { key: keyof FormData["parq"]; text: string }[] = [
  { key: "q1", text: "Alguma vez o seu médico disse que você possui algum problema cardíaco e que só deveria realizar atividades físicas sob supervisão médica?" },
  { key: "q2", text: "Você sente dor no peito quando pratica atividades físicas?" },
  { key: "q3", text: "Sentiu dor no peito no último mês, mesmo sem realizar esforço físico?" },
  { key: "q4", text: "Já perdeu a consciência ou sofreu quedas devido a tontura?" },
  { key: "q5", text: "Você possui algum problema ósseo ou articular que poderia ser agravado pela prática de atividade física?" },
  { key: "q6", text: "Está tomando algum medicamento para pressão arterial ou coração?" },
  { key: "q7", text: "Conhece alguma outra razão pela qual não deveria realizar atividades físicas?" },
];

function YesNoBtn({ value, selected, onClick }: { value: "sim" | "nao"; selected: boolean; onClick: () => void }) {
  const isYes = value === "sim";
  return (
    <button type="button" onClick={onClick} className={cn(
      "h-7 px-3 rounded-lg border-2 text-[11px] font-semibold transition-all duration-150 active:scale-95 focus-visible:outline-none",
      selected && isYes && "border-destructive bg-destructive/10 text-destructive",
      selected && !isYes && "border-success bg-success/10 text-success",
      !selected && "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
    )}>
      {isYes ? "Sim" : "Não"}
    </button>
  );
}

export function Step1Personal({ data, errors, onChange }: Step1Props) {
  const hasAnyYes = questions.some((q) => data[q.key] === "sim");

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
          <ShieldAlert className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground leading-tight">Perguntas de Risco à Saúde (PAR-Q)</h2>
          <p className="text-[11px] text-muted-foreground">Responda <strong>Sim</strong> ou <strong>Não</strong> com honestidade</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {questions.map((q, idx) => (
          <div key={q.key} className={cn(
            "rounded-xl border px-3 py-2.5 transition-all duration-200",
            errors[q.key] && "border-destructive/50 bg-destructive/5",
            data[q.key] === "sim" && !errors[q.key] && "border-destructive/30 bg-destructive/5",
            data[q.key] === "nao" && !errors[q.key] && "border-success/30 bg-success/5",
            !data[q.key] && !errors[q.key] && "border-border bg-card hover:border-primary/20",
          )}>
            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 h-4 w-4 rounded-full bg-secondary flex items-center justify-center text-[9px] font-bold text-muted-foreground mt-0.5">{idx + 1}</span>
              <p className="flex-1 text-xs text-foreground leading-relaxed">{q.text}</p>
              <div className="flex gap-1.5 flex-shrink-0 ml-2">
                <YesNoBtn value="sim" selected={data[q.key] === "sim"} onClick={() => onChange(q.key, "sim")} />
                <YesNoBtn value="nao" selected={data[q.key] === "nao"} onClick={() => onChange(q.key, "nao")} />
              </div>
            </div>
            {errors[q.key] && <p className="text-[10px] text-destructive mt-1 ml-6">{errors[q.key]}</p>}
          </div>
        ))}
      </div>

      {hasAnyYes && (
        <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 px-3 py-2.5">
          <AlertTriangle className="h-3.5 w-3.5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-foreground leading-relaxed">
            <strong>Atenção:</strong> Você respondeu <strong>Sim</strong> a uma ou mais perguntas. Recomendamos consultar um médico antes de iniciar os exercícios.
          </p>
        </div>
      )}
    </div>
  );
}

import { FormData } from "@/types/form";
import { CheckCircle2, User, Activity, Dumbbell, ShieldAlert } from "lucide-react";
import { ActionButton } from "@/components/form/ActionButton";

interface StepSuccessProps {
  data: FormData;
  onReset: () => void;
}

export function StepSuccess({ data, onReset }: StepSuccessProps) {
  const hasParqYes = (["q1","q2","q3","q4","q5","q6","q7"] as (keyof FormData["parq"])[]).some(
    (k) => data.parq[k] === "sim"
  );

  const hasHealthAlert =
    data.health.hasHealthIssue === "sim" ||
    data.health.hasJointPain === "sim" ||
    data.health.hasInjuryOrSurgery === "sim";

  return (
    <div className="flex flex-col items-center text-center animate-scale-in py-4">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center shadow-primary-glow">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground mb-4">
        <Dumbbell className="h-3.5 w-3.5 text-primary" />
        Vitor Trainer
      </div>

      <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
        Questionário Enviado! 🎉
      </h2>
      <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
        Seu PAR-Q foi recebido com sucesso. Em breve entraremos em contato para dar início ao seu treino.
      </p>

      {(hasParqYes || hasHealthAlert) && (
        <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 max-w-sm">
          <p className="text-sm text-foreground">
            ⚠️ Você sinalizou condições de saúde que serão avaliadas pelo profissional antes de iniciar as atividades.
          </p>
        </div>
      )}

      {/* Resumo */}
      <div className="mt-6 w-full max-w-sm rounded-2xl border bg-card shadow-elevated overflow-hidden">
        <div className="px-5 py-4 bg-accent/30 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resumo do Cadastro</p>
        </div>
        <div className="divide-y">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="text-sm font-medium text-foreground">{data.personal.fullName || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Idade / Peso / Altura</p>
              <p className="text-sm font-medium text-foreground">
                {data.personal.age} anos · {data.personal.weight} · {data.personal.height} cm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">PAR-Q</p>
              <p className="text-sm font-medium text-foreground">
                {hasParqYes ? "⚠️ Possui alertas médicos" : "✓ Sem alertas médicos"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Condicionamento</p>
              <p className="text-sm font-medium text-foreground">{data.health.fitnessLevel || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-sm">
        <ActionButton variant="secondary" className="w-full" onClick={onReset}>
          Novo questionário
        </ActionButton>
      </div>
    </div>
  );
}

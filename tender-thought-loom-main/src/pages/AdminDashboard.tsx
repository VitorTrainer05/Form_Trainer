import { useState } from "react";
import { FormData } from "@/types/form";
import {
  Users, Search, Filter, Eye,
  CheckCircle2, Clock, XCircle, TrendingUp,
  ArrowUpRight, ChevronDown, Download,
  RefreshCw, Activity, AlertTriangle, Dumbbell, HeartPulse, ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/components/form/ActionButton";

const blankHealth: FormData["health"] = {
  hasHealthIssue: "nao", healthIssueDetail: "",
  hasJointPain: "nao", jointPainDetail: "",
  hasInjuryOrSurgery: "nao", injuryOrSurgeryDetail: "",
  usesSupplements: "nao", supplementsDetail: "",
  weeklyAvailability: "", dailyGymTime: "", sleepHours: "",
  sleepQuality: "", fitnessLevel: "", tiredEasily: "",
  discomfortExercise: "", discomfortExerciseDetail: "",
  mainGoals: "", specificGoal: "",
};

const MOCK_SUBMISSIONS: Array<{
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  data: FormData;
}> = [
  {
    id: "PAR-001",
    submittedAt: "2024-02-15T10:30:00",
    status: "pending",
    data: {
      parq: { q1: "nao", q2: "nao", q3: "nao", q4: "nao", q5: "nao", q6: "nao", q7: "nao" },
      personal: { fullName: "Ana Carolina Silva", email: "ana@email.com", phone: "+55 (11) 99999-1111", age: "24", height: "165", weight: "60kg", trainingTime: "6 meses" },
      health: { ...blankHealth, usesSupplements: "sim", supplementsDetail: "Whey protein", weeklyAvailability: "4x", dailyGymTime: "1 hora", sleepHours: "7", sleepQuality: "Boa", fitnessLevel: "Médio", tiredEasily: "Não", discomfortExercise: "Não", mainGoals: "Emagrecimento e condicionamento", specificGoal: "Perder 5kg em 3 meses" },
    },
  },
  {
    id: "PAR-002",
    submittedAt: "2024-02-15T11:15:00",
    status: "approved",
    data: {
      parq: { q1: "nao", q2: "nao", q3: "nao", q4: "nao", q5: "sim", q6: "nao", q7: "nao" },
      personal: { fullName: "Bruno Martins Costa", email: "bruno@email.com", phone: "+55 (21) 98888-2222", age: "26", height: "180", weight: "82kg", trainingTime: "2 anos" },
      health: { ...blankHealth, hasJointPain: "sim", jointPainDetail: "Dor no joelho direito", hasInjuryOrSurgery: "sim", injuryOrSurgeryDetail: "Cirurgia no joelho em 2021", usesSupplements: "sim", supplementsDetail: "Creatina e Whey", weeklyAvailability: "5x", dailyGymTime: "1h30", sleepHours: "8", sleepQuality: "Boa", fitnessLevel: "Alto", tiredEasily: "Não", discomfortExercise: "Sim", discomfortExerciseDetail: "Agachamento profundo", mainGoals: "Hipertrofia", specificGoal: "Ganhar 5kg de massa muscular" },
    },
  },
  {
    id: "PAR-003",
    submittedAt: "2024-02-15T14:00:00",
    status: "approved",
    data: {
      parq: { q1: "nao", q2: "nao", q3: "nao", q4: "nao", q5: "nao", q6: "nao", q7: "nao" },
      personal: { fullName: "Carla Fernanda Souza", email: "carla@email.com", phone: "+55 (31) 97777-3333", age: "23", height: "162", weight: "55kg", trainingTime: "" },
      health: { ...blankHealth, weeklyAvailability: "3x", dailyGymTime: "45 min", sleepHours: "7", sleepQuality: "Regular", fitnessLevel: "Médio", tiredEasily: "Não", discomfortExercise: "Não", mainGoals: "Saúde e bem-estar" },
    },
  },
  {
    id: "PAR-004",
    submittedAt: "2024-02-16T09:45:00",
    status: "rejected",
    data: {
      parq: { q1: "sim", q2: "sim", q3: "nao", q4: "nao", q5: "nao", q6: "sim", q7: "nao" },
      personal: { fullName: "Diego Luiz Ramos", email: "diego@email.com", phone: "+55 (41) 96666-4444", age: "30", height: "175", weight: "90kg", trainingTime: "1 ano" },
      health: { ...blankHealth, hasHealthIssue: "sim", healthIssueDetail: "Pressão alta", hasJointPain: "sim", jointPainDetail: "Dor no ombro", weeklyAvailability: "2x", dailyGymTime: "1 hora", sleepHours: "5", sleepQuality: "Ruim", fitnessLevel: "Baixo", tiredEasily: "Sim", discomfortExercise: "Sim", discomfortExerciseDetail: "Supino e desenvolvimento", mainGoals: "Perder peso e melhorar saúde", specificGoal: "Perder 15kg" },
    },
  },
  {
    id: "PAR-005",
    submittedAt: "2024-02-16T16:20:00",
    status: "pending",
    data: {
      parq: { q1: "nao", q2: "nao", q3: "nao", q4: "nao", q5: "nao", q6: "nao", q7: "nao" },
      personal: { fullName: "Eduarda Lima Pereira", email: "edu@email.com", phone: "+55 (51) 95555-5555", age: "21", height: "168", weight: "58kg", trainingTime: "3 meses" },
      health: { ...blankHealth, usesSupplements: "sim", supplementsDetail: "Creatina", weeklyAvailability: "5x", dailyGymTime: "1h15", sleepHours: "8", sleepQuality: "Boa", fitnessLevel: "Alto", tiredEasily: "Não", discomfortExercise: "Não", mainGoals: "Desempenho esportivo e hipertrofia", specificGoal: "Melhorar tempo de corrida" },
    },
  },
];

const statusConfig = {
  pending: { label: "Pendente", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  approved: { label: "Aprovado", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejeitado", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const parqQuestions = [
  { key: "q1" as const, short: "Problema cardíaco" },
  { key: "q2" as const, short: "Dor no peito (esforço)" },
  { key: "q3" as const, short: "Dor no peito (repouso)" },
  { key: "q4" as const, short: "Tontura / desmaio" },
  { key: "q5" as const, short: "Problema ósseo/articular" },
  { key: "q6" as const, short: "Medicação cardíaca" },
  { key: "q7" as const, short: "Outra restrição médica" },
];

type Status = "pending" | "approved" | "rejected";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.data.personal.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const selected = submissions.find((s) => s.id === selectedId);
  const updateStatus = (id: string, status: Status) =>
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsRefreshing(false);
  };

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
  };

  const hasParqAlert = (parq: FormData["parq"]) =>
    (["q1","q2","q3","q4","q5","q6","q7"] as (keyof typeof parq)[]).some((k) => parq[k] === "sim");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Dumbbell className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">Vitor Trainer</span>
              <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">Painel PAR-Q</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ActionButton variant="secondary" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} className="hidden sm:inline-flex">
              Exportar
            </ActionButton>
            <ActionButton size="sm" onClick={() => (window.location.href = "/")} leftIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
              Ver formulário
            </ActionButton>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total", value: stats.total, icon: Users, color: "text-primary", bg: "bg-accent" },
            { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
            { label: "Aprovados", value: stats.approved, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
            { label: "Rejeitados", value: stats.rejected, icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span>questionários</span>
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Table */}
          <div className={cn("rounded-xl border bg-card shadow-soft overflow-hidden", selectedId ? "lg:col-span-3" : "lg:col-span-5")}>
            <div className="p-4 border-b flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <input type="text" placeholder="Buscar por nome ou ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-full rounded-lg border bg-secondary/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as Status | "all")} className="h-9 rounded-lg border bg-secondary/50 pl-8 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer">
                    <option value="all">Todos</option>
                    <option value="pending">Pendente</option>
                    <option value="approved">Aprovado</option>
                    <option value="rejected">Rejeitado</option>
                  </select>
                  <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60 pointer-events-none" />
                </div>
                <button onClick={handleRefresh} className="h-9 w-9 flex items-center justify-center rounded-lg border bg-secondary/50 hover:bg-secondary transition-colors">
                  <RefreshCw className={cn("h-4 w-4 text-muted-foreground", isRefreshing && "animate-spin")} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary/30">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aluno</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Condicionamento</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">PAR-Q</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground text-sm">Nenhum questionário encontrado.</td></tr>
                  ) : filtered.map((submission) => {
                    const status = statusConfig[submission.status];
                    const StatusIcon = status.icon;
                    const isSelected = selectedId === submission.id;
                    const parqAlert = hasParqAlert(submission.data.parq);

                    return (
                      <tr key={submission.id} className={cn("hover:bg-secondary/30 cursor-pointer transition-colors", isSelected && "bg-accent/40")} onClick={() => setSelectedId(isSelected ? null : submission.id)}>
                        <td className="px-4 py-3.5"><span className="font-mono text-xs text-muted-foreground">{submission.id}</span></td>
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-foreground truncate max-w-[150px]">{submission.data.personal.fullName}</p>
                          <p className="text-xs text-muted-foreground">{submission.data.personal.age} anos · {submission.data.personal.weight}</p>
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <span className="text-xs font-medium text-foreground">{submission.data.health.fitnessLevel || "—"}</span>
                        </td>
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          {parqAlert ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning"><AlertTriangle className="h-3 w-3" />Atenção</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success"><CheckCircle2 className="h-3 w-3" />OK</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", status.className)}>
                            <StatusIcon className="h-3 w-3" />{status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedId(isSelected ? null : submission.id); }} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            <Eye className="h-3.5 w-3.5" /><span className="hidden sm:inline">Ver</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t px-4 py-3">
              <p className="text-xs text-muted-foreground">{filtered.length} de {submissions.length} questionários</p>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="lg:col-span-2 rounded-xl border bg-card shadow-soft overflow-hidden animate-fade-in">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">Detalhes</p>
                  <p className="text-xs text-muted-foreground font-mono">{selected.id}</p>
                </div>
                <button onClick={() => setSelectedId(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                  <XCircle className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                    {selected.data.personal.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selected.data.personal.fullName}</p>
                    <p className="text-xs text-muted-foreground">{selected.data.personal.age} anos · {selected.data.personal.height} cm · {selected.data.personal.weight}</p>
                  </div>
                </div>

                {/* PAR-Q */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="h-3 w-3" />Respostas PAR-Q
                  </p>
                  <div className="rounded-lg border overflow-hidden">
                    {parqQuestions.map((q, idx) => {
                      const isYes = selected.data.parq[q.key] === "sim";
                      return (
                        <div key={q.key} className={cn("flex items-center justify-between px-3 py-2 text-xs", idx !== 0 && "border-t", isYes && "bg-destructive/5")}>
                          <span className="text-muted-foreground flex-1 pr-2">{q.short}</span>
                          <span className={cn("font-semibold flex-shrink-0", isYes ? "text-destructive" : "text-success")}>{isYes ? "Sim ⚠️" : "Não"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Saúde */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <HeartPulse className="h-3 w-3" />Saúde e Lesões
                  </p>
                  <div className="rounded-lg border overflow-hidden">
                    {[
                      { label: "Problema de saúde", field: "hasHealthIssue" as const, detail: "healthIssueDetail" as const },
                      { label: "Dor nas articulações", field: "hasJointPain" as const, detail: "jointPainDetail" as const },
                      { label: "Lesão ou cirurgia", field: "hasInjuryOrSurgery" as const, detail: "injuryOrSurgeryDetail" as const },
                      { label: "Usa suplementos", field: "usesSupplements" as const, detail: "supplementsDetail" as const },
                    ].map((q, idx) => {
                      const isYes = selected.data.health[q.field] === "sim";
                      const detail = selected.data.health[q.detail];
                      return (
                        <div key={q.field} className={cn("px-3 py-2 text-xs", idx !== 0 && "border-t", isYes && "bg-destructive/5")}>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{q.label}</span>
                            <span className={cn("font-semibold", isYes ? "text-destructive" : "text-success")}>{isYes ? "Sim ⚠️" : "Não"}</span>
                          </div>
                          {isYes && detail && <p className="text-muted-foreground mt-1 italic">{detail}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Perguntas adicionais */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Activity className="h-3 w-3" />Perguntas Adicionais
                  </p>
                  <div className="rounded-lg border p-3 space-y-1.5 bg-secondary/20">
                    {[
                      { label: "Disponibilidade", value: selected.data.health.weeklyAvailability },
                      { label: "Tempo/dia", value: selected.data.health.dailyGymTime },
                      { label: "Horas de sono", value: selected.data.health.sleepHours },
                      { label: "Qualidade do sono", value: selected.data.health.sleepQuality },
                      { label: "Condicionamento", value: selected.data.health.fitnessLevel },
                      { label: "Cansa fácil", value: selected.data.health.tiredEasily },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <span className="text-xs font-medium text-foreground">{value || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Objetivos */}
                {selected.data.health.mainGoals && (
                  <div className="rounded-lg border border-border bg-secondary/20 p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Objetivos</p>
                    <p className="text-xs text-foreground">{selected.data.health.mainGoals}</p>
                    {selected.data.health.specificGoal && (
                      <p className="text-xs text-muted-foreground mt-1 italic">{selected.data.health.specificGoal}</p>
                    )}
                  </div>
                )}

                {/* Alterar status */}
                <div className="space-y-2 pt-2 border-t">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Alterar status</p>
                  <div className="flex gap-2">
                    {(["approved", "pending", "rejected"] as Status[]).map((s) => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)} className={cn("flex-1 h-9 rounded-lg border-2 text-xs font-semibold transition-all duration-200",
                        selected.status === s
                          ? s === "approved" ? "border-success bg-success/10 text-success"
                            : s === "pending" ? "border-warning bg-warning/10 text-warning"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-border text-muted-foreground hover:border-primary/30",
                      )}>
                        {s === "approved" ? "✓ Aprovar" : s === "pending" ? "⏳ Pendente" : "✕ Rejeitar"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

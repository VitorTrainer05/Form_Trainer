import { FormField } from "@/components/form/FormField";
import { StyledInput } from "@/components/form/StyledInputs";
import { User, Mail, Phone, Ruler, Weight, Clock } from "lucide-react";
import { FormData } from "@/types/form";
import { cn } from "@/lib/utils";

interface Step2Props {
  data: FormData["personal"];
  errors: Partial<Record<keyof FormData["personal"], string>>;
  onChange: (field: keyof FormData["personal"], value: string) => void;
}

function AgeSlider({ value, onChange, hasError }: { value: string; onChange: (v: string) => void; hasError?: boolean }) {
  const age = parseInt(value) || 25;
  const min = 14;
  const max = 100;
  const pct = ((age - min) / (max - min)) * 100;

  return (
    <div className={cn("rounded-xl border p-3 transition-all duration-200", hasError ? "border-destructive/50 bg-destructive/5" : "border-border bg-card hover:border-primary/30")}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-muted-foreground">{min} anos</span>
        <div className={cn("flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border", hasError ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-primary/10 text-primary border-primary/20")}>
          <User className="h-3 w-3" />{age} anos
        </div>
        <span className="text-[10px] text-muted-foreground">{max} anos</span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-secondary" />
        <div className="absolute h-1.5 rounded-full bg-primary transition-all duration-100" style={{ width: `${pct}%` }} />
        <input type="range" min={min} max={max} value={age} onChange={(e) => onChange(e.target.value)} className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <div className={cn("absolute h-4 w-4 rounded-full border-2 shadow-md pointer-events-none transition-all", hasError ? "bg-white border-destructive" : "bg-white border-primary shadow-primary-glow")} style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        {[14, 25, 40, 55, 70, 85, 100].map((v) => (
          <div key={v} className="flex flex-col items-center gap-0.5">
            <div className={cn("w-px h-1 rounded-full", age >= v ? "bg-primary/40" : "bg-border")} />
            <span className={cn("text-[9px]", age === v ? "text-primary font-bold" : "text-muted-foreground/40")}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeightInput({ value, onChange, hasError }: { value: string; onChange: (v: string) => void; hasError?: boolean }) {
  const height = parseInt(value) || 170;
  const min = 140;
  const max = 210;
  const pct = ((height - min) / (max - min)) * 100;

  return (
    <div className={cn("rounded-xl border p-3 transition-all duration-200", hasError ? "border-destructive/50 bg-destructive/5" : "border-border bg-card hover:border-primary/30")}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <Ruler className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">140cm</span>
        </div>
        <div className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold border", hasError ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-primary/10 text-primary border-primary/20")}>
          {height} cm
        </div>
        <span className="text-[10px] text-muted-foreground">210cm</span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-secondary" />
        <div className="absolute h-1.5 rounded-full bg-primary transition-all duration-100" style={{ width: `${pct}%` }} />
        <input type="range" min={min} max={max} value={height} onChange={(e) => onChange(e.target.value)} className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <div className={cn("absolute h-4 w-4 rounded-full border-2 shadow-md pointer-events-none", hasError ? "bg-white border-destructive" : "bg-white border-primary shadow-primary-glow")} style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        {[140, 155, 170, 185, 200, 210].map((v) => (
          <div key={v} className="flex flex-col items-center gap-0.5">
            <div className={cn("w-px h-1 rounded-full", height >= v ? "bg-primary/40" : "bg-border")} />
            <span className={cn("text-[9px]", height === v ? "text-primary font-bold" : "text-muted-foreground/40")}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Step2Academic({ data, errors, onChange }: Step2Props) {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary flex-shrink-0">
          <User className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground leading-tight">Informações Pessoais</h2>
          <p className="text-[11px] text-muted-foreground">Preencha todos os campos obrigatórios</p>
        </div>
      </div>

      {/* Nome */}
      <FormField label="Nome Completo" required error={errors.fullName} isValid={!!data.fullName && !errors.fullName}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
          <StyledInput placeholder="Seu nome completo" value={data.fullName} onChange={(e) => onChange("fullName", e.target.value)} hasError={!!errors.fullName} isValid={!!data.fullName && !errors.fullName} className="pl-9 h-10" />
        </div>
      </FormField>

      {/* E-mail + Telefone */}
      <div className="grid grid-cols-2 gap-2">
        <FormField label="E-mail" required error={errors.email} isValid={!!data.email && !errors.email}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
            <StyledInput type="email" placeholder="seuemail@exemplo.com" value={data.email} onChange={(e) => onChange("email", e.target.value)} hasError={!!errors.email} isValid={!!data.email && !errors.email} className="pl-9 h-10 text-sm" />
          </div>
        </FormField>
        <FormField label="Telefone / WhatsApp" required error={errors.phone} isValid={!!data.phone && !errors.phone}>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
            <StyledInput type="tel" placeholder="+55 (62) 9 9999-9999" value={data.phone} onChange={(e) => onChange("phone", e.target.value)} hasError={!!errors.phone} isValid={!!data.phone && !errors.phone} className="pl-9 h-10 text-sm" />
          </div>
        </FormField>
      </div>

      {/* Idade */}
      <FormField label="Idade" required error={errors.age}>
        <AgeSlider value={data.age} onChange={(v) => onChange("age", v)} hasError={!!errors.age} />
      </FormField>

      {/* Altura */}
      <FormField label="Altura" required error={errors.height}>
        <HeightInput value={data.height} onChange={(v) => onChange("height", v)} hasError={!!errors.height} />
      </FormField>

      {/* Peso + Tempo de treino */}
      <div className="grid grid-cols-2 gap-2">
        <FormField label="Peso" required error={errors.weight} isValid={!!data.weight && !errors.weight}>
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
            <StyledInput placeholder="Ex: 70 kg" value={data.weight} onChange={(e) => onChange("weight", e.target.value)} hasError={!!errors.weight} isValid={!!data.weight && !errors.weight} className="pl-9 h-10" />
          </div>
        </FormField>
        <FormField label="Tempo de treino" error={errors.trainingTime} isValid={!!data.trainingTime && !errors.trainingTime}>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
            <StyledInput placeholder="Ex: 6 meses (opcional)" value={data.trainingTime} onChange={(e) => onChange("trainingTime", e.target.value)} hasError={!!errors.trainingTime} isValid={!!data.trainingTime && !errors.trainingTime} className="pl-9 h-10" />
          </div>
        </FormField>
      </div>
    </div>
  );
}

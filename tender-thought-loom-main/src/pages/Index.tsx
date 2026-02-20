import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Users, BarChart3, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground mb-6">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Sistema de Inscrições
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          <span className="text-gradient">Formulário Premium</span>
          <br />
          <span className="text-foreground">Multi-etapas</span>
        </h1>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Sistema completo de inscrições com painel administrativo, validação em tempo real e UX de nível SaaS internacional.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl gradient-primary text-primary-foreground text-sm font-medium shadow-primary-glow hover:opacity-90 transition-all"
          >
            <Zap className="h-4 w-4" />
            Abrir Formulário
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border bg-card text-foreground text-sm font-medium hover:bg-secondary transition-all"
          >
            <BarChart3 className="h-4 w-4" />
            Painel Admin
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: Zap, label: "Multi-etapas", desc: "3 passos fluidos" },
            { icon: Users, label: "Admin Panel", desc: "Gestão completa" },
            { icon: BarChart3, label: "Analytics", desc: "Métricas em tempo real" },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border bg-card p-3 shadow-soft">
              <f.icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
              <p className="text-xs font-medium text-foreground">{f.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

import { BarChart3, Users, Clock, MousePointerClick } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-secondary tracking-tight">Analytics</h1>
      <p className="text-secondary/60">Monitoreo de comportamiento y tráfico recolectado mediante las cookies web con fines publicitarios.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Visitantes Únicos", value: "8,450", trend: "+12%", icon: <Users size={24} className="text-primary" /> },
          { label: "Tiempo Promedio", value: "2m 45s", trend: "+5%", icon: <Clock size={24} className="text-primary" /> },
          { label: "Clics en Cotizar", value: "342", trend: "+8%", icon: <MousePointerClick size={24} className="text-primary" /> },
          { label: "Tasa de Rebote", value: "32%", trend: "-2%", icon: <BarChart3 size={24} className="text-primary" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col items-start gap-4">
            <div className="p-3 bg-muted rounded-xl">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-secondary/50">{stat.label}</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-secondary">{stat.value}</span>
                <span className="text-sm font-bold text-accent">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm min-h-[400px] flex items-center justify-center">
        <p className="text-secondary/50 font-medium">Gráfico de Tráfico Interactivo (Recopilación desde CookieConsent)</p>
      </div>
    </div>
  );
}

import * as React from "react";
import { Users, FolderKanban, Zap, Activity, Clock } from "lucide-react";
import { getDB } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const db = await getDB();
  const leads = await db.all('SELECT * FROM quotes ORDER BY id DESC');
  
  const activeLeadsCount = leads.filter(l => l.stage !== 'Ganado' && l.stage !== 'Perdido').length;
  const recentLeads = leads.slice(0, 5);

  const metrics = [
    { label: "Leads Activos", value: activeLeadsCount.toString(), change: "Última act. reciente", icon: <Users size={24} className="text-blue-500" /> },
    { label: "Proyectos Publicados", value: "12", change: "2 agregados esta sem", icon: <FolderKanban size={24} className="text-orange-500" /> },
    { label: "Potencia Total (MWp)", value: "3.5", change: "Objetivo: 5MWp", icon: <Zap size={24} className="text-yellow-500" /> },
    { label: "Tráfico / Sesiones", value: "850", change: "+45% vs mes anterior", icon: <Activity size={24} className="text-accent" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-secondary tracking-tight">Dashboard General</h1>
        <p className="text-secondary/60">Bienvenido al panel de control de Voltac Energy.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-secondary/5 rounded-xl">{m.icon}</div>
            </div>
            <div>
              <p className="text-secondary/60 font-medium text-sm mb-1">{m.label}</p>
              <h3 className="text-3xl font-black tracking-tighter text-secondary">{m.value}</h3>
              <p className="text-xs text-secondary/40 font-medium mt-2">{m.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full">
           <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock size={18} className="text-secondary/50"/> Últimos Leads Registrados</h3>
           <div className="space-y-4 flex-1">
             {recentLeads.length === 0 ? (
                <p className="text-sm text-secondary/50 italic py-6 text-center">No hay leads todavía.</p>
             ) : (
               recentLeads.map((lead: any) => (
                 <div key={lead.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border">
                   <div>
                     <p className="font-bold text-sm text-secondary flex items-center gap-2">
                       {lead.fullName} {lead.priority === 'Alta' && <span className="w-2 h-2 rounded-full bg-red-500" title="Prioridad Alta"/>}
                     </p>
                     <p className="text-xs text-secondary/60 mt-1 capitalize">{lead.modality} · {new Date(lead.createdAt).toLocaleDateString('es-CO')}</p>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                     <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-md uppercase tracking-wider">{lead.stage}</span>
                     <span className="text-[10px] text-secondary/40 uppercase">{lead.source}</span>
                   </div>
                 </div>
               ))
             )}
           </div>
         </div>

         <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full">
           <h3 className="font-bold text-lg mb-4">Proyectos Recientes (Simulado)</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border">
                 <div className="flex gap-4 items-center">
                   <div className="w-12 h-12 bg-secondary/10 rounded-lg shrink-0"></div>
                   <div>
                     <p className="font-bold text-sm">Planta Solar Zona Norte {i}</p>
                     <p className="text-xs text-secondary/60">Cartagena - 250 kWp</p>
                   </div>
                 </div>
                 <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full uppercase tracking-wider">Publicado</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}

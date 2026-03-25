"use client";

import * as React from "react";
import { Users, FolderKanban, Zap, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const metrics = [
    { label: "Leads Activos", value: "24", change: "+12% vs mes anterior", icon: <Users size={24} className="text-blue-500" /> },
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
         <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
           <h3 className="font-bold text-lg mb-4">Últimos Leads (Simulado)</h3>
           <div className="space-y-4">
             {[1,2,3].map(i => (
               <div key={i} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border">
                 <div>
                   <p className="font-bold text-sm">Empresa Industrial S.A. {i}</p>
                   <p className="text-xs text-secondary/60">Modalidad 3 - Hace 2 horas</p>
                 </div>
                 <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded-full">Nuevo</span>
               </div>
             ))}
           </div>
         </div>

         <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
           <h3 className="font-bold text-lg mb-4">Proyectos Recientes (Simulado)</h3>
           <div className="space-y-4">
             {[1,2].map(i => (
               <div key={i} className="flex justify-between items-center p-4 bg-muted/30 rounded-xl border border-border">
                 <div className="flex gap-4 items-center">
                   <div className="w-12 h-12 bg-secondary/10 rounded-lg"></div>
                   <div>
                     <p className="font-bold text-sm">Planta Solar Zona Norte {i}</p>
                     <p className="text-xs text-secondary/60">Cartagena - 250 kWp</p>
                   </div>
                 </div>
                 <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">Publicado</span>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Users, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLeadsPage() {
  const MOCK_LEADS = [
    { id: 1, name: "Juan Pérez", modal: "1 - Express", date: "24 Mar, 10:00 AM", status: "Nuevo" },
    { id: 2, name: "Empresa S.A.", modal: "3 - Detallada", date: "23 Mar, 14:30 PM", status: "En Gestión" },
    { id: 3, name: "Hotel del Mar", modal: "2 - Manual", date: "21 Mar, 09:15 AM", status: "Cotizado" },
    { id: 4, name: "Carlos Ruiz", modal: "1 - Express", date: "20 Mar, 16:45 PM", status: "Cerrado" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">CRM de Leads</h1>
          <p className="text-secondary/60">Gestiona las solicitudes de cotización ingresadas por el sitio web.</p>
        </div>
        <Button variant="default">Exportar CSV</Button>
      </div>

      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 w-5 h-5" />
              <input type="text" placeholder="Buscar por nombre, correo..." className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white" />
            </div>
            <button className="p-2 border border-border rounded-xl bg-white hover:bg-muted text-secondary/60 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/5 text-secondary/60 uppercase tracking-widest text-xs font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Est.</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Nombre / Empresa</th>
                <th className="px-6 py-4">Modalidad</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_LEADS.map(lead => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                       lead.status === "Nuevo" ? "bg-accent/10 text-accent" :
                       lead.status === "En Gestión" ? "bg-yellow-500/10 text-yellow-600" :
                       lead.status === "Cotizado" ? "bg-blue-500/10 text-blue-600" :
                       "bg-green-500/10 text-green-600"
                     }`}>
                       {lead.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-secondary/60">{lead.date}</td>
                  <td className="px-6 py-4 font-bold text-secondary">{lead.name}</td>
                  <td className="px-6 py-4 text-secondary/80">{lead.modal}</td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-primary/70 font-semibold underline underline-offset-4 decoration-primary/30">
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_LEADS.length === 0 && (
             <div className="text-center py-12 text-secondary/40 font-light flex flex-col items-center justify-center space-y-3">
                <Users size={32}/>
                <p>No hay leads registrados aún.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

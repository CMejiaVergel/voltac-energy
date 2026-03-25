"use client";

import * as React from "react";
import { FolderKanban, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProyectosPage() {
  const MOCK_PROYECTOS = [
    { id: 1, name: "Planta Industrial Zona Franca", power: "250 kWp", type: "On-Grid", status: "Publicado" },
    { id: 2, name: "Eco-Hotel Barú", power: "65 kWp", type: "Off-Grid", status: "Publicado" },
    { id: 3, name: "Condominio Norte", power: "12.5 kWp", type: "On-Grid", status: "Oculto" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Gestión de Proyectos</h1>
          <p className="text-secondary/60">Agrega, edita y publica las instalaciones que alimentarán tu vista pública.</p>
        </div>
        <Button variant="accent" className="flex items-center gap-2 font-bold uppercase shadow-accent/20">
          <Plus size={18} /> Nuevo Proyecto
        </Button>
      </div>

      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/5 text-secondary/60 uppercase tracking-widest text-xs font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">Nom. Proyecto</th>
                <th className="px-6 py-4">Potencia</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PROYECTOS.map(p => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-secondary">{p.name}</td>
                  <td className="px-6 py-4 text-secondary/80">{p.power}</td>
                  <td className="px-6 py-4 text-secondary/80">{p.type}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                       p.status === "Publicado" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary/60"
                     }`}>
                       {p.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-secondary/40 hover:text-secondary p-2 transition-colors">
                      <MoreHorizontal size={20}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {MOCK_PROYECTOS.length === 0 && (
             <div className="text-center py-12 text-secondary/40 font-light flex flex-col items-center justify-center space-y-3">
                <FolderKanban size={32}/>
                <p>No has agregado proyectos aún.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

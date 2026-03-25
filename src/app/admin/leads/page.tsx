import * as React from "react";
import { Users, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { join } from 'path';

export const dynamic = 'force-dynamic';

async function getLeads() {
  try {
    const db = await open({
      filename: join(process.cwd(), 'voltac.db'),
      driver: sqlite3.Database
    });
    const records = await db.all('SELECT * FROM quotes ORDER BY id DESC');
    return records;
  } catch (e) {
    console.error("DB error", e);
    return [];
  }
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">CRM de Cotizaciones</h1>
          <p className="text-secondary/60">Gestiona las solicitudes reales ingresadas por el sitio web (Sincronizado con voltac.db).</p>
        </div>
        <Button variant="default" className="gap-2">
          <Download size={16}/> Exportar CSV
        </Button>
      </div>

      <div className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-secondary/5 text-secondary/60 uppercase tracking-widest text-xs font-bold border-b border-border">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Nombre / Empresa</th>
                <th className="px-6 py-4">Modalidad</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Detalles / Docs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-black tracking-tighter text-secondary/40 text-lg">#{lead.id}</td>
                  <td className="px-6 py-4 text-secondary/60 font-medium">
                    {new Date(lead.createdAt).toLocaleDateString('es-CO')}
                    <span className="block text-xs font-light">{new Date(lead.createdAt).toLocaleTimeString('es-CO')}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-secondary text-base">{lead.fullName}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                       lead.modality === "express" ? "bg-accent/20 text-secondary" :
                       lead.modality === "manual" ? "bg-blue-500/10 text-blue-700" :
                       "bg-purple-500/10 text-purple-700"
                     }`}>
                       {lead.modality}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-secondary/80 flex flex-col gap-1 justify-center h-[72px]">
                    <span className="font-semibold text-primary">{lead.phone}</span>
                    {lead.email && <span className="text-xs text-secondary/60 font-medium">{lead.email}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {lead.filePath && (
                        <a href={lead.filePath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:text-primary/70 font-bold bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 transition-colors">
                          <FileText size={18}/> Ver Archivo Adjunto
                        </a>
                      )}
                      
                      {lead.modality === "manual" && (
                         <div className="text-xs font-bold text-secondary bg-muted px-4 py-2 border border-border/50 rounded-xl flex flex-col gap-0.5">
                           <span>Consumo: <span className="text-primary">{lead.consumption} kWh</span></span>
                           <span className="font-light text-secondary/60 max-w-[200px] truncate">{lead.address}</span>
                         </div>
                      )}
                      
                      {lead.modality === "detailed" && (
                         <div className="text-xs font-bold text-secondary bg-muted px-4 py-2 border border-border/50 rounded-xl flex flex-col gap-0.5" title={lead.message}>
                           <span>Tipo: <span className="text-primary">{lead.installType}</span> | Red: <span className="text-primary">{lead.gridType}</span></span>
                           <span className="font-light text-secondary/60 max-w-[200px] truncate">Objetivo: {lead.objective}</span>
                         </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
             <div className="text-center py-16 text-secondary/40 font-light flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-secondary/20 border border-border">
                  <Users size={32}/>
                </div>
                <p className="text-lg">No hay solicitudes de cotización registradas en la base de datos.<br/>¡Ve a probar el formulario!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

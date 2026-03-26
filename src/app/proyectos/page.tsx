import * as React from "react";
import Image from "next/image";
import { MapPin, Zap, Sun, Award, ArrowRight, TreeDeciduous, Banknote } from "lucide-react";
import { getDB } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Proyectos y Casos de Éxito | Voltac Energy",
  description: "Portafolio de granjas solares, residenciales y comerciales construidas por Voltac. Visualiza nuestras métricas de impacto ambiental y económico.",
};

export default async function ProyectosPage() {
  const db = await getDB();
  const dbProjects = await db.all("SELECT * FROM projects WHERE isPublished = 1 ORDER BY id DESC");
  
  const mwpAcumulado = dbProjects.reduce((acc, p) => acc + (p.powerUnit === 'MW' ? p.power : p.powerUnit === 'W' ? p.power/1000000 : p.power/1000), 0).toFixed(2);
  const co2Acumulado = dbProjects.reduce((acc, p) => acc + parseFloat(p.co2calc), 0).toFixed(0);
  const ahorroAcumulado = dbProjects.reduce((acc, p) => acc + parseFloat(p.savingsCalc), 0);

  const COP_Ahorro = ahorroAcumulado > 1000000000 
    ? (ahorroAcumulado/1000000000).toFixed(1) + 'B' 
    : ahorroAcumulado > 1000000 ? (ahorroAcumulado/1000000).toFixed(1) + 'M' : ahorroAcumulado.toLocaleString();

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        <header className="max-w-4xl text-center mx-auto mb-16 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-black text-secondary tracking-tight">
            Impacto que se <span className="text-primary">Ve y Siente.</span>
          </h1>
          <p className="text-xl text-secondary/60 font-light leading-relaxed max-w-2xl mx-auto">
            Portafolio destacado de instalaciones recientes con resultados medibles en reducción de costos de energía y captura de carbono.
          </p>
        </header>

        <section className="bg-secondary rounded-[2.5rem] p-10 md:p-14 mb-20 shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('/Ejemplo%201.jpeg')] bg-cover opacity-10 mix-blend-screen" />
          <h2 className="text-sm tracking-widest uppercase font-bold text-accent mb-10 relative z-10">Métricas Globales Acumuladas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 divide-x divide-white/10">
            <div className="space-y-2 py-4">
              <p className="text-5xl font-black tracking-tighter tabular-nums">{dbProjects.length}</p>
              <p className="text-white/60 font-medium">Proyectos Finalizados</p>
            </div>
            <div className="space-y-2 py-4">
              <p className="text-5xl font-black tracking-tighter text-primary tabular-nums">{mwpAcumulado}<span className="text-2xl">MWp</span></p>
              <p className="text-white/60 font-medium">Potencia Instalada</p>
            </div>
            <div className="space-y-2 py-4 hidden md:block">
              <p className="text-5xl font-black tracking-tighter text-primary tabular-nums">{co2Acumulado}<span className="text-2xl">t</span></p>
              <p className="text-white/60 font-medium">CO₂ Evitado Anual</p>
            </div>
            <div className="space-y-2 py-4 hidden md:block">
              <p className="text-5xl font-black tracking-tighter tabular-nums text-primary"><span className="text-2xl">$</span>{COP_Ahorro}</p>
              <p className="text-white/60 font-medium">Ahorros en COP Aproximado</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbProjects.length === 0 ? (
             <div className="col-span-3 py-20 text-center font-bold text-secondary/50">El equipo técnico publicará métricas fotovoltaicas pronto.</div>
          ) : (
            dbProjects.map((project: any) => (
              <div key={project.id} className="group rounded-[2rem] overflow-hidden bg-white border border-border shadow-md hover:shadow-2xl transition-all h-full flex flex-col">
                
                <div className="relative h-64 w-full overflow-hidden bg-muted">
                  {project.imageUrl && (
                    <Image src={project.imageUrl} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-secondary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold capitalize">
                      {project.projectType}
                    </span>
                    <span className="bg-primary/90 backdrop-blur-md text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {project.power} {project.powerUnit}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors leading-tight mb-4">
                    {project.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="bg-secondary/5 p-3 rounded-xl border border-secondary/10">
                        <MapPin size={16} className="text-secondary/50 mb-1"/>
                        <p className="font-bold text-xs truncate" title={`${project.city}, ${project.department}`}>{project.city}, {project.department}</p>
                     </div>
                     <div className="bg-secondary/5 p-3 rounded-xl border border-secondary/10">
                        <Sun size={16} className="text-secondary/50 mb-1"/>
                        <p className="font-bold text-xs truncate" title={project.connectionType}>{project.connectionType}</p>
                     </div>
                     <div className="bg-secondary/5 p-3 rounded-xl border border-secondary/10">
                        <Award size={16} className="text-secondary/50 mb-1"/>
                        <p className="font-bold text-xs truncate">{(project.dateExecuted || '').split(' ')[0]}</p>
                     </div>
                     <div className="bg-green-50 p-3 rounded-xl border border-green-200 text-green-700">
                        <TreeDeciduous size={16} className="mb-1"/>
                        <p className="font-bold text-xs">-{parseFloat(project.co2calc).toFixed(1)} tCO₂</p>
                     </div>
                  </div>

                  <div className="mt-auto border-t border-border pt-4 -mx-2 px-2 flex items-center justify-between">
                     <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center"><Banknote size={16}/></div>
                        <div>
                          <p className="text-xs font-bold uppercase text-secondary/40">Ahorro Anual</p>
                          <p className="font-black text-secondary text-sm">${parseFloat(project.savingsCalc).toLocaleString('es-CO')}</p>
                        </div>
                     </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-20 flex justify-center">
          <Link href="/cotizar">
             <button className="bg-primary text-secondary px-8 py-4 rounded-full font-black text-lg gap-2 flex items-center hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105">
               Cotiza uno igual para ti <ArrowRight/>
             </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

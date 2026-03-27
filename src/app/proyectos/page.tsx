import * as React from "react";
import Image from "next/image";
import { MapPin, Zap, Sun, Award, ArrowRight, TreeDeciduous, Banknote, Images } from "lucide-react";
import { getDB } from "@/lib/db";
import Link from "next/link";
import { ProjectsGrid } from "./projects-grid";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Proyectos y Casos de Éxito | Voltac Energy",
  description: "Portafolio de granjas solares, residenciales y comerciales construidas por Voltac. Visualiza nuestras métricas de impacto ambiental y económico.",
};

export default async function ProyectosPage() {
  const db = await getDB();
  const dbProjects = await db.all("SELECT * FROM projects WHERE isPublished = 1 ORDER BY id DESC");
  
  const mwpAcumulado = dbProjects.reduce((acc: number, p: any) => acc + (p.powerUnit === 'MW' ? p.power : p.powerUnit === 'W' ? p.power/1000000 : p.power/1000), 0).toFixed(2);
  const co2Acumulado = dbProjects.reduce((acc: number, p: any) => acc + parseFloat(p.co2calc), 0).toFixed(0);
  const ahorroAcumulado = dbProjects.reduce((acc: number, p: any) => acc + parseFloat(p.savingsCalc), 0);

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

        <ProjectsGrid projects={dbProjects} />
        
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

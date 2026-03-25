import * as React from "react";
import Image from "next/image";
import { MapPin, Zap, Sun, Award } from "lucide-react";

export const metadata = {
  title: "Proyectos y Casos de Éxito | Voltac Energy",
  description: "Portafolio de granjas solares, residenciales y comerciales construidas por Voltac. Visualiza nuestras métricas de impacto ambiental y económico.",
};

const PROJECTS = [
  {
    id: 1,
    title: "Planta Industrial Zona Franca",
    location: "Cartagena, Bolívar",
    type: "On-Grid",
    category: "Industrial",
    power: "250",
    year: "2024",
    image: "/Ejemplo%203.jpeg",
  },
  {
    id: 2,
    title: "Eco-Hotel Barú",
    location: "Isla Barú, Bolívar",
    type: "Off-Grid / Baterías Litio",
    category: "Comercial",
    power: "65",
    year: "2023",
    image: "/Ejemplo%202.jpg",
  },
  {
    id: 3,
    title: "Condominio Norte",
    location: "Barranquilla, Atlántico",
    type: "On-Grid",
    category: "Residencial",
    power: "12.5",
    year: "2024",
    image: "/Ejemplo%201.jpeg",
  },
];

export default function ProyectosPage() {
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

        {/* Global Impact Metrics - (Static mock for now, ready for DB hookup in admin phase) */}
        <section className="bg-secondary rounded-[2.5rem] p-10 md:p-14 mb-20 shadow-2xl relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 bg-[url('/Ejemplo%201.jpeg')] bg-cover opacity-10 mix-blend-screen" />
          <h2 className="text-sm tracking-widest uppercase font-bold text-accent mb-10 relative z-10">Métricas Globales Acumuladas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 divide-x divide-white/10">
            <div className="space-y-2 py-4">
              <p className="text-5xl font-black tracking-tighter tabular-nums">120+</p>
              <p className="text-white/60 font-medium">Proyectos Finalizados</p>
            </div>
            <div className="space-y-2 py-4">
              <p className="text-5xl font-black tracking-tighter text-primary tabular-nums">3.5<span className="text-2xl">MWp</span></p>
              <p className="text-white/60 font-medium">Potencia Instalada</p>
            </div>
            <div className="space-y-2 py-4 hidden md:block">
              <p className="text-5xl font-black tracking-tighter text-primary tabular-nums">850<span className="text-2xl">t</span></p>
              <p className="text-white/60 font-medium">CO₂ Evitado Anual</p>
            </div>
            <div className="space-y-2 py-4 hidden md:block">
              <p className="text-5xl font-black tracking-tighter tabular-nums text-primary"><span className="text-2xl">$</span>8.2<span className="text-2xl">B</span></p>
              <p className="text-white/60 font-medium">Ahorros en COP Aproximado</p>
            </div>
          </div>
        </section>

        {/* Filters (Mock UI) */}
        <div className="flex flex-wrap gap-4 mb-10 items-center justify-center">
          <button className="px-5 py-2 rounded-full border border-primary bg-primary text-white font-semibold text-sm">Todos</button>
          <button className="px-5 py-2 rounded-full border border-border bg-white text-secondary font-medium text-sm hover:border-primary/50">Residencial</button>
          <button className="px-5 py-2 rounded-full border border-border bg-white text-secondary font-medium text-sm hover:border-primary/50">Comercial</button>
          <button className="px-5 py-2 rounded-full border border-border bg-white text-secondary font-medium text-sm hover:border-primary/50">Industrial / Granjas</button>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group rounded-3xl overflow-hidden bg-white border border-border shadow-md hover:shadow-xl transition-all h-full flex flex-col cursor-pointer">
              
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-secondary/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold capitalize">
                    {project.category}
                  </span>
                  <span className="bg-primary/90 backdrop-blur-md text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {project.power} kWp
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1 space-y-4">
                <h3 className="text-2xl font-black text-secondary group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-secondary/60 text-sm">
                    <MapPin size={16} className="text-primary"/>
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2 text-secondary/60 text-sm">
                    <Sun size={16} className="text-primary"/>
                    {project.type}
                  </div>
                  <div className="flex items-center gap-2 text-secondary/60 text-sm">
                    <Award size={16} className="text-primary"/>
                    Ejecutado: {project.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

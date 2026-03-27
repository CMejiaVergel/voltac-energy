"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Sun, Award, TreeDeciduous, Banknote, Images } from "lucide-react";
import { ProjectGalleryModal } from "./gallery-modal";

export function ProjectsGrid({ projects }: { projects: any[] }) {
  const [activeProject, setActiveProject] = React.useState<any | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
           <div className="col-span-3 py-20 text-center font-bold text-secondary/50">El equipo técnico publicará métricas fotovoltaicas pronto.</div>
        ) : (
          projects.map((project: any) => {
            const galleryArr = (() => { try { return JSON.parse(project.gallery || '[]'); } catch { return []; } })();
            return (
            <div 
              key={project.id} 
              className="group rounded-[2rem] overflow-hidden bg-white border border-border shadow-md hover:shadow-2xl transition-all h-full flex flex-col cursor-pointer"
              onClick={() => setActiveProject(project)}
            >
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
                {galleryArr.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-secondary/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                    <Images size={12}/> {galleryArr.length} fotos · Clic para ver
                  </div>
                )}
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
          );})
        )}
      </div>

      {activeProject && (
        <ProjectGalleryModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}

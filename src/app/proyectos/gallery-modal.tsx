"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X, MapPin, Sun, Award, TreeDeciduous, Banknote } from "lucide-react";

interface ProjectGalleryModalProps {
  project: any;
  onClose: () => void;
}

export function ProjectGalleryModal({ project, onClose }: ProjectGalleryModalProps) {
  const gallery: string[] = (() => { try { return JSON.parse(project.gallery || '[]'); } catch { return project.imageUrl ? [project.imageUrl] : []; } })();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, gallery.length - 1));
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gallery.length, onClose]);

  if (gallery.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-secondary/95 backdrop-blur-md flex flex-col animate-in fade-in duration-300" onClick={onClose}>
      <div className="flex items-center justify-between p-4 md:p-6 text-white shrink-0">
        <div>
          <h2 className="text-2xl font-black tracking-tight">{project.name}</h2>
          <p className="text-white/50 text-sm font-light">{project.city}, {project.department} · {project.power} {project.powerUnit}</p>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <X size={20}/>
        </button>
      </div>

      {/* Carousel Area */}
      <div className="flex-1 flex items-center justify-center px-4 relative min-h-0" onClick={e => e.stopPropagation()}>
        {gallery.length > 1 && (
          <button
            onClick={() => setCurrent(c => Math.max(c - 1, 0))}
            disabled={current === 0}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-20 transition-all backdrop-blur-sm"
          >
            <ChevronLeft size={24}/>
          </button>
        )}

        <div className="w-full max-w-5xl max-h-[70vh] relative">
          <img
            src={gallery[current]}
            alt={`${project.name} - Foto ${current + 1}`}
            className="w-full h-full max-h-[70vh] object-contain rounded-2xl shadow-2xl transition-all duration-300"
          />
        </div>

        {gallery.length > 1 && (
          <button
            onClick={() => setCurrent(c => Math.min(c + 1, gallery.length - 1))}
            disabled={current === gallery.length - 1}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-20 transition-all backdrop-blur-sm"
          >
            <ChevronRight size={24}/>
          </button>
        )}
      </div>

      {/* Thumbnails Strip + Project Info */}
      <div className="shrink-0 p-4 md:p-6" onClick={e => e.stopPropagation()}>
        {gallery.length > 1 && (
          <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
            {gallery.map((url, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  i === current ? 'border-primary scale-110 shadow-lg shadow-primary/30' : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={url} alt="" className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-6 text-white/80 text-xs font-bold">
          <div className="flex items-center gap-1.5"><MapPin size={14}/> {project.city}</div>
          <div className="flex items-center gap-1.5"><Sun size={14}/> {project.connectionType}</div>
          <div className="flex items-center gap-1.5"><Award size={14}/> {(project.dateExecuted || '').split(' ')[0]}</div>
          <div className="flex items-center gap-1.5 text-green-400"><TreeDeciduous size={14}/> -{parseFloat(project.co2calc).toFixed(1)} tCO₂</div>
          <div className="flex items-center gap-1.5 text-primary"><Banknote size={14}/> ${parseFloat(project.savingsCalc).toLocaleString('es-CO')}</div>
        </div>
        
        {gallery.length > 1 && (
          <p className="text-center text-white/30 text-[10px] mt-2 uppercase tracking-widest">{current + 1} / {gallery.length}</p>
        )}
      </div>
    </div>
  );
}

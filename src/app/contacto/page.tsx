import * as React from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contacto | Voltac Energy",
  description: "Comunícate con Voltac Energy para resolver dudas o solicitar una visita técnica fotovoltaica.",
};

export default function ContactoPage() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Contact Header */}
        <section className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <h1 className="text-5xl font-black text-secondary tracking-tight">Hablemos de <span className="text-primary">Energía.</span></h1>
          <p className="text-xl text-secondary/60 font-light max-w-xl mx-auto">Nuestro equipo de ingenieros está listo para acompañarte. Déjanos un mensaje o encuéntranos en Cartagena.</p>
        </section>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-muted p-10 rounded-3xl space-y-8 border border-border">
              <div>
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Información de Contacto</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl text-primary shadow-sm mt-1 border border-border"><MapPin size={24}/></div>
                    <div>
                      <p className="font-bold text-secondary mb-1">Sede Principal</p>
                      <p className="text-secondary/60 font-medium">Cartagena, Bolívar<br/>Cobertura en toda Colombia</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-primary shadow-sm border border-border"><Phone size={24}/></div>
                    <div>
                      <p className="font-bold text-secondary mb-1">Teléfono Fijo / Móvil</p>
                      <p className="text-secondary/60 font-medium">+57 300 000 0000</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-primary shadow-sm border border-border"><Mail size={24}/></div>
                    <div>
                      <p className="font-bold text-secondary mb-1">Correos Institucionales</p>
                      <p className="text-secondary/60 font-medium break-all">hola@energy.voltac.com.co</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-primary shadow-sm border border-border"><Clock size={24}/></div>
                    <div>
                      <p className="font-bold text-secondary mb-1">Atención Administrativa</p>
                      <p className="text-secondary/60 font-medium">Lun-Vie: 8:00 AM - 6:00 PM</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="pt-6 border-t border-border">
                <a href="#" className="flex w-full items-center justify-center gap-3 bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 font-bold p-4 rounded-2xl transition-colors">
                  <MessageCircle size={24} />
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
             <div className="bg-secondary p-10 md:p-14 rounded-3xl shadow-xl text-white">
               <h2 className="text-3xl font-black tracking-tight mb-2">Envíanos un mensaje</h2>
               <p className="text-white/60 mb-10 font-light">Completa el formulario y responderemos en menos de 24 horas hábiles.</p>
               
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold tracking-wider uppercase text-white/50">Nombre Completo</label>
                     <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Tu nombre" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold tracking-wider uppercase text-white/50">Correo Electrónico</label>
                     <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="tu@empresa.com" />
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-semibold tracking-wider uppercase text-white/50">Teléfono / Celular</label>
                     <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Ej. 300 000 0000" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-semibold tracking-wider uppercase text-white/50">Asunto</label>
                     <select className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none">
                       <option value="" disabled>Selecciona el motivo...</option>
                       <option>Dudas sobre garantías</option>
                       <option>Mantenimiento (O&M)</option>
                       <option>Alianzas corporativas</option>
                       <option>Otro</option>
                     </select>
                   </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-wider uppercase text-white/50">Mensaje</label>
                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none" placeholder="Escribe tu consulta aquí..." />
                  </div>

                 <div className="pt-2">
                  <label className="flex items-start gap-4 cursor-pointer mb-8">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary/20 accent-primary" />
                    <span className="text-xs text-white/40 leading-relaxed font-light block">
                      Autorizo el tratamiento de mis datos personales de acuerdo con la <a href="#" className="underline hover:text-white">Política de Privacidad Integral de la Ley 1581 de 2012 de Colombia</a>.
                    </span>
                  </label>
                  
                  <Button type="button" variant="accent" size="lg" className="h-14 w-full text-secondary text-base uppercase font-bold tracking-widest">
                    Enviar Consulta
                  </Button>
                 </div>
               </form>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

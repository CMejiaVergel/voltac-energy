"use client";

import { Link2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ title, slug }: { title: string, slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://energy.voltac.com.co/noticias/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 mt-8 pt-8 border-t border-border">
      <span className="text-sm font-bold uppercase tracking-widest text-secondary/60 mr-2">Compartir:</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-secondary/70 font-bold text-xs" title="Facebook">
        FB
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-secondary/70 font-bold text-xs" title="Twitter / X">
        X
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-secondary/70 font-bold text-xs" title="LinkedIn">
        IN
      </a>
      <button onClick={handleCopy} className="w-9 h-9 flex items-center justify-center bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-secondary/70" title="Copiar enlace">
        {copied ? <CheckCircle2 size={16} className="text-green-600" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}

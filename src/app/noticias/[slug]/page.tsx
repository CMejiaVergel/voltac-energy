import { getDB } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDB();
  const entry = await db.get("SELECT titulo, cuerpo, imagen_portada, keywords FROM news_entries WHERE slug = ? AND estado = 1", [slug]);

  if (!entry) return {};

  const plainText = entry.cuerpo.replace(/<[^>]+>/g, '').substring(0, 160);
  const keywordArray = entry.keywords ? JSON.parse(entry.keywords) : [];

  return {
    title: `${entry.titulo} | Voltac Energy`,
    description: plainText,
    keywords: keywordArray,
    openGraph: {
      title: entry.titulo,
      description: plainText,
      images: entry.imagen_portada ? [entry.imagen_portada] : [],
      type: "article",
    }
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDB();
  const article = await db.get("SELECT * FROM news_entries WHERE slug = ? AND estado = 1", [slug]);

  if (!article) return notFound();

  return (
    <div className="pt-32 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <Link href="/noticias" className="inline-flex items-center gap-2 text-secondary/60 hover:text-primary transition-colors mb-8 font-bold text-sm tracking-widest uppercase">
           <ArrowLeft size={16}/> Volver a Noticias
        </Link>

        {article.imagen_portada && (
           <div className="relative w-full h-[40vh] md:h-[50vh] rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-border">
              <Image src={article.imagen_portada} fill alt={article.titulo} className="object-cover" priority/>
           </div>
        )}

        <header className="mb-12">
           <div className="flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-widest text-primary">
              <Calendar size={16}/>
              {new Date(article.fecha_publicacion).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-[1.1]">{article.titulo}</h1>
        </header>

        {/* TipTap Rich Text Renderer */}
        <article 
           className="prose prose-sm sm:prose-base lg:prose-lg prose-headings:font-black prose-headings:text-secondary prose-p:text-secondary/80 prose-a:text-primary prose-a:font-bold hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-lg max-w-none"
           dangerouslySetInnerHTML={{ __html: article.cuerpo }}
        />

        {article.keywords && JSON.parse(article.keywords).length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
             <p className="text-xs uppercase font-bold text-secondary/50 tracking-widest mb-4">Etiquetas relacionadas</p>
             <div className="flex gap-2 flex-wrap">
               {JSON.parse(article.keywords).map((kw: string, i: number) => (
                 <span key={i} className="bg-muted text-secondary/70 text-xs px-3 py-1.5 rounded-full font-medium">#{kw}</span>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

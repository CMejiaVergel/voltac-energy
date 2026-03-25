"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Highly simplified mock auth check for MVP
    const auth = localStorage.getItem("voltac_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== "/admin/login") {
    return <div className="min-h-screen flex items-center justify-center bg-muted text-secondary">Cargando panel de seguridad...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20}/>, href: "/admin" },
    { label: "Leads (CRM)", icon: <Users size={20}/>, href: "/admin/leads" },
    { label: "Proyectos", icon: <FolderKanban size={20}/>, href: "/admin/proyectos" },
    { label: "Configuración", icon: <Settings size={20}/>, href: "/admin/configuracion" },
  ];

  return (
    <div className="min-h-screen bg-muted/50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white shrink-0 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="font-black text-2xl tracking-tighter block">
            VOLTAC<span className="text-primary block text-sm tracking-widest font-medium uppercase mt-1">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                pathname === item.href ? "bg-primary text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => {
              localStorage.removeItem("voltac_admin_auth");
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 w-full font-medium text-sm transition-colors"
          >
            <LogOut size={20}/>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

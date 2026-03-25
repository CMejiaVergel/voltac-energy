"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

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
        <aside className={cn("bg-secondary text-white shrink-0 hidden md:flex flex-col transition-all duration-300", collapsed ? "w-20" : "w-64")}>
        <div className="p-6 border-b border-white/10 flex flex-col items-center justify-center min-h-[88px]">
          {!collapsed ? (
            <Link href="/admin" className="block w-full">
              <Image src="/logo_horizontal_fondo_oscuro.png" alt="Voltac Admin" width={150} height={40} className="w-auto h-8 object-contain" priority />
              <span className="text-primary block text-xs tracking-widest font-medium uppercase mt-2">Admin Panel</span>
            </Link>
          ) : (
            <Link href="/admin" className="block mx-auto">
              <Image src="/isotipo_fondo_oscuro.png" alt="Voltac" width={40} height={40} className="w-8 h-8 object-contain" priority />
            </Link>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-xl transition-colors font-medium text-sm",
                collapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                pathname === item.href ? "bg-primary text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.icon}
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors w-full rounded-xl py-2 font-medium"
            title={collapsed ? "Expandir" : "Contraer"}
          >
            {collapsed ? "»" : "« Contraer"}
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem("voltac_admin_auth");
              router.push("/admin/login");
            }}
            title={collapsed ? "Cerrar Sesión" : undefined}
            className={cn(
              "flex items-center text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium text-sm w-full",
              collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
            )}
          >
            <LogOut size={20}/>
            {!collapsed && "Cerrar Sesión"}
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

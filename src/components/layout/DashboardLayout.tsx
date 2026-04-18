import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FolderOpen,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-gray-200 overflow-hidden font-sans selection:bg-red-500/30">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black border-r border-red-900/20 flex flex-col transition-all duration-300 shrink-0 relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-red-600/10 blur-[80px] pointer-events-none" />
        
        <div className="h-16 flex items-center px-6 border-b border-white/5 relative z-10">
          <div className="w-8 h-8 rounded shrink-0 bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] mr-3">
            A
          </div>
          <span className="font-semibold text-lg text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            APRA LMS
          </span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto relative z-10">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<BookOpen size={20} />} label="Cursos" />
          <NavItem icon={<Users size={20} />} label="Usuarios" />
          <NavItem icon={<FolderOpen size={20} />} label="Archivos" />
          <div className="pt-6 mt-6 border-t border-white/5">
            <NavItem icon={<Settings size={20} />} label="Configuración" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-white/5 flex items-center space-x-3 cursor-pointer hover:bg-white/5 rounded-md mx-2 mb-2 transition-colors relative z-10">
          <div className="w-10 h-10 rounded-full bg-red-950 border border-red-500/30 flex items-center justify-center text-sm font-semibold text-red-100">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-200 truncate">John Doe</p>
            <p className="text-xs text-red-400 truncate">Administrador</p>
          </div>
          <LogOut size={16} className="text-gray-500" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Content Background Glows */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)] pointer-events-none" />
        
        {/* HEADER */}
        <header className="h-16 border-b border-red-900/20 bg-black/40 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Home</span>
            <ChevronRight size={14} className="mx-2 text-red-500/50" />
            <span className="text-gray-200 font-medium tracking-wide">Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Buscar recursos..." 
                className="pl-9 pr-4 py-2 w-64 bg-white/5 border border-white/10 rounded-md text-sm text-gray-200 placeholder:text-gray-600 focus:bg-black focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* SCROLLABLE VIEW */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
        active 
          ? "bg-gradient-to-r from-red-500/20 to-transparent border-l-2 border-red-500 text-red-50" 
          : "text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
      )}
    >
      <span className={cn(active ? "text-red-500" : "text-gray-500")}>{icon}</span>
      <span>{label}</span>
      {active && (
        <div className="absolute right-0 w-8 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none rounded-r-md" />
      )}
    </a>
  );
}

import { Search, Plus, BookOpen, Clock, Users } from "lucide-react";

export function Courses() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Gestión de Cursos
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">Administra el contenido académico institucional</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(52,211,153,0.4)] border border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 flex items-center gap-2">
          <Plus size={18} /> Crear Curso
        </button>
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[100px] pointer-events-none" />
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar curso..." 
              className="pl-9 pr-4 py-2 w-full lg:w-72 bg-black/20 border border-white/10 rounded-md text-sm text-gray-200 placeholder:text-gray-500 focus:bg-black/50 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <CourseCard title="Arquitectura Cloud Enterprise" students={145} hours={40} />
          <CourseCard title="Liderazgo y Gestión de Equipos" students={89} hours={24} />
          <CourseCard title="Introducción a Machine Learning" students={210} hours={60} />
          <CourseCard title="Seguridad Informática Nivel 1" students={67} hours={30} />
          <CourseCard title="Ingeniería DevOps Aplicada" students={120} hours={45} />
          <CourseCard title="Fundamentos de Bases de Datos" students={340} hours={20} />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ title, students, hours }: { title: string, students: number, hours: number }) {
  return (
    <div className="bg-black/20 border border-white/5 hover:border-emerald-500/30 hover:bg-black/40 transition-all rounded-xl p-5 group cursor-pointer">
      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.1)] group-hover:bg-blue-500 group-hover:text-white transition-all mb-4">
        <BookOpen size={24} />
      </div>
      <h3 className="text-gray-200 font-semibold mb-2 group-hover:text-emerald-400 transition-colors">{title}</h3>
      <div className="flex items-center gap-4 text-xs text-gray-400 mt-4">
        <div className="flex items-center gap-1.5"><Users size={14} /> {students} al.</div>
        <div className="flex items-center gap-1.5"><Clock size={14} /> {hours} h.</div>
      </div>
    </div>
  );
}

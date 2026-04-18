import { Users, BookOpen, GraduationCap, Clock } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Resumen Académico
            <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent ml-4 opacity-50" />
          </h1>
          <p className="text-gray-400 text-sm mt-1">Monitorea el progreso de APRA Learning Systems</p>
        </div>
        <button className="px-5 py-2.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-500 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none">
          Crear Nuevo Curso
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Cursos Activos" value="24" icon={<BookOpen size={20} />} trend="+3 este mes" />
        <KPICard title="Estudiantes" value="1,842" icon={<Users size={20} />} trend="+124 este mes" />
        <KPICard title="Docentes" value="86" icon={<GraduationCap size={20} />} trend="Estable" neutral />
        <KPICard title="Horas de Clase" value="4,200" icon={<Clock size={20} />} trend="+8% vs pasado" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 bg-[#0a0a0a]/80 backdrop-blur border border-red-500/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 text-red-500 right-0 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none group-hover:bg-red-600/10 transition-colors duration-500" />
          
          <h2 className="text-lg font-semibold text-gray-100 mb-6 flex items-center relative z-10">
            <span className="w-1.5 h-6 bg-red-600 rounded-full mr-3 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
            Cursos Recientes
          </h2>
          <div className="space-y-4 relative z-10">
            <CourseRow title="Arquitectura Cloud Enterprise" students={145} progress={80} />
            <CourseRow title="Liderazgo y Gestión de Equipos" students={89} progress={45} />
            <CourseRow title="Introducción a Machine Learning" students={210} progress={15} />
            <CourseRow title="Seguridad Informática Nivel 1" students={67} progress={98} />
          </div>
        </div>

        {/* Side Panel */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur border border-red-500/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-100 mb-6 flex items-center relative z-10">
             <span className="w-1.5 h-6 bg-red-600 rounded-full mr-3 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
            Actividad Reciente
          </h2>
          <div className="space-y-6 relative z-10">
            <ActivityItem text="Juan Pérez entregó Tarea 1" time="Hace 5 min" active />
            <ActivityItem text="Nuevo archivo subido: 'Syllabus.pdf'" time="Hace 1 hora" />
            <ActivityItem text="Reunión de profesores programada" time="Hace 3 horas" />
            <ActivityItem text="Evaluación Módulo 2 activada" time="Ayer" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, neutral = false }: any) {
  return (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-red-900/20 hover:border-red-500/40 rounded-xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 group hover:-translate-y-1">
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:to-red-600/5 transition-all duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-2.5 bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          {icon}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-md border ${
          neutral 
            ? 'bg-gray-800/50 text-gray-400 border-gray-700/50' 
            : 'bg-emerald-900/30 text-emerald-400 border-emerald-800/30'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm font-medium relative z-10">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1 tracking-tight relative z-10">{value}</p>
    </div>
  );
}

function CourseRow({ title, students, progress }: { title: string, students: number, progress: number }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/40 hover:border-red-500/30 hover:bg-[#111] transition-all group cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.1)] group-hover:bg-red-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all">
          <BookOpen size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-red-50 transition-colors">{title}</h4>
          <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{students} estudiantes inscritos</p>
        </div>
      </div>
      <div className="w-32 hidden sm:block">
        <div className="flex justify-between text-[11px] font-medium tracking-wide mb-1.5">
          <span className="text-gray-400 uppercase">Progreso</span>
          <span className="text-red-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-1.5 flex overflow-hidden border border-white/5">
          <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time, active = false }: { text: string, time: string, active?: boolean }) {
  return (
    <div className="flex items-start space-x-4 relative before:absolute before:left-[11px] before:top-6 before:bottom-[-24px] before:w-px before:bg-red-900/30 last:before:hidden group">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 mt-0.5 transition-colors ${
        active 
          ? 'bg-[#0a0a0a] border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.4)]' 
          : 'bg-[#0a0a0a] border-gray-700 group-hover:border-red-500/50'
      }`}>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-red-500' : 'bg-gray-700 group-hover:bg-red-500/50'} transition-colors`}></div>
      </div>
      <div>
        <p className={`text-sm ${active ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'} transition-colors`}>{text}</p>
        <p className="text-xs text-gray-600 mt-1">{time}</p>
      </div>
    </div>
  );
}

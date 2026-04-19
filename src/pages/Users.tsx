import { Search, UserPlus, Shield, User } from "lucide-react";

export function Users() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Gestión de Usuarios
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">Directorio de estudiantes, docentes y administradores</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-500 focus:ring-2 focus:ring-blue-500/50 flex items-center gap-2">
          <UserPlus size={18} /> Invitar Usuario
        </button>
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/5 blur-[100px] pointer-events-none" />
        
        <div className="p-6 border-b border-white/5 flex justify-between items-center relative z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o email..." 
              className="pl-9 pr-4 py-2 w-full lg:w-72 bg-black/20 border border-white/10 rounded-md text-sm text-gray-200 placeholder:text-gray-500 focus:bg-black/50 focus:border-blue-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto relative z-10 text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-medium text-gray-300">Usuario</th>
                <th className="px-6 py-4 font-medium text-gray-300">Rol</th>
                <th className="px-6 py-4 font-medium text-gray-300">Estado</th>
                <th className="px-6 py-4 font-medium text-gray-300">Último Acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <UserRow name="Francisco SM" email="admin@apra.edu.com" role="Administrador" status="Activo" date="Ahora" />
              <UserRow name="Andrea Gómez" email="andrea@apra.edu.com" role="Docente" status="Activo" date="Hace 2 horas" />
              <UserRow name="Carlos Ruiz" email="carlos.r@student.apra.com" role="Estudiante" status="Activo" date="Ayer" />
              <UserRow name="María López" email="maria.l@student.apra.com" role="Estudiante" status="Inactivo" date="Hace 5 días" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserRow({ name, email, role, status, date }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-gray-300 group-hover:text-blue-400 group-hover:border-blue-400/50 transition-colors">
            <User size={16} />
          </div>
          <div>
            <div className="font-medium text-gray-200">{name}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-300 flex items-center gap-2">
        {role === 'Administrador' && <Shield size={14} className="text-blue-400" />}
        {role}
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
          status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-400">{date}</td>
    </tr>
  );
}

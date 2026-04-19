import { Folder, FileText, Download, UploadCloud } from "lucide-react";

export function Files() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            Recursos y Archivos
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">Repositorio centralizado de materiales e imágenes</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-500 focus:ring-2 focus:ring-blue-500/50 flex items-center gap-2">
          <UploadCloud size={18} /> Subir Archivo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FolderCard name="Materiales de Clase" items={45} />
        <FolderCard name="Documentos Legales" items={12} />
        <FolderCard name="Exámenes y Pruebas" items={8} />
        <FolderCard name="Recursos Multimedia" items={120} />
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6">Archivos Recientes</h2>
        <div className="space-y-3">
          <FileRow name="Syllabus_Machine_Learning_2026.pdf" size="2.4 MB" date="Hoy" />
          <FileRow name="Reglamento_Institucional.pdf" size="1.1 MB" date="Ayer" />
          <FileRow name="Presentacion_Proyecto_Final.pptx" size="15 MB" date="Hace 2 días" />
        </div>
      </div>
    </div>
  );
}

function FolderCard({ name, items }: { name: string, items: number }) {
  return (
    <div className="bg-black/20 border border-white/5 hover:border-blue-500/30 hover:bg-black/40 transition-all rounded-xl p-5 group cursor-pointer flex flex-col items-center text-center">
      <Folder size={40} className="text-blue-500/70 group-hover:text-blue-400 transition-colors mb-4" fill="currentColor" strokeWidth={1} />
      <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">{items} items</p>
    </div>
  );
}

function FileRow({ name, size, date }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group cursor-pointer">
      <div className="flex items-center gap-4">
        <FileText size={20} className="text-emerald-500" />
        <div>
          <p className="text-sm font-medium text-gray-200 group-hover:text-white">{name}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{size}</span>
            <span>•</span>
            <span>Subido {date}</span>
          </div>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors">
        <Download size={16} />
      </button>
    </div>
  );
}

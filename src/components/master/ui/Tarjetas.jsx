import Ico from "@/components/register/Ico";

// Contenedor de gráfico o sección, con el mismo estilo de tarjetas del dashboard del estudiante.
export function Tarjeta({ titulo, subtitulo, acciones, children, className = "" }) {
  return (
    <section className={`rounded-3xl bg-white border border-gray-100 shadow-sm p-6 ${className}`}>
      {(titulo || acciones) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h4 className="text-lg font-black text-unievents-dark">{titulo}</h4>
            {subtitulo && <p className="text-sm text-gray-500 font-medium">{subtitulo}</p>}
          </div>
          {acciones}
        </header>
      )}
      {children}
    </section>
  );
}

const DEGRADADOS = {
  teal: "from-teal-400 to-unievents-dark",
  oro: "from-unievents-gold to-orange-500",
  cielo: "from-sky-400 to-teal-600",
  violeta: "from-violet-400 to-indigo-600",
};

// Indicador numérico con icono en degradado.
export function Kpi({ icono, etiqueta, valor, detalle, color = "teal" }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
      <span className={`grid place-items-center w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${DEGRADADOS[color]} text-white shadow-md`}>
        <Ico nombre={icono} className="w-7 h-7" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-black text-unievents-dark leading-tight truncate">{valor}</p>
        <p className="text-sm font-bold text-gray-500">{etiqueta}</p>
        {detalle && <p className="text-xs font-medium text-gray-400">{detalle}</p>}
      </div>
    </div>
  );
}

const TONOS = {
  activo: "bg-emerald-100 text-emerald-800",
  pendiente: "bg-amber-100 text-amber-800",
  finalizado: "bg-slate-200 text-slate-700",
  pagado: "bg-emerald-100 text-emerald-800",
  gratis: "bg-sky-100 text-sky-800",
  suspendido: "bg-rose-100 text-rose-800",
  master: "bg-violet-100 text-violet-800",
  administrador: "bg-sky-100 text-sky-800",
  profesor: "bg-amber-100 text-amber-800",
  alumno: "bg-teal-100 text-teal-800",
};

// Etiqueta de estado / rol con color según el tono.
export function Etiqueta({ tono, children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide whitespace-nowrap ${TONOS[tono] || "bg-gray-100 text-gray-600"}`}>
      {children}
    </span>
  );
}

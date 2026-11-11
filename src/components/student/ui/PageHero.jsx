// Portada de sección para las vistas del estudiante (mismo lenguaje visual que login/registro).
// `chips`: [{ valor, etiqueta }] se muestran como pequeñas estadísticas.
export default function PageHero({ titulo, subtitulo, chips = [], children }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal px-6 sm:px-8 py-8 text-white shadow-xl">
      <div className="pointer-events-none absolute -top-16 -right-12 w-56 h-56 rounded-full bg-unievents-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-8 w-48 h-48 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{titulo}</h3>
          {subtitulo && <p className="mt-2 text-teal-50/90 leading-relaxed">{subtitulo}</p>}
          {children}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {chips.map((c) => (
              <div key={c.etiqueta} className="rounded-2xl bg-white/10 border border-white/20 px-5 py-3 backdrop-blur text-center min-w-[96px]">
                <p className="text-2xl font-black text-unievents-gold leading-none">{c.valor}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-teal-50/90">{c.etiqueta}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

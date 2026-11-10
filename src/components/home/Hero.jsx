import Link from "next/link";

const ventajas = ["Cursos y talleres", "Eventos académicos", "Certificados digitales"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal text-white">
      {/* Decoración de fondo */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-unievents-gold/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-unievents-gold" />
            Plataforma de gestión académica UNERG
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Tu portal de <span className="text-unievents-gold">cursos y eventos</span> académicos
          </h1>
          <p className="mt-6 text-lg text-teal-50/90 max-w-xl leading-relaxed">
            Descubre, inscríbete y participa en las actividades que impulsan tu formación.
            Todo en un solo lugar, con seguimiento de tus notas y certificados.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/cursos" className="rounded-full bg-unievents-gold px-8 py-3.5 font-bold text-unievents-dark shadow-lg shadow-black/20 hover:brightness-110 hover:-translate-y-0.5 transition">
              Explorar cursos
            </Link>
            <Link href="/register" className="rounded-full border border-white/40 px-8 py-3.5 font-bold hover:bg-white/10 transition">
              Crear cuenta
            </Link>
          </div>
        </div>

        {/* Tarjeta decorativa */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-sm rounded-3xl bg-white/10 border border-white/20 p-6 backdrop-blur-md shadow-2xl rotate-2">
            <p className="text-xs uppercase tracking-widest text-teal-100">Todo lo que necesitas</p>
            <ul className="mt-5 space-y-4">
              {ventajas.map((v) => (
                <li key={v} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-unievents-gold text-unievents-dark">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="font-semibold">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Hero from "@/components/home/Hero";
import EventsBoard from "@/components/catalog/components/EventsBoard";

const pasos = [
  { n: "1", titulo: "Crea tu cuenta", texto: "Regístrate con tus datos académicos en menos de un minuto." },
  { n: "2", titulo: "Elige tu actividad", texto: "Explora cursos y eventos y reserva tu cupo." },
  { n: "3", titulo: "Aprende y certifícate", texto: "Consulta tus notas y descarga tu certificado al finalizar." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-unievents-dark">Cómo funciona</h2>
          <p className="mt-3 text-gray-500 text-lg">Tres pasos para empezar a formarte.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {pasos.map((p) => (
            <div key={p.n} className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-unievents-teal text-white text-xl font-black shadow-lg shadow-teal-200">
                {p.n}
              </span>
              <h3 className="mt-5 text-xl font-bold text-unievents-dark">{p.titulo}</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <EventsBoard title="Cursos destacados" type="curso" limit={3} />

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-unievents-dark to-unievents-teal px-8 py-14 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-black">Comienza tu viaje hoy</h2>
          <p className="mt-3 text-teal-50/90 text-lg">Únete a la plataforma líder en gestión de eventos académicos.</p>
          <Link href="/register" className="mt-8 inline-block rounded-full bg-unievents-gold px-10 py-4 font-bold text-unievents-dark shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition">
            Crear cuenta gratis
          </Link>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardEvent from "@/components/CardEvent";

// Datos de ejemplo: el back aún no tiene modelo ni endpoint de cursos/eventos.
const allData = [
  { title: "Introducción a la Programación", description: "Aprende los fundamentos de la programación utilizando Python y desarrolla tus primeras aplicaciones.", date: "1 de Julio, 2026", type: "curso" },
  { title: "Matemáticas Aplicadas", description: "Optimiza tus habilidades cuantitativas aplicadas en economía, sociología y estadística.", date: "15 de Julio, 2026", type: "curso" },
  { title: "Redacción Académica", description: "Mejora tus técnicas de escritura y comunicación para trabajos y tesis universitarias.", date: "20 de Julio, 2026", type: "curso" },
  { title: "Hackathon UniEvent 2026", description: "Compite con los mejores talentos de la universidad en este evento épico de 48 horas.", date: "12 de Agosto, 2026", type: "evento" },
  { title: "Feria de Emprendimiento", description: "Presenta tus proyectos ante inversionistas y expertos del sector.", date: "05 de Septiembre, 2026", type: "evento" },
];

/**
 * Tablero de cursos/eventos. Con `limit` es una vista resumida (home);
 * sin `limit` muestra buscador y todo el listado.
 */
const EventsBoard = ({ title = "Cursos disponibles", type = "curso", limit, hideHeader = false }) => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const q = busqueda.trim().toLowerCase();
  const filtrados = allData
    .filter((item) => !type || item.type === type)
    .filter((item) => !q || `${item.title} ${item.description}`.toLowerCase().includes(q));
  const mostrar = limit ? filtrados.slice(0, limit) : filtrados;

  return (
    <section className="bg-unievents-bg py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-unievents-dark">{title}</h2>
              <p className="text-gray-500 mt-2 text-lg">
                {type === "curso"
                  ? "Impulsa tu carrera con nuestra selección académica."
                  : "No te pierdas las actividades más importantes de la comunidad."}
              </p>
            </div>
            {limit && (
              <Link href={type === "curso" ? "/cursos" : "/eventos"} className="font-bold text-unievents-teal hover:underline">
                Ver todos →
              </Link>
            )}
          </div>
        )}

        {!limit && (
          <div className="relative max-w-md mb-10">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o descripción"
              className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all"
            />
          </div>
        )}

        {mostrar.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No encontramos resultados para &quot;{busqueda}&quot;.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostrar.map((item) => (
              <CardEvent key={item.title} {...item} onVerMas={() => router.push("/login")} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsBoard;

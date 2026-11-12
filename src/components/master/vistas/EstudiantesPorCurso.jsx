"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/botones/Button";
import Ico from "@/components/register/Ico";
import { Etiqueta } from "../ui/Tarjetas";
import { ESTADOS, estudiantesDeCurso } from "../datos/datosEjemplo";
import { fechaCorta, porcentaje } from "../datos/estadisticas";

const PUNTO = { activo: "bg-emerald-500", pendiente: "bg-amber-400", finalizado: "bg-slate-400" };

// Listado de estudiantes inscritos por curso, con búsqueda y exportación a CSV.
export default function EstudiantesPorCurso({ cursos, cursoId, setCursoId }) {
  const [busqueda, setBusqueda] = useState("");
  const curso = cursos.find((c) => c.id === cursoId) ?? cursos[0];
  const estudiantes = useMemo(() => (curso ? estudiantesDeCurso(curso) : []), [curso]);

  const q = busqueda.trim().toLowerCase();
  const visibles = estudiantes.filter((e) => !q || `${e.nombre} ${e.correo} ${e.cedula}`.toLowerCase().includes(q));
  const pagados = estudiantes.filter((e) => e.pago === "pagado").length;
  const pendientes = estudiantes.filter((e) => e.pago === "pendiente").length;

  function exportarCsv() {
    const filas = [["Nombre", "Cédula", "Correo", "Inscripción", "Pago", "Asistencia"], ...visibles.map((e) => [e.nombre, e.cedula, e.correo, e.inscripcion, e.pago, `${e.asistencia}%`])];
    const csv = "﻿" + filas.map((f) => f.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    enlace.download = `estudiantes-${curso.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  }

  if (!curso) return <p className="text-gray-500">Aún no hay cursos registrados.</p>;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHero
        titulo="Estudiantes por curso"
        subtitulo="Selecciona un curso para ver quiénes están inscritos, su estado de pago y su asistencia."
        chips={[{ valor: estudiantes.length, etiqueta: "Inscritos" }, { valor: pagados, etiqueta: "Pagados" }, { valor: pendientes, etiqueta: "Por pagar" }]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <aside className="xl:col-span-4 rounded-3xl bg-white border border-gray-100 shadow-sm p-3">
          <p className="px-3 pt-2 pb-3 text-xs font-bold uppercase tracking-wider text-gray-400">Cursos</p>
          <ul className="space-y-1.5 max-h-[560px] overflow-y-auto">
            {cursos.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setCursoId(c.id)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all cursor-pointer ${c.id === curso.id ? "bg-gradient-to-r from-unievents-teal to-teal-600 text-white shadow-md shadow-teal-200" : "hover:bg-teal-50"}`}
                >
                  <span className={`w-2.5 h-2.5 shrink-0 rounded-full ${PUNTO[c.estado]}`} />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate font-bold ${c.id === curso.id ? "text-white" : "text-unievents-dark"}`}>{c.titulo}</span>
                    <span className={`block text-xs font-medium ${c.id === curso.id ? "text-teal-50" : "text-gray-400"}`}>{c.inscritos} de {c.cupos} cupos</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="xl:col-span-8 rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-6">
            <div>
              <h4 className="text-xl font-black text-unievents-dark">{curso.titulo}</h4>
              <p className="text-sm font-medium text-gray-500">Docente: {curso.docente.nombre} - inicio {fechaCorta(curso.inicio)}</p>
            </div>
            <Etiqueta tono={curso.estado}>{ESTADOS[curso.estado]}</Etiqueta>
          </header>

          <div className="flex flex-wrap items-center gap-3 p-4">
            <div className="relative flex-grow min-w-[200px] max-w-sm">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Ico nombre="buscar" /></span>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar estudiante"
                className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-2.5 text-sm font-medium outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all"
              />
            </div>
            <Button variant="back" onClick={exportarCsv} disabled={!visibles.length} className="ml-auto flex items-center gap-2 !py-2 text-sm">
              <Ico nombre="descargar" className="w-4 h-4" /> Exportar CSV
            </Button>
          </div>

          {visibles.length === 0 ? (
            <p className="px-6 pb-10 pt-4 text-center font-medium text-gray-500">{estudiantes.length ? "Ningún estudiante coincide con la búsqueda." : "Este curso aún no tiene estudiantes inscritos."}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 pb-3">Estudiante</th>
                    <th className="pb-3 pr-6">Cédula</th>
                    <th className="pb-3 pr-6">Inscripción</th>
                    <th className="pb-3 pr-6">Pago</th>
                    <th className="px-6 pb-3">Asistencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visibles.map((e) => (
                    <tr key={e.id} className="hover:bg-teal-50/40 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-unievents-dark text-sm font-black text-white">{e.nombre[0]}</span>
                          <div className="min-w-0">
                            <p className="font-bold text-unievents-dark truncate">{e.nombre}</p>
                            <p className="text-xs font-medium text-gray-400 truncate">{e.correo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-6 font-semibold text-gray-600 whitespace-nowrap">V-{e.cedula}</td>
                      <td className="py-3 pr-6 font-medium text-gray-500 whitespace-nowrap">{fechaCorta(e.inscripcion)}</td>
                      <td className="py-3 pr-6"><Etiqueta tono={e.pago}>{e.pago}</Etiqueta></td>
                      <td className="px-6 py-3 font-semibold text-gray-600">{e.asistencia ? porcentaje(e.asistencia) : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

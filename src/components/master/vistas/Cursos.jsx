"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/botones/Button";
import Ico from "@/components/register/Ico";
import { Etiqueta } from "../ui/Tarjetas";
import ModalCurso from "./ModalCurso";
import { ESTADOS } from "../datos/datosEjemplo";
import { moneda, fechaCorta, ventasDe } from "../datos/estadisticas";

const FILTROS = [["todos", "Todos"], ["activo", "Activos"], ["pendiente", "Por iniciar"], ["finalizado", "Finalizados"]];
const SIGUIENTE = { pendiente: ["activo", "Iniciar curso"], activo: ["finalizado", "Finalizar curso"], finalizado: ["activo", "Reabrir curso"] };
const BARRA = { activo: "from-teal-400 to-unievents-dark", pendiente: "from-unievents-gold to-orange-500", finalizado: "from-slate-400 to-slate-600" };

// Gestión de cursos: crear, asignar/cambiar docente, cambiar estado y ver estudiantes.
export default function Cursos({ cursos, setCursos, docentes, irAEstudiantes, avisar }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [modal, setModal] = useState(false);

  const q = busqueda.trim().toLowerCase();
  const lista = cursos
    .filter((c) => filtro === "todos" || c.estado === filtro)
    .filter((c) => !q || `${c.titulo} ${c.docente.nombre} ${c.categoria}`.toLowerCase().includes(q));

  const actualizar = (id, cambios) => setCursos((prev) => prev.map((c) => (c.id === id ? { ...c, ...cambios } : c)));

  function crear(curso) {
    setCursos((prev) => [{ ...curso, id: Math.max(0, ...prev.map((c) => c.id)) + 1 }, ...prev]);
    setModal(false);
    avisar(`Curso "${curso.titulo}" creado`);
  }

  function cambiarDocente(c, id) {
    const docente = docentes.find((d) => d.id === id);
    if (!docente) return;
    actualizar(c.id, { docente });
    avisar(`Docente de "${c.titulo}": ${docente.nombre}`);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHero
        titulo="Gestión de cursos"
        subtitulo="Crea cursos, asigna docentes y controla el estado de cada uno."
        chips={[{ valor: cursos.length, etiqueta: "Cursos" }, { valor: cursos.filter((c) => c.estado === "activo").length, etiqueta: "Activos" }]}
      />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white border border-gray-100 shadow-sm p-4">
        <div className="relative flex-grow min-w-[220px] max-w-sm">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Ico nombre="buscar" /></span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por curso, docente o categoría"
            className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-2.5 text-sm font-medium outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all"
          />
        </div>

        <div className="inline-flex gap-1 p-1 rounded-2xl bg-gray-50 border border-gray-100">
          {FILTROS.map(([id, texto]) => (
            <button
              key={id}
              onClick={() => setFiltro(id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${filtro === id ? "bg-unievents-teal text-white shadow-md shadow-teal-200" : "text-gray-500 hover:bg-teal-50 hover:text-unievents-teal"}`}
            >
              {texto}
            </button>
          ))}
        </div>

        <Button onClick={() => setModal(true)} className="ml-auto flex items-center gap-2 shadow-lg shadow-teal-200">
          <Ico nombre="plus" className="w-5 h-5" /> Nuevo curso
        </Button>
      </div>

      {lista.length === 0 ? (
        <div className="rounded-3xl bg-white border border-gray-100 p-12 text-center text-gray-500 font-medium">No hay cursos que coincidan con la búsqueda.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {lista.map((c) => {
            const ocupacion = c.cupos ? Math.min(100, (c.inscritos / c.cupos) * 100) : 0;
            const [proximo, textoProximo] = SIGUIENTE[c.estado];
            return (
              <article key={c.id} className="flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${BARRA[c.estado]}`}>
                  {c.imagen ? (
                    <img src={c.imagen} alt={c.titulo} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-white/90">
                      <Ico nombre="curso" className="w-14 h-14" />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-unievents-teal shadow-sm">{c.categoria}</span>
                  <span className="absolute right-4 top-4"><Etiqueta tono={c.estado}>{ESTADOS[c.estado]}</Etiqueta></span>
                </div>
                <div className="flex flex-col flex-grow gap-4 p-6">

                  <div>
                    <h4 className="text-lg font-black leading-snug text-unievents-dark">{c.titulo}</h4>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{c.descripcion || "Sin descripción."}</p>
                  </div>

                  <label className="flex flex-col gap-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Docente
                    <select
                      value={c.docente.id}
                      onChange={(e) => cambiarDocente(c, e.target.value)}
                      className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold normal-case tracking-normal text-unievents-dark outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100"
                    >
                      {!docentes.some((d) => d.id === c.docente.id) && <option value={c.docente.id}>{c.docente.nombre}</option>}
                      {docentes.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                    </select>
                  </label>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-gray-400">Inicio</dt><dd className="font-semibold text-unievents-dark">{fechaCorta(c.inicio)}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-gray-400">Horario</dt><dd className="font-semibold text-unievents-dark">{c.horario}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-gray-400">Modalidad</dt><dd className="font-semibold text-unievents-dark">{c.modalidad}</dd></div>
                    <div><dt className="text-xs font-bold uppercase tracking-wider text-gray-400">Precio</dt><dd className="font-semibold text-unievents-dark">{c.precio ? moneda(c.precio) : "Gratis"}</dd></div>
                  </dl>

                  <div>
                    <div className="mb-1.5 flex justify-between text-xs font-bold text-gray-500">
                      <span>Cupos ocupados</span>
                      <span>{c.inscritos}/{c.cupos}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-unievents-teal transition-all duration-700" style={{ width: `${ocupacion}%` }} />
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <span className="text-sm font-bold text-gray-500">Ventas <span className="font-black text-unievents-teal">{moneda(ventasDe(c))}</span></span>
                    <div className="flex gap-2">
                      <button onClick={() => actualizar(c.id, { estado: proximo })} className="rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:border-unievents-teal hover:text-unievents-teal transition cursor-pointer">
                        {textoProximo}
                      </button>
                      <button onClick={() => irAEstudiantes(c.id)} className="rounded-full bg-unievents-teal px-4 py-2 text-xs font-bold text-white shadow-md shadow-teal-200 hover:bg-unievents-dark transition cursor-pointer">
                        Ver estudiantes
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {modal && <ModalCurso docentes={docentes} onCrear={crear} onCerrar={() => setModal(false)} />}
    </div>
  );
}

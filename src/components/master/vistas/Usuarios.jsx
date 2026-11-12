"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/botones/Button";
import Ico from "@/components/register/Ico";
import { Etiqueta } from "../ui/Tarjetas";
import ModalUsuario from "./ModalUsuario";
import { fechaCorta } from "../datos/estadisticas";
import { cap } from "@/utils/capitalizar";

export const ETIQUETA_ROL = { master: "Master", administrador: "Administrador", profesor: "Docente", alumno: "Estudiante" };
const FILTROS = [["todos", "Todos"], ["administrador", "Administradores"], ["profesor", "Docentes"], ["alumno", "Estudiantes"]];

export { cap };

// Usuarios reales del sistema (GET /api/usuarios/todos-usuarios) y alta de nuevos usuarios.
export default function Usuarios({ usuarios, recargar, avisar }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [modal, setModal] = useState(false);

  const lista = usuarios.lista;
  const cuenta = (rol) => lista.filter((u) => u.roles?.nombre === rol).length;
  const q = busqueda.trim().toLowerCase();
  const visibles = lista
    .filter((u) => filtro === "todos" || u.roles?.nombre === filtro)
    .filter((u) => !q || `${u.nombre} ${u.apellido} ${u.correo} ${u.cedula}`.toLowerCase().includes(q));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHero
        titulo="Gestión de usuarios"
        subtitulo="Crea cuentas de administradores, docentes y estudiantes, y consulta quién tiene acceso al sistema."
        chips={[{ valor: cuenta("administrador"), etiqueta: "Admins" }, { valor: cuenta("profesor"), etiqueta: "Docentes" }, { valor: cuenta("alumno"), etiqueta: "Estudiantes" }]}
      />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-white border border-gray-100 shadow-sm p-4">
        <div className="relative flex-grow min-w-[220px] max-w-sm">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Ico nombre="buscar" /></span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, correo o cédula"
            className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-2.5 text-sm font-medium outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all"
          />
        </div>

        <div className="inline-flex gap-1 p-1 rounded-2xl bg-gray-50 border border-gray-100 max-w-full overflow-x-auto">
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
          <Ico nombre="plus" className="w-5 h-5" /> Crear usuario
        </Button>
      </div>

      <section className="rounded-3xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        {usuarios.estado === "cargando" && <p className="p-10 text-center font-medium text-gray-500">Cargando usuarios...</p>}

        {usuarios.estado === "error" && (
          <div className="p-10 text-center space-y-4">
            <p className="font-semibold text-red-600">No se pudo cargar el listado: {usuarios.error}</p>
            <Button variant="back" onClick={recargar}>Reintentar</Button>
          </div>
        )}

        {usuarios.estado === "ok" && (visibles.length === 0 ? (
          <p className="p-10 text-center font-medium text-gray-500">No hay usuarios que coincidan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">Usuario</th>
                  <th className="py-4">Cédula</th>
                  <th className="py-4">Teléfono</th>
                  <th className="py-4">Rol</th>
                  <th className="py-4">Estado</th>
                  <th className="px-6 py-4">Creado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibles.map((u) => {
                  const suspendido = u.borrado || !u.estatus;
                  return (
                    <tr key={u.id} className="hover:bg-teal-50/40 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-teal-400 to-unievents-dark text-sm font-black text-white">{u.nombre?.[0]?.toUpperCase()}</span>
                          <div className="min-w-0">
                            <p className="font-bold text-unievents-dark truncate">{cap(u.nombre)} {cap(u.apellido)}</p>
                            <p className="text-xs font-medium text-gray-400 truncate">{u.correo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-gray-600">{u.nacionalidad ? "V" : "E"}-{u.cedula}</td>
                      <td className="py-3 font-medium text-gray-500">{u.telefono}</td>
                      <td className="py-3"><Etiqueta tono={u.roles?.nombre}>{ETIQUETA_ROL[u.roles?.nombre] || "-"}</Etiqueta></td>
                      <td className="py-3"><Etiqueta tono={suspendido ? "suspendido" : "activo"}>{suspendido ? "Suspendido" : "Activo"}</Etiqueta></td>
                      <td className="px-6 py-3 font-medium text-gray-500">{fechaCorta(String(u.createdAt).slice(0, 10))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {modal && (
        <ModalUsuario
          onCerrar={() => setModal(false)}
          onCreado={(rol) => {
            setModal(false);
            recargar();
            avisar(`${rol} creado correctamente`);
          }}
        />
      )}
    </div>
  );
}

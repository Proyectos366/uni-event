"use client";

import { useEffect, useState } from "react";
import SidebarMaster from "../SidebarMaster";
import Resumen from "../vistas/Resumen";
import Estadisticas from "../vistas/Estadisticas";
import Cursos from "../vistas/Cursos";
import EstudiantesPorCurso from "../vistas/EstudiantesPorCurso";
import Usuarios, { cap } from "../vistas/Usuarios";
import Perfil from "../vistas/Perfil";
import Ico from "@/components/register/Ico";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { CURSOS_EJEMPLO, DOCENTES_EJEMPLO } from "../datos/datosEjemplo";

const TITULOS = { resumen: "Inicio", estadisticas: "Estadísticas", cursos: "Cursos", estudiantes: "Estudiantes por curso", usuarios: "Usuarios", perfil: "Mi perfil" };

// Panel del usuario master: estado compartido entre las vistas (cursos, usuarios, aviso).
export default function MasterDashboard({ perfil, onLogout }) {
  const [tab, setTab] = useState("resumen");
  const [menuMovil, setMenuMovil] = useState(false);
  const [cursos, setCursos] = useState(CURSOS_EJEMPLO);
  const [cursoId, setCursoId] = useState(CURSOS_EJEMPLO[0].id);
  const [usuarios, setUsuarios] = useState({ estado: "cargando", lista: [], error: "" });
  const [aviso, setAviso] = useState("");

  // Cambiar `version` vuelve a pedir el listado (tras crear un usuario o al reintentar).
  const [version, setVersion] = useState(0);
  const recargar = () => setVersion((v) => v + 1);

  useEffect(() => {
    let vigente = true;
    fetch("/api/usuarios/todos-usuarios")
      .then((res) => res.json())
      .then((json) => {
        if (vigente) setUsuarios(json.status === "ok" ? { estado: "ok", lista: json.usuarios, error: "" } : { estado: "error", lista: [], error: json.message });
      })
      .catch(() => {
        if (vigente) setUsuarios({ estado: "error", lista: [], error: "No se pudo conectar con el servidor" });
      });
    return () => {
      vigente = false;
    };
  }, [version]);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(""), 4000);
    return () => clearTimeout(t);
  }, [aviso]);

  // Docentes asignables: los reales (rol profesor) más los de ejemplo mientras no haya suficientes.
  const docentes = [
    ...usuarios.lista.filter((u) => u.roles?.nombre === "profesor").map((u) => ({ id: u.id, nombre: `${cap(u.nombre)} ${cap(u.apellido)}` })),
    ...DOCENTES_EJEMPLO,
  ];

  const ir = (destino) => { setTab(destino); setMenuMovil(false); };
  const irAEstudiantes = (id) => { setCursoId(id); ir("estudiantes"); };
  const nombreVisible = cap(perfil.nombre || "Master");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50/60 via-unievents-bg to-unievents-bg">
      <SidebarMaster activeTab={tab} onTabChange={ir} onLogout={onLogout} isMobileOpen={menuMovil} onMobileClose={() => setMenuMovil(false)} />

      <div className="flex-grow flex flex-col min-w-0">
        <header className="px-5 lg:px-8 py-4 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
          <button onClick={() => setMenuMovil(true)} aria-label="Abrir menú" className="lg:hidden text-unievents-teal p-2 rounded-xl hover:bg-teal-50 focus:outline-none transition-all cursor-pointer shrink-0">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <img src="/icons/icon.svg" alt="UniEvent" className="lg:hidden w-10 h-10 object-contain shrink-0 select-none" />

          <h2 className="text-xl lg:text-2xl font-black text-unievents-dark tracking-tight flex-grow truncate select-none">{TITULOS[tab]}</h2>

          <ThemeToggle />

          <button type="button" onClick={() => ir("perfil")} aria-label="Ir a mi perfil" className="flex items-center gap-3 rounded-full bg-white pl-1.5 pr-4 py-1.5 shadow-sm border border-gray-100 shrink-0 hover:shadow-md transition cursor-pointer text-left">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-unievents-gold to-orange-500 text-white font-black select-none">{nombreVisible[0]}</span>
            <div className="hidden sm:flex flex-col leading-tight select-none">
              <span className="font-extrabold text-unievents-dark text-sm">{nombreVisible}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-unievents-teal">Master</span>
            </div>
          </button>
        </header>

        <main className="flex-grow p-4 sm:p-8">
          {tab === "resumen" && <Resumen cursos={cursos} irA={ir} nombre={nombreVisible} />}
          {tab === "estadisticas" && <Estadisticas cursos={cursos} />}
          {tab === "cursos" && <Cursos cursos={cursos} setCursos={setCursos} docentes={docentes} irAEstudiantes={irAEstudiantes} avisar={setAviso} />}
          {tab === "estudiantes" && <EstudiantesPorCurso cursos={cursos} cursoId={cursoId} setCursoId={setCursoId} />}
          {tab === "usuarios" && <Usuarios usuarios={usuarios} recargar={recargar} avisar={setAviso} />}
          {tab === "perfil" && <Perfil perfil={perfil} />}
        </main>
      </div>

      {aviso && (
        <div role="status" className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-2xl bg-unievents-dark px-5 py-3.5 text-sm font-bold text-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-unievents-gold text-unievents-dark"><Ico nombre="check" className="w-4 h-4" /></span>
          {aviso}
        </div>
      )}
    </div>
  );
}

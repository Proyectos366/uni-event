"use client";

import Ico from "@/components/register/Ico";

const imagoTipo = "/icons/icon_imagotipo.svg";

const GRUPOS = [
  { titulo: "Panel", items: [{ id: "resumen", label: "Inicio", icono: "casa" }, { id: "estadisticas", label: "Estadísticas", icono: "grafico" }] },
  { titulo: "Gestión académica", items: [{ id: "cursos", label: "Cursos", icono: "curso" }, { id: "estudiantes", label: "Estudiantes por curso", icono: "usuarios" }] },
  { titulo: "Administración", items: [{ id: "usuarios", label: "Usuarios", icono: "docente" }] },
  { titulo: "Cuenta", items: [{ id: "perfil", label: "Mi perfil", icono: "usuario" }] },
];

// Barra lateral del master (mismo lenguaje visual que la del estudiante, con su propio menú).
export default function SidebarMaster({ activeTab, onTabChange, onLogout, isMobileOpen, onMobileClose }) {
  return (
    <>
      {isMobileOpen && <div onClick={onMobileClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200" />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-unievents-dark via-teal-900 to-teal-800 text-white flex flex-col justify-between py-6 px-4 shadow-2xl transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:flex lg:translate-x-0 shrink-0 overflow-hidden ${
          isMobileOpen ? "flex translate-x-0" : "hidden lg:flex -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-unievents-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-teal-300/10 blur-3xl" />

        <div className="relative space-y-6">
          <div className="flex items-center justify-between px-2 select-none">
            <img src={imagoTipo} alt="UniEvent" className="h-28 w-auto object-contain -my-6 -ml-3" />
            <button onClick={onMobileClose} aria-label="Cerrar menú" className="lg:hidden text-teal-100 hover:text-white p-1 rounded-lg cursor-pointer">
              <Ico nombre="x" className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5">
            {GRUPOS.map((g) => (
              <div key={g.titulo} className="flex flex-col gap-1.5">
                <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-teal-300/70">{g.titulo}</p>
                {g.items.map((it) => {
                  const activo = activeTab === it.id;
                  return (
                    <button
                      key={it.id}
                      onClick={() => onTabChange(it.id)}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                        activo
                          ? "bg-white/15 text-white shadow-inner before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:rounded-full before:bg-unievents-gold"
                          : "text-teal-100/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Ico nombre={it.icono} />
                      <span>{it.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        <div className="relative px-1">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-3 font-bold text-teal-50 hover:text-white transition-all cursor-pointer">
            <Ico nombre="salir" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

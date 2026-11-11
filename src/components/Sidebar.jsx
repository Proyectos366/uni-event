"use client";

import React, { useState } from 'react';
const imagoTipo = "/icons/icon_imagotipo.svg";

/**
 * Componente global de barra lateral (Sidebar) para el panel del estudiante.
 * Incorpora un acordeón animado descendente bajo la opción 'Mi Perfil'.
 * @param {string} activeTab - Pestaña actualmente activa.
 * @param {function} onTabChange - Callback disparado al hacer clic en un botón de navegación.
 * @param {function} onLogout - Callback disparado al hacer clic en cerrar sesión.
 */
const Sidebar = ({ activeTab, onTabChange, onLogout, isMobileOpen, onMobileClose }) => {
  const [isPerfilExpanded, setIsPerfilExpanded] = useState(false);

  // Se muestra expandido si el usuario lo abrió o si la pestaña activa pertenece al perfil
  const perfilExpanded =
    isPerfilExpanded || ['perfil-datos', 'mis-actividades', 'certificados'].includes(activeTab);

  // Enlaces de navegación primarios del Sidebar (Estadísticas removido)
  const mainMenuItems = [
    { 
      id: 'inicio', 
      label: 'Inicio', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      id: 'actividades', 
      label: 'Actividades', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // Opciones internas del acordeón 'Mi Perfil' con sus respectivos iconos interactivos
  const perfilSubItems = [
    { 
      id: 'perfil-datos', 
      label: 'Mis Datos',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'mis-actividades', 
      label: 'Mis Actividades',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'certificados', 
      label: 'Mis certificados',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    }
  ];

  const itemBase = 'group relative flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all cursor-pointer';
  const itemActivo = 'bg-white/15 text-white shadow-inner before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:rounded-full before:bg-unievents-gold';
  const itemInactivo = 'text-teal-100/80 hover:bg-white/10 hover:text-white';
  const perfilActivo = ['perfil-datos', 'mis-actividades', 'certificados'].includes(activeTab);

  return (
    <>
      {/* Backdrop oscuro para pantallas móviles */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-unievents-dark via-teal-900 to-teal-800 text-white flex flex-col justify-between py-6 px-4 shadow-2xl transition-all duration-300
        lg:sticky lg:top-0 lg:h-screen lg:flex lg:translate-x-0 shrink-0 overflow-hidden
        ${isMobileOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0'}
      `}>
        {/* Luces decorativas */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-unievents-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-teal-300/10 blur-3xl" />

        <style>{`
          @keyframes slideDownSub {
            from { opacity: 0; max-height: 0px; transform: translateY(-10px); }
            to { opacity: 1; max-height: 180px; transform: translateY(0); }
          }
          .animate-slide-down-sub { animation: slideDownSub 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>

        <div className="relative space-y-8">
          {/* Marca */}
          <div className="flex items-center justify-between px-2 select-none">
            <img src={imagoTipo} alt="UniEvent" className="h-28 w-auto object-contain -my-6 -ml-3" />
            <button onClick={onMobileClose} aria-label="Cerrar menú" className="lg:hidden text-teal-100 hover:text-white p-1 rounded-lg cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex flex-col gap-1.5">
            <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-teal-300/70">Menú</p>

            {mainMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`${itemBase} ${activeTab === item.id ? itemActivo : itemInactivo}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <p className="px-4 pt-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-teal-300/70">Cuenta</p>

            <div className="flex flex-col">
              <button
                onClick={() => setIsPerfilExpanded(!perfilExpanded)}
                className={`${itemBase} justify-between ${perfilActivo ? 'bg-white/10 text-white' : itemInactivo}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Mi perfil</span>
                </div>
                <svg className={`w-4 h-4 transition-transform duration-300 ${perfilExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {perfilExpanded && (
                <div className="flex flex-col ml-6 mt-1.5 pl-3 gap-1 border-l border-white/15 animate-slide-down-sub overflow-hidden">
                  {perfilSubItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onTabChange(sub.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === sub.id ? 'bg-white/15 text-unievents-gold' : 'text-teal-100/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Cerrar sesión */}
        <div className="relative px-1">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-3 font-bold text-teal-50 hover:text-white transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

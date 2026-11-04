import React, { useState, useEffect } from 'react';
import isoTipo from '../assets/IsoTipo.png';

/**
 * Componente global de barra lateral (Sidebar) para el panel del estudiante.
 * Incorpora un acordeón animado descendente bajo la opción 'Mi Perfil'.
 * @param {string} activeTab - Pestaña actualmente activa.
 * @param {function} onTabChange - Callback disparado al hacer clic en un botón de navegación.
 * @param {function} onLogout - Callback disparado al hacer clic en cerrar sesión.
 */
const Sidebar = ({ activeTab, onTabChange, onLogout, isMobileOpen, onMobileClose }) => {
  const [isPerfilExpanded, setIsPerfilExpanded] = useState(false);

  // Auto-expandir el menú si la pestaña activa pertenece al perfil
  useEffect(() => {
    if (['perfil-datos', 'mis-actividades', 'certificados'].includes(activeTab)) {
      setIsPerfilExpanded(true);
    }
  }, [activeTab]);

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
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-teal-400 via-teal-500 to-teal-600 text-white flex flex-col justify-between py-8 px-4 shadow-2xl transition-all duration-300
        lg:sticky lg:top-0 lg:h-screen lg:flex lg:translate-x-0 shrink-0
        ${isMobileOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0'}
      `}>
      {/* Estilos locales para animación de acordeón suave descendente */}
      <style>{`
        @keyframes slideDownSub {
          from {
            opacity: 0;
            max-height: 0px;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 180px;
            transform: translateY(0);
          }
        }
        .animate-slide-down-sub {
          animation: slideDownSub 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="space-y-8">
        {/* Logo / Branding interactivo con IsoTipo (w-15 h-15) y Título */}
        <div className="flex items-center justify-between px-2 select-none">
          <div className="flex items-center gap-2">
            <img src={isoTipo} alt="UniEvent Logo" className="w-12 h-12 sm:w-15 sm:h-15 object-contain shrink-0" />
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-teal-50 drop-shadow-sm">
              UniEvent
            </h1>
          </div>
          {/* Botón Cerrar para versión móvil */}
          <button 
            onClick={onMobileClose}
            className="lg:hidden text-teal-100 hover:text-white p-1 rounded-lg focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex flex-col gap-2">
          {/* Enlaces de menú principales */}
          {mainMenuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive 
                    ? 'bg-[#134e4a] text-white shadow-md' 
                    : 'text-teal-50 hover:bg-teal-500 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Acordeón de Mi Perfil */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsPerfilExpanded(!isPerfilExpanded)}
              className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                ['perfil-datos', 'mis-actividades', 'certificados'].includes(activeTab)
                  ? 'bg-teal-700/30 text-white shadow-sm' 
                  : 'text-teal-50 hover:bg-teal-500 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Mi perfil</span>
              </div>
              
              {/* Indicador de colapso con rotación de 180 grados animada */}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isPerfilExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Sub-Menú animado en cascada descendente */}
            {isPerfilExpanded && (
              <div className="flex flex-col pl-7 mt-1.5 gap-1.5 animate-slide-down-sub overflow-hidden">
                {perfilSubItems.map((sub) => {
                  const isSubActive = activeTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onTabChange(sub.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isSubActive 
                          ? 'bg-[#134e4a] text-white shadow-sm' 
                          : 'text-teal-100/80 hover:bg-teal-500/50 hover:text-white'
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Botón de Cerrar Sesión en la parte inferior */}
      <div className="px-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 border-2 border-teal-200/50 hover:border-white px-4 py-3 rounded-xl font-bold text-teal-50 hover:text-white hover:bg-teal-700/30 transition-all"
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

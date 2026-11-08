import React, { useState } from 'react';
import Button from '../../../components/Button';

/**
 * Vista de Mis Actividades (MisActividades.jsx).
 * Muestra las actividades del estudiante ordenadas en tres secciones de tipo portafolio:
 * 'En Proceso' (por defecto), 'Pendiente' y 'Finalizada' con animación de despliegue descendente.
 */
const MisActividades = () => {
  // Pestaña de portafolio seleccionada: 'proceso' (por defecto), 'pendiente', o 'finalizada'
  const [subTab, setSubTab] = useState('proceso');
  
  // Estado para gestionar confirmación de cancelación
  const [confirmCancelId, setConfirmCancelId] = useState(null);
  
  // Listado de actividades simuladas del estudiante
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Hackathon UniDev 2025",
      time: "09:00 - 21:00",
      location: "Laboratorio de Informática",
      day: "22",
      month: "Jul",
      type: "proceso",
      statusLabel: "Inscrito",
      dateBg: "bg-blue-600"
    },
    {
      id: 2,
      title: "Concurso de Fotografía",
      time: "14:00 - 18:00",
      location: "Galería de Arte",
      day: "25",
      month: "Jul",
      type: "proceso",
      statusLabel: "Inscrito",
      dateBg: "bg-emerald-600"
    },
    {
      id: 3,
      title: "Taller de Oratoria y Liderazgo",
      time: "10:00 - 12:00",
      location: "Sala de Conferencias B",
      day: "05",
      month: "Ago",
      type: "pendiente",
      statusLabel: "Pendiente",
      dateBg: "bg-amber-500"
    },
    {
      id: 4,
      title: "Introducción a Scrum y Metodologías Ágiles",
      time: "09:00 - 13:00",
      location: "Aula Virtual Zoom",
      day: "10",
      month: "May",
      type: "finalizada",
      statusLabel: "Completada",
      dateBg: "bg-gray-400"
    }
  ]);

  // Filtrar actividades según la pestaña seleccionada
  const filteredActivities = activities.filter(act => act.type === subTab);

  // Acción para cancelar inscripción
  const handleCancelRegistration = (id) => {
    // Eliminar o actualizar tipo de actividad para simular la cancelación
    setActivities(activities.filter(act => act.id !== id));
    setConfirmCancelId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Estilos locales para animación descendente premium */}
      <style>{`
        @keyframes slideDownAct {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down-act {
          animation: slideDownAct 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. PORTAFOLIO DE NAVEGACIÓN INTERNA */}
      <div className="flex gap-1 border-b border-gray-200/60 pb-px">
        {/* Pestaña: En Proceso */}
        <button
          onClick={() => { setSubTab('proceso'); setConfirmCancelId(null); }}
          className={`pb-3 px-6 text-sm font-black tracking-wide uppercase transition-all border-b-2 relative ${
            subTab === 'proceso' 
              ? 'border-unievents-teal text-unievents-dark font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
          }`}
        >
          En Proceso
          {subTab === 'proceso' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-unievents-teal rounded-full" />
          )}
        </button>

        {/* Pestaña: Pendiente */}
        <button
          onClick={() => { setSubTab('pendiente'); setConfirmCancelId(null); }}
          className={`pb-3 px-6 text-sm font-black tracking-wide uppercase transition-all border-b-2 relative ${
            subTab === 'pendiente' 
              ? 'border-unievents-teal text-unievents-dark font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
          }`}
        >
          Pendientes
          {subTab === 'pendiente' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-unievents-teal rounded-full" />
          )}
        </button>

        {/* Pestaña: Finalizada */}
        <button
          onClick={() => { setSubTab('finalizada'); setConfirmCancelId(null); }}
          className={`pb-3 px-6 text-sm font-black tracking-wide uppercase transition-all border-b-2 relative ${
            subTab === 'finalizada' 
              ? 'border-unievents-teal text-unievents-dark font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
          }`}
        >
          Finalizadas
          {subTab === 'finalizada' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-unievents-teal rounded-full" />
          )}
        </button>
      </div>

      {/* 2. LISTADO DE ACTIVIDADES CON ANIMACIÓN DESCENDENTE */}
      {/* Usando key={subTab} para reiniciar la animación en cada transición */}
      <div key={subTab} className="animate-slide-down-act">
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
            {filteredActivities.map((act) => {
              const isConfirming = confirmCancelId === act.id;

              return (
                <div 
                  key={act.id} 
                  className={`bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-all relative overflow-hidden ${
                    isConfirming ? 'ring-2 ring-red-500/30' : ''
                  }`}
                >
                  {/* Fila Principal de Información */}
                  <div className="flex items-center gap-5">
                    
                    {/* Bloque de Fecha */}
                    <div className={`${act.dateBg} text-white rounded-xl px-4 py-3.5 flex flex-col items-center justify-center shrink-0 w-16 select-none shadow-sm`}>
                      <span className="text-2xl font-black leading-none">{act.day}</span>
                      <span className="text-xs font-black uppercase mt-1">{act.month}</span>
                    </div>

                    {/* Detalles de la Actividad */}
                    <div className="space-y-1.5 min-w-0">
                      <h4 className="text-base font-extrabold text-unievents-dark line-clamp-1">
                        {act.title}
                      </h4>
                      <div className="flex flex-col gap-1">
                        {/* Horario */}
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {act.time}
                        </span>
                        {/* Ubicación */}
                        <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {act.location}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Fila Inferior de Acciones */}
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-1">
                    
                    {/* Botón de Cancelación o Confirmación */}
                    {subTab !== 'finalizada' ? (
                      !isConfirming ? (
                        <button
                          onClick={() => setConfirmCancelId(act.id)}
                          className="border border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 font-bold px-4 py-2 rounded-xl text-xs transition-all active:scale-95"
                        >
                          Cancelar inscripción
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCancelRegistration(act.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-extrabold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wide transition-all active:scale-95"
                          >
                            Sí, Cancelar
                          </button>
                          <button
                            onClick={() => setConfirmCancelId(null)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-extrabold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wide transition-all active:scale-95"
                          >
                            No
                          </button>
                        </div>
                      )
                    ) : (
                      /* Si está finalizada, se puede ver el certificado */
                      <Button 
                        variant="secondary"
                        className="!px-4 !py-2 text-xs font-bold border-unievents-teal text-unievents-teal hover:bg-unievents-teal hover:text-white"
                      >
                        Ver certificado
                      </Button>
                    )}

                    {/* Badge de Estado en extremo inferior derecho */}
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider select-none ${
                      subTab === 'proceso' ? 'bg-[#22d3ee]/20 text-cyan-800' :
                      subTab === 'pendiente' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {act.statusLabel}
                    </span>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* --- ESTADO VACÍO (SIN COINCIDENCIAS) --- */
          <div className="bg-white/80 p-12 rounded-2xl border border-yellow-100/50 shadow-inner flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-unievents-teal shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h4 className="text-xl font-extrabold text-unievents-dark">No hay actividades registradas</h4>
            <p className="text-gray-500 max-w-sm text-sm font-medium">
              Actualmente no posees actividades en la sección de {
                subTab === 'proceso' ? 'En Proceso' : 
                subTab === 'pendiente' ? 'Pendientes' : 
                'Finalizadas'
              }.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MisActividades;

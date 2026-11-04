import React, { useState } from 'react';
import Button from '../../../components/Button';
import CardEvent from '../../../components/CardEvent';
import Sidebar from '../../../components/Sidebar';
import Actividades from '../Actividades/Actividades';
import PerfilDatos from '../PerfilDatos/PerfilDatos';
import MisActividades from '../MisActividades/MisActividades';
import Certificados from '../Certificados/Certificados';
import dataAnalysisImg from '../../../assets/data_analysis_event.png';
import uxUiImg from '../../../assets/ux_ui_event.png';
import imagoTipo from '../../../assets/ImagoTipo.png';

/**
 * Vista de Dashboard de Estudiante (Dashboard.jsx).
 * Muestra un panel central interactivo y delega la barra lateral al componente global Sidebar.
 */
const Dashboard = ({ onLogout }) => {
  // Pestaña activa del dashboard
  const [activeTab, setActiveTab] = useState('inicio');

  // Estado para controlar el menú hamburguesa / drawer móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estado para compartir la actividad seleccionada con la pestaña Actividades
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState(null);

  // Helper para redirigir e inyectar la actividad para ver más
  const handleVerMas = (activity) => {
    setSelectedActivityForDetails(activity);
    setActiveTab('actividades');
  };

  // Datos simulados para eventos próximos (con información completa de detalle)
  const upcomingEvents = [
    {
      id: 2,
      day: "15",
      month: "Jun",
      title: "Taller de Programación Web",
      time: "15:00 - 18:00",
      location: "Aula 305",
      description: "Domina HTML, CSS, JavaScript y React desde las bases sólidas.",
      fullDescription: "Conviértete en un desarrollador Frontend moderno. Partiendo desde los fundamentos absolutos de maquetación semántica e interactividad en el navegador, llegaremos a dominar React JS, consumo de APIs y optimizaciones en producción.",
      date: "15 Jun, 2025",
      price: "$25.00",
      instructor: "Ing. Christian Romero",
      category: "TECNOLOGÍA",
      status: "Pocos cupos",
      statusType: "warning"
    },
    {
      id: 4,
      day: "18",
      month: "Jun",
      title: "Conferencia: Inteligencia Artificial",
      time: "10:00 - 12:30",
      location: "Auditorio Principal",
      description: "Entrena tus primeros modelos de regresión y clasificación con Python.",
      fullDescription: "Aprende los pilares fundamentales del aprendizaje automático. Realizaremos la recolección, preprocesamiento de datos y entrenamiento de algoritmos supervisados usando librerías líderes como Pandas y Scikit-Learn.",
      date: "18 Jun, 2025",
      price: "Gratis",
      instructor: "Dr. Carlos Ruiz",
      category: "CIENCIA",
      status: "Cupos agotados",
      statusType: "danger"
    }
  ];

  // Datos completos para los eventos destacados
  const featuredEvents = [
    {
      id: 7,
      title: "Analisis de Datos",
      description: "Aprende las bases del análisis de datos y machine learning en este taller práctico.",
      fullDescription: "Aprende a recopilar, limpiar y analizar grandes conjuntos de datos para tomar decisiones estratégicas de negocio utilizando Python, Pandas, Matplotlib y Jupyter Notebooks.",
      date: "25 Jun, 2025",
      time: "10:00 - 14:00",
      price: "$20.00",
      instructor: "Dr. Carlos Ruiz",
      location: "Laboratorio de Sistemas 1",
      category: "TECNOLOGÍA",
      status: "Cupos disponibles",
      statusType: "success",
      imageUrl: dataAnalysisImg
    },
    {
      id: 8,
      title: "Masterclass de UX/UI Design",
      description: "Descubre las últimas tendencias en diseño de interfaces y experiencia de usuario.",
      fullDescription: "Explora metodologías de diseño centradas en el usuario, creación de wireframes interactivos y pruebas de usabilidad avanzadas para plataformas móviles y web.",
      date: "30 Jun, 2025",
      time: "15:00 - 19:00",
      price: "$15.00",
      instructor: "Lic. Andrea Paz",
      location: "Sala de Creatividad 3",
      category: "DISEÑO",
      status: "Pocos cupos",
      statusType: "warning",
      imageUrl: uxUiImg
    }
  ];

  // Datos del mini-calendario (Junio 2026)
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendarEvents = {
    15: { type: 'web', title: 'Taller de Programación Web' },
    18: { type: 'ai', title: 'Conferencia: Inteligencia Artificial' }
  };

  return (
    <div className="flex min-h-screen bg-[#fefce8]">
      {/* 1. SIDEBAR LATERAL GLOBAL REUTILIZABLE CON SOPORTE DRAWER MÓVIL */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }} 
        onLogout={onLogout} 
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. AREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Cabecera Superior del Dashboard */}
        <header className="px-5 lg:px-8 py-5 flex items-center bg-[#fefce8] border-b border-yellow-100 sticky top-0 z-30">
          {/* Logo ImagoTipo para móviles (antes del botón hamburguesa) */}
          <img 
            src={imagoTipo} 
            alt="UniEvent Logo Mobile" 
            className="lg:hidden w-12 h-12 object-contain mr-3 shrink-0 select-none"
          />

          {/* Botón Hamburguesa para móviles */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-teal-600 hover:text-teal-700 p-1.5 rounded-xl hover:bg-teal-50 focus:outline-none transition-all cursor-pointer mr-3 shrink-0"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h2 className="text-lg lg:text-2xl font-black text-unievents-dark uppercase tracking-wide flex-grow truncate select-none">
            {activeTab === 'inicio' ? 'Inicio' : 
             activeTab === 'actividades' ? 'Actividades' :
             activeTab === 'perfil-datos' ? 'Mis Datos' :
             activeTab === 'mis-actividades' ? 'Mis Actividades' :
             activeTab === 'certificados' ? 'Mis Certificados' :
             activeTab.replace('-', ' ')}
          </h2>

          {/* Badge del Estudiante / Usuario Gabriel */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-sm border border-gray-100 shrink-0">
            <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg uppercase">
              Estudiante
            </span>
            <span className="font-extrabold text-unievents-dark text-xs sm:text-sm select-none">
              Gabriel
            </span>
          </div>
        </header>

        {/* Contenido Dinámico según la pestaña activa */}
        <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
          {activeTab === 'inicio' ? (
            <div className="space-y-12">
              
              {/* FILA 1: Próximos Eventos y Calendario */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Panel de Próximos Eventos (Col-7) */}
                <section className="lg:col-span-7 space-y-6">
                  <h3 className="text-xl font-extrabold text-unievents-dark border-l-4 border-unievents-teal pl-3">
                    Próximos eventos
                  </h3>

                  {/* Banner de Bienvenida Azul */}
                  <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl flex gap-3 text-sky-800 shadow-sm">
                    <svg className="w-6 h-6 text-sky-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold leading-relaxed">
                      Bienvenido a UniEvent, aquí encontrarás todos los eventos disponibles para ti.
                    </p>
                  </div>

                  {/* Lista de Eventos Próximos */}
                  <div className="space-y-4">
                    {upcomingEvents.map((evt) => (
                      <div 
                        key={evt.id} 
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4 sm:gap-5">
                          {/* Badge de Fecha */}
                          <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex flex-col items-center justify-center text-unievents-teal shrink-0 select-none">
                            <span className="text-2xl font-black leading-none">{evt.day}</span>
                            <span className="text-xs font-bold uppercase mt-1">{evt.month}</span>
                          </div>

                          {/* Detalles del Evento */}
                          <div className="space-y-1">
                            <h4 className="text-base font-bold text-unievents-dark line-clamp-1">
                              {evt.title}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-unievents-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {evt.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-unievents-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {evt.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Botón */}
                        <Button 
                          onClick={() => handleVerMas(evt)}
                          variant="secondary" 
                          className="w-full sm:w-auto !px-4 !py-1.5 text-xs font-bold border-unievents-teal text-unievents-teal hover:bg-unievents-teal hover:text-white"
                        >
                          Ver más
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Panel de Calendario (Col-5) */}
                <section className="lg:col-span-5 space-y-6">
                  <h3 className="text-xl font-extrabold text-unievents-dark border-l-4 border-unievents-teal pl-3">
                    Mi calendario
                  </h3>

                  {/* Componente Mini-Calendario Premium */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    {/* Header del Calendario */}
                    <div className="flex justify-between items-center px-1">
                      <span className="text-sm font-black text-unievents-dark select-none">
                        Junio 2026
                      </span>
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-unievents-teal transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-unievents-teal transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 select-none">
                      <span>L</span>
                      <span>M</span>
                      <span>M</span>
                      <span>J</span>
                      <span>V</span>
                      <span>S</span>
                      <span>D</span>
                    </div>

                    {/* Grilla de Días */}
                    <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
                      {daysInJune.map((day) => {
                        const hasEvent = calendarEvents[day];
                        return (
                          <div 
                            key={day} 
                            className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all group/day cursor-pointer ${
                              hasEvent 
                                ? 'bg-teal-50 text-unievents-teal border border-teal-100' 
                                : 'hover:bg-gray-50 text-unievents-dark'
                            }`}
                          >
                            <span>{day}</span>
                            {/* Punto de evento */}
                            {hasEvent && (
                              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-unievents-teal" />
                            )}
                            
                            {/* Tooltip con información del evento */}
                            {hasEvent && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-[#134e4a] text-white text-xs rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/day:opacity-100 transition-opacity z-10 text-center">
                                {hasEvent.title}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#134e4a]" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>

              {/* FILA 2: Eventos Destacados */}
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-extrabold text-unievents-dark border-l-4 border-unievents-teal pl-3">
                    Eventos destacados
                  </h3>
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline border border-blue-600/30 px-3 py-1 rounded-lg bg-white shadow-sm hover:shadow transition-all">
                    Ver todos
                  </button>
                </div>

                {/* Cuadrícula de Tarjetas Reutilizadas y Extendidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredEvents.map((item) => (
                    <CardEvent 
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      imageUrl={item.imageUrl}
                      category={item.category}
                      status={item.status}
                      statusType={item.statusType}
                      hidePrice={true}
                      onVerMas={() => handleVerMas(item)}
                    />
                  ))}
                </div>
              </section>

            </div>
          ) : activeTab === 'actividades' ? (
            <Actividades 
              initialSelectedActivity={selectedActivityForDetails} 
              onClearSelectedActivity={() => setSelectedActivityForDetails(null)} 
            />
          ) : activeTab === 'perfil-datos' ? (
            <PerfilDatos />
          ) : activeTab === 'mis-actividades' ? (
            <MisActividades />
          ) : activeTab === 'certificados' ? (
            <Certificados />
          ) : (
            // Placeholder para otras pestañas del Sidebar
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center text-unievents-teal shadow-inner">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-unievents-dark capitalize">
                Sección: {activeTab.replace('-', ' ')}
              </h3>
              <p className="text-gray-500 max-w-md">
                Esta sección está siendo desarrollada. Muy pronto podrás ver y gestionar tus {activeTab.replace('-', ' ')} en tiempo real.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

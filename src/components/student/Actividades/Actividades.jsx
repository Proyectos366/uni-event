import React, { useState } from 'react';
import CardEvent from '../../../components/CardEvent';
import Button from '../../../components/Button';
import DetalleActividad from './DetalleActividad';

/**
 * Vista de Actividades para Estudiantes.
 * Contiene una cartelera de búsqueda y filtrado interactivo,
 * y un portafolio para alternar de forma animada descendente entre Cursos y Eventos.
 * Permite acceder al detalle extendido para la inscripción y compra de cupos.
 */
const Actividades = ({ initialSelectedActivity, onClearSelectedActivity }) => {
  // Estado para la actividad seleccionada para ver detalles
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Sincronizar con la actividad seleccionada desde el exterior (ej: Dashboard)
  React.useEffect(() => {
    if (initialSelectedActivity) {
      setSelectedActivity(initialSelectedActivity);
    }
  }, [initialSelectedActivity]);

  // Pestaña interna activa: 'cursos' o 'eventos'
  const [subTab, setSubTab] = useState('cursos');
  
  // Modos de vista: 'grid' (grilla) o 'list' (lista)
  const [viewMode, setViewMode] = useState('grid');

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [dateFilter, setDateFilter] = useState('Todas');

  // Listado de datos simulados para Cursos con ficha técnica completa
  const coursesData = [
    {
      id: 1,
      title: "Seminario de Investigación Académica",
      description: "Aprende metodologías de investigación para tu trabajo académico.",
      fullDescription: "Este seminario proporciona las herramientas metodológicas y conceptuales necesarias para estructurar y redactar con éxito investigaciones de nivel universitario. Abordaremos análisis bibliográficos, citación APA/IEEE y formulación de hipótesis.",
      date: "18 Jul, 2025",
      time: "09:00 - 13:00",
      price: "Gratis",
      instructor: "Dr. Alejandro Silva",
      location: "Aula Magna UniEvent",
      imageUrl: "",
      category: "EDUCACIÓN",
      status: "Cupos disponibles",
      statusType: "success"
    },
    {
      id: 2,
      title: "Programación Web Frontend",
      description: "Domina HTML, CSS, JavaScript y React desde las bases sólidas.",
      fullDescription: "Conviértete en un desarrollador Frontend moderno. Partiendo desde los fundamentos absolutos de maquetación semántica e interactividad en el navegador, llegaremos a dominar React JS, consumo de APIs y optimizaciones en producción.",
      date: "10 Ago, 2025",
      time: "18:00 - 21:00",
      price: "$25.00",
      instructor: "Ing. Christian Romero",
      location: "Laboratorio de Sistemas 2",
      imageUrl: "", 
      category: "TECNOLOGÍA",
      status: "Pocos cupos",
      statusType: "warning"
    },
    {
      id: 3,
      title: "Introducción al Diseño de Interfaces",
      description: "Descubre cómo estructurar y prototipar interfaces intuitivas y estéticas.",
      fullDescription: "Aprende el flujo de diseño UI moderno. Entenderemos las leyes de UX, teoría del color, tipografía y rejillas para plasmar diseños interactivos de alto impacto utilizando Figma como herramienta líder del sector.",
      date: "05 Sep, 2025",
      time: "14:00 - 17:00",
      price: "$15.00",
      instructor: "Lic. Andrea Paz",
      location: "Sala de Innovación A",
      imageUrl: "",
      category: "DISEÑO",
      status: "Cupos disponibles",
      statusType: "success"
    }
  ];

  // Listado de datos simulados para Eventos con ficha técnica completa
  const eventsData = [
    {
      id: 4,
      title: "Taller Práctico de Machine Learning",
      description: "Entrena tus primeros modelos de regresión y clasificación con Python.",
      fullDescription: "Aprende los pilares fundamentales del aprendizaje automático. Realizaremos la recolección, preprocesamiento de datos y entrenamiento de algoritmos supervisados usando librerías líderes como Pandas y Scikit-Learn.",
      date: "12 Sep, 2025",
      time: "08:00 - 12:00",
      price: "$30.00",
      instructor: "Dr. Carlos Ruiz",
      location: "Laboratorio de Inteligencia Artificial",
      imageUrl: "",
      category: "CIENCIA",
      status: "Cupos agotados",
      statusType: "danger"
    },
    {
      id: 5,
      title: "Seminario Internacional de Ciberseguridad",
      description: "Conferencias sobre las últimas tendencias de seguridad informática y hackeo ético.",
      fullDescription: "Un recorrido completo a nivel global sobre los nuevos vectores de ataque, protección perimetral, respuesta ante incidentes y normativas éticas de auditoría de sistemas dictado por expertos certificados en la industria.",
      date: "22 Oct, 2025",
      time: "09:00 - 18:00",
      price: "Gratis",
      instructor: "MSc. Alejandro Silva",
      location: "Auditorio de Ingeniería",
      imageUrl: "",
      category: "SEGURIDAD",
      status: "Cupos disponibles",
      statusType: "success"
    },
    {
      id: 6,
      title: "Workshop de UX Research",
      description: "Técnicas avanzadas de entrevista y testeo con usuarios reales en el mercado actual.",
      fullDescription: "Descubre cómo piensan y sienten tus usuarios reales. En este workshop intensivo y dinámico practicaremos pruebas de usabilidad, mapas de empatía y entrevistas cualitativas para validar productos digitales antes de su desarrollo.",
      date: "30 Nov, 2025",
      time: "10:00 - 14:00",
      price: "$10.00",
      instructor: "Lic. Andrea Paz",
      location: "Sala de Creatividad 3",
      imageUrl: "",
      category: "DISEÑO",
      status: "Pocos cupos",
      statusType: "warning"
    }
  ];

  // Selección de datos según la pestaña activa
  const currentData = subTab === 'cursos' ? coursesData : eventsData;

  // Filtrado lógico de datos
  const filteredData = currentData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'Todas' || item.category === categoryFilter;
    
    // Filtro simplificado de fechas
    const matchesDate = dateFilter === 'Todas' || 
                        (dateFilter === 'Julio' && item.date.includes('Jul')) ||
                        (dateFilter === 'Agosto' && item.date.includes('Ago')) ||
                        (dateFilter === 'Septiembre' && item.date.includes('Sep'));

    return matchesSearch && matchesCategory && matchesDate;
  });

  // Categorías únicas para el selector de filtros
  const allCategories = ['Todas', 'EDUCACIÓN', 'TECNOLOGÍA', 'DISEÑO', 'CIENCIA', 'SEGURIDAD'];

  // Si se seleccionó una actividad, renderizamos de forma fluida el DetalleActividad
  if (selectedActivity) {
    return (
      <DetalleActividad 
        activity={selectedActivity} 
        onBack={() => {
          setSelectedActivity(null);
          if (onClearSelectedActivity) onClearSelectedActivity();
        }} 
        onPurchaseSuccess={(act) => {
          setSelectedActivity(null);
          if (onClearSelectedActivity) onClearSelectedActivity();
        }}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Estilos locales para garantizar animación premium descendente */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. BARRA DE BÚSQUEDA Y FILTROS INTERACTIVOS */}
      <div className="bg-white p-4 rounded-2xl border border-yellow-100 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        
        {/* Controles de Entrada */}
        <div className="flex flex-wrap flex-grow gap-3 max-w-4xl">
          {/* Búsqueda */}
          <div className="relative flex-grow min-w-[200px] max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-unievents-teal focus:border-transparent text-sm font-medium bg-[#fcfcfc] placeholder-gray-400 transition-all"
            />
          </div>

          {/* Categoría Dropdown */}
          <div className="relative min-w-[180px]">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-unievents-teal bg-[#fcfcfc] text-sm font-semibold text-unievents-dark transition-all appearance-none cursor-pointer"
            >
              <option value="Todas">Todas las categorías</option>
              {allCategories.filter(cat => cat !== 'Todas').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          {/* Fecha Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-unievents-teal bg-[#fcfcfc] text-sm font-semibold text-unievents-dark transition-all appearance-none cursor-pointer"
            >
              <option value="Todas">Cualquier fecha</option>
              <option value="Julio">Julio 2025</option>
              <option value="Agosto">Agosto 2025</option>
              <option value="Septiembre">Septiembre 2025</option>
            </select>
            <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Alternador de Diseño (Grilla vs Lista) */}
        <div className="flex gap-2 shrink-0 bg-gray-50 border border-gray-100 p-1 rounded-xl">
          {/* Botón Lista */}
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600 shadow-sm border border-gray-100' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Vista de Lista"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Botón Grilla */}
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Vista de Grilla"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>

      </div>

      {/* 2. SUB-NAVEGACIÓN PORTAFOLIO */}
      <div className="flex gap-1 border-b border-gray-200/60 pb-px">
        {/* Pestaña Cursos */}
        <button
          onClick={() => setSubTab('cursos')}
          className={`pb-3 px-6 text-sm font-black tracking-wide uppercase transition-all border-b-2 relative ${
            subTab === 'cursos' 
              ? 'border-unievents-teal text-unievents-dark font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
          }`}
        >
          Catálogo de Cursos
          {subTab === 'cursos' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-unievents-teal rounded-full" />
          )}
        </button>

        {/* Pestaña Eventos */}
        <button
          onClick={() => setSubTab('eventos')}
          className={`pb-3 px-6 text-sm font-black tracking-wide uppercase transition-all border-b-2 relative ${
            subTab === 'eventos' 
              ? 'border-unievents-teal text-unievents-dark font-extrabold' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200'
          }`}
        >
          Eventos (Talleres / Seminarios)
          {subTab === 'eventos' && (
            <span className="absolute bottom-0 inset-x-0 h-0.5 bg-unievents-teal rounded-full" />
          )}
        </button>
      </div>

      {/* 3. SECCIÓN DE CONTENIDO CON ANIMACIÓN DESCENDENTE */}
      <div key={subTab} className="animate-slide-down">
        {filteredData.length > 0 ? (
          viewMode === 'grid' ? (
            /* --- DISEÑO DE GRILLA --- */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item) => (
                <CardEvent 
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  imageUrl={item.imageUrl}
                  category={item.category}
                  status={item.status}
                  statusType={item.statusType}
                  hidePrice={false}
                  price={item.price}
                  onVerMas={() => setSelectedActivity(item)}
                />
              ))}
            </div>
          ) : (
            /* --- DISEÑO DE LISTA HORIZONTAL PREMIUM --- */
            <div className="space-y-4 max-w-5xl">
              {filteredData.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Badge de Categoría e Icono */}
                    <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex flex-col items-center justify-center text-unievents-teal shrink-0 select-none w-16 h-16">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>

                    {/* Detalles */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-black bg-teal-100/60 text-unievents-dark px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-400">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-unievents-dark">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-2xl line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Estado y Botón */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-unievents-teal">{item.price}</span>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wide ${
                        item.statusType === 'success' ? 'bg-emerald-100 text-emerald-800' :
                        item.statusType === 'warning' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <Button 
                      onClick={() => setSelectedActivity(item)}
                      variant="secondary" 
                      className="!px-4 !py-2 text-xs font-bold border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shrink-0"
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* --- ESTADO VACÍO (SIN COINCIDENCIAS) --- */
          <div className="bg-white/80 p-12 rounded-2xl border border-yellow-100/50 shadow-inner flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-unievents-teal shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.0" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-extrabold text-unievents-dark">No se encontraron actividades</h4>
            <p className="text-gray-500 max-w-md text-sm font-medium">
              No hay {subTab} que coincidan con la búsqueda o el filtro actual. Intenta cambiar los criterios de búsqueda o limpia los filtros.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('Todas');
                setDateFilter('Todas');
              }}
              className="text-sm font-bold text-unievents-teal hover:underline hover:text-teal-700"
            >
              Restaurar filtros
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Actividades;

import React from 'react';
import CardEvent from '../../../components/CardEvent';

/**
 * Tablero de Eventos y Cursos (EventsBoard).
 * Renderiza dinámicamente una lista de cursos o eventos filtrada por tipo.
 */
const EventsBoard = ({ title = "Cursos Disponibles", type = "curso", limit }) => {
  // Datos simulados
  const allData = [
    { 
      title: "Introducción a la Programación", 
      description: "Aprende los fundamentos de la programación utilizando Python y desarrolla tus primeras aplicaciones.",
      date: "1 de Julio, 2026",
      type: "curso",
      imageUrl: ""
    },
    { 
      title: "Matemáticas Aplicadas", 
      description: "Optimiza tus habilidades cuantitativas aplicadas en economía, sociología y estadística.",
      date: "15 de Julio, 2026",
      type: "curso",
      imageUrl: ""
    },
    { 
      title: "Redacción Académica", 
      description: "Mejora tus técnicas de escritura y comunicación para trabajos y tesis universitarias.",
      date: "20 de Julio, 2026",
      type: "curso",
      imageUrl: ""
    },
    { 
      title: "Hackathon UniEvent 2026", 
      description: "Compite con los mejores talentos de la universidad en este evento épico de 48 horas.",
      date: "12 de Agosto, 2026",
      type: "evento",
      imageUrl: ""
    },
    { 
      title: "Feria de Emprendimiento", 
      description: "Presenta tus proyectos ante inversionistas y expertos del sector.",
      date: "05 de Septiembre, 2026",
      type: "evento",
      imageUrl: ""
    }
  ];

  // Filtrar por tipo (curso o evento) si se especifica
  const filteredData = type ? allData.filter(item => item.type === type) : allData;
  
  // Limitar cantidad de tarjetas a mostrar si se especifica un límite
  const displayData = limit ? filteredData.slice(0, limit) : filteredData;

  return (
    <section className="bg-unievents-bg py-20 px-6 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de Sección dinámico según el tipo */}
        <div className="border-l-4 border-unievents-teal pl-6 mb-12">
          <h2 className="text-4xl font-black text-unievents-dark">{title}</h2>
          <p className="text-gray-500 mt-2 text-lg">
            {type === 'curso' 
              ? "Impulsa tu carrera con nuestra selección académica." 
              : "No te pierdas las actividades más importantes de la comunidad."}
          </p>
        </div>

        {/* Cuadrícula de Tarjetas de Evento/Curso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.map((item, index) => (
            <CardEvent 
              key={index}
              title={item.title}
              description={item.description}
              date={item.date}
              type={item.type}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsBoard;

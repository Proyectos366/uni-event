import React from 'react';

/**
 * Componente Hero del Home.
 * Presenta el mensaje principal de bienvenida y la transición visual premium.
 */
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-teal-400 to-teal-600 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          UniEvent: Tu Portal de Cursos y Eventos Académicos
        </h1>
        <p className="text-lg md:text-xl mb-10 text-teal-50 opacity-90">
          Descubre y participa en los mejores cursos y actividades académicas disponibles. 
          Mantente al día con los eventos que impulsan tu formación y crecimiento profesional.
        </p>
        
        {/* Botón de llamada a la acción del Hero */}
        <button className="bg-unievents-dark text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer">
          Explorar Cursos
        </button>
      </div>
      
      {/* Decoración sutil de fondo para la transición al siguiente bloque */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 fill-unievents-bg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,103.49,240,113.84,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

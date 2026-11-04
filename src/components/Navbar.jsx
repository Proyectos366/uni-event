import React, { useState } from 'react';
import isoTipo from '../assets/IsoTipo.png';
import Button from './Button';

const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar la navegación y cerrar el menú móvil
  const handleNavigate = (view) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="bg-unievents-bg shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logotipo interactivo con IsoTipo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          <img src={isoTipo} alt="UniEvent Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold text-unievents-teal tracking-tight">
            UniEvent
          </span>
        </div>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <button 
          className="md:hidden text-unievents-teal focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Enlaces de Navegación (Escritorio) */}
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            className="text-gray-600 hover:text-unievents-teal font-medium transition" 
            onClick={() => handleNavigate('cursos')}
          >
            Cursos
          </button>
          <button 
            className="text-gray-600 hover:text-unievents-teal font-medium transition" 
            onClick={() => handleNavigate('eventos')}
          >
            Eventos
          </button>
          <button 
            className="text-gray-600 hover:text-unievents-teal font-medium transition"
            onClick={() => handleNavigate('register')}
          >
            Regístrate
          </button>
          
          <Button 
            variant="primary" 
            className="!px-5 !py-2 shadow-md"
            onClick={() => handleNavigate('login')}
          >
            Inicia Sesión
          </Button>
        </div>
      </div>

      {/* Menú Desplegable (Móvil) con animación de 1 segundo */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-[1000ms] ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-4 pb-4">
          <button 
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100" 
            onClick={() => handleNavigate('cursos')}
          >
            Cursos
          </button>
          <button 
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100" 
            onClick={() => handleNavigate('eventos')}
          >
            Eventos
          </button>
          <button 
            className="text-left text-gray-600 hover:text-unievents-teal font-medium py-2 border-b border-gray-100"
            onClick={() => handleNavigate('register')}
          >
            Regístrate
          </button>
          
          <Button 
            variant="primary" 
            className="w-full !py-3 shadow-md"
            onClick={() => handleNavigate('login')}
          >
            Inicia Sesión
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

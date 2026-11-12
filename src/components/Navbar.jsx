"use client";

import React, { useState } from 'react';
const imagoTipo = "/icons/icon_imagotipo.svg";
import { useRouter } from 'next/navigation';
import Button from '@/components/botones/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';

const RUTAS = { home: '/', cursos: '/cursos', eventos: '/eventos', register: '/register', login: '/login' };

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar la navegación y cerrar el menú móvil
  const handleNavigate = (view) => {
    router.push(RUTAS[view]);
    setIsOpen(false);
  };

  return (
    <nav className="bg-unievents-bg shadow-md sticky top-0 z-50 px-[6px] py-0 min-h-[55px]">
      <div className="flex justify-between items-center w-full">
        {/* Logotipo interactivo con IsoTipo */}
        <div
          className="flex items-center mt-2 gap-2 -ml-[14px] cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          <img src={imagoTipo} alt="UniEvent" className="h-35 w-auto object-contain -my-[73px] relative z-10" />
        </div>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle className="relative top-1.5" />
          <button 
          className="md:hidden mt-3 text-unievents-teal focus:outline-none"
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
        </div>

        {/* Enlaces de Navegación (Escritorio) */}
        <div className="hidden md:flex mt-2 space-x-8 items-center">
          <ThemeToggle />
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

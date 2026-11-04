import React from 'react';

/**
 * Componente Checkbox global.
 * Presenta un diseño personalizado con el color de la marca, centro blanco al activarse.
 */
const Checkbox = ({ label, id, checked, onChange, className = '' }) => {
  return (
    <label 
      htmlFor={id} 
      className={`flex items-center group cursor-pointer select-none ${className}`}
    >
      <div className="relative">
        {/* Input oculto pero funcional para accesibilidad */}
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        
        {/* Cuadrado del checkbox personalizado */}
        <div className="w-5 h-5 border-2 border-unievents-teal rounded bg-white transition-all duration-200 peer-checked:bg-unievents-teal peer-checked:border-unievents-teal flex items-center justify-center">
          {/* Icono de Check (blanco en el centro cuando está activo) */}
          <svg 
            className={`w-3.5 h-3.5 text-white transition-transform duration-200 transform ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      {/* Etiqueta del checkbox */}
      {label && (
        <span className="ml-3 text-sm font-medium text-unievents-dark group-hover:text-unievents-teal transition-colors">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;

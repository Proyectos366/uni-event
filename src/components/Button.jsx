import React from 'react';

/**
 * Componente Button global.
 * Proporciona un botón premium y altamente reutilizable con variantes integradas.
 */
const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  // Estilos base compartidos por todos los botones
  const baseStyles = 'px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variantes de estilo según el propósito del botón
  const variants = {
    primary: 'bg-unievents-teal text-white hover:bg-unievents-dark focus:ring-unievents-teal',
    secondary: 'bg-white border-2 border-unievents-teal text-unievents-teal hover:bg-unievents-bg focus:ring-unievents-teal',
    back: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

/**
 * Componente base (Padre) para campos de entrada (Inputs).
 * Cumple con los principios SOLID:
 * - Single Responsibility Principle (SRP): Su única responsabilidad es renderizar la estructura básica de un input con su etiqueta y error.
 * - Open/Closed Principle (OCP): Está abierto a la extensión (mediante props y children) pero cerrado a la modificación.
 * - Liskov Substitution Principle (LSP): Puede usarse en cualquier lugar donde se espere un input estándar de HTML.
 */
const Input = React.forwardRef(({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  className = '', 
  children, // Permite inyectar elementos adicionales como botones dentro del contenedor del input (ej. mostrar/ocultar contraseña)
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {/* Etiqueta del campo de entrada */}
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-unievents-teal mb-1">
          {label}
        </label>
      )}
      
      {/* Contenedor relativo para permitir posicionar iconos o botones internos */}
      <div className="relative">
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all ${
            children ? 'pr-12' : ''
          } ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        
        {/* Renderiza elementos hijos (por ejemplo, el botón de alternar contraseña) */}
        {children}
      </div>
      
      {/* Mensaje de error de validación si existe */}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

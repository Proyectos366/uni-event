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
  icono, // nodo opcional mostrado a la izquierda del campo
  ayuda, // texto de ayuda bajo el campo
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
        {icono && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">{icono}</span>}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl bg-white text-unievents-dark placeholder:text-gray-400 focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 outline-none transition-all ${
            children ? 'pr-12' : ''
          } ${icono ? 'pl-11' : ''} ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-200'
          } ${className}`}
          {...props}
        />
        
        {/* Renderiza elementos hijos (por ejemplo, el botón de alternar contraseña) */}
        {children}
      </div>
      
      {/* Mensaje de error de validación si existe */}
      {error ? <span className="text-xs text-red-500 mt-1">{error}</span> : ayuda && <span className="text-xs text-gray-400 mt-1">{ayuda}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

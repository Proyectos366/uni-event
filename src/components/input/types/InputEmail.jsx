import React from 'react';
import Input from '../Input';

/**
 * Componente especializado para entrada de Correo Electrónico.
 * Extiende del componente base `Input` (DIP y LSP de SOLID).
 * Su única responsabilidad es configurar un campo optimizado para emails (SRP).
 */
const InputEmail = React.forwardRef(({ 
  label = "Correo electrónico", 
  placeholder = "ejemplo@ejemplo.com", 
  ...props 
}, ref) => {
  return (
    <Input
      ref={ref}
      label={label}
      name="email"
      type="email"
      placeholder={placeholder}
      {...props}
    />
  );
});

InputEmail.displayName = 'InputEmail';

export default InputEmail;

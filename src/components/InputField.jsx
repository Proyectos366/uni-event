import React from 'react';
import Input from './input/Input';

/**
 * Componente InputField heredado para mantener compatibilidad.
 * Ahora delega su comportamiento al componente base de SOLID `Input` (DIP y LSP).
 */
const InputField = React.forwardRef(({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <Input
      ref={ref}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      className={className}
      {...props}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;

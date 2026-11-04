import React from 'react';
import InputField from '../../../components/InputField';

const StepPerfil = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Información Personal</h3>
      <InputField
        label="Nombre Completo"
        name="nombre"
        placeholder="Juan Pérez"
        value={formData.nombre}
        onChange={handleChange}
      />
      <InputField
        label="Cédula de Identidad"
        name="cedula"
        placeholder="12.345.678"
        value={formData.cedula}
        onChange={handleChange}
      />
    </div>
  );
};

export default StepPerfil;

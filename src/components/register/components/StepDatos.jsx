import React from 'react';
import InputEmail from '../../../components/input/types/InputEmail';
import InputPassword from '../../../components/input/types/InputPassword';

const StepDatos = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Datos de acceso</h3>
      <InputEmail
        value={formData.email}
        onChange={handleChange}
      />
      <InputPassword
        value={formData.password}
        onChange={handleChange}
      />
    </div>
  );
};

export default StepDatos;

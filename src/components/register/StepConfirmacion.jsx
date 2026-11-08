import React from 'react';

const StepConfirmacion = ({ formData, updateFormData }) => {
  const roles = [
    { id: 'estudiante', label: 'Estudiante', description: 'Participa en cursos y eventos' },
    { id: 'organizador', label: 'Organizador', description: 'Crea y gestiona tus propios eventos' },
  ];

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <h3 className="text-xl font-bold text-unievents-dark mb-2">Selecciona tu Rol</h3>
      
      {/* Opciones de Rol */}
      <div className="grid grid-cols-1 gap-3">
        {roles.map((role) => (
          <label
            key={role.id}
            className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${
              formData.rol === role.id
                ? 'border-unievents-teal bg-teal-50'
                : 'border-gray-200 hover:border-teal-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-unievents-dark">{role.label}</span>
              <input
                type="radio"
                name="rol"
                value={role.id}
                checked={formData.rol === role.id}
                onChange={() => updateFormData({ rol: role.id })}
                className="w-4 h-4 text-unievents-teal focus:ring-unievents-teal"
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">{role.description}</p>
          </label>
        ))}
      </div>
      
      {/* Resumen Final */}
      <div className="mt-4 p-4 bg-unievents-bg rounded-xl border border-yellow-100">
        <p className="text-sm text-unievents-dark">
          <span className="font-bold">Resumen:</span> Registrarás a <span className="font-bold">{formData.nombre || '...'}</span> con el correo <span className="font-bold">{formData.email || '...'}</span>.
        </p>
      </div>
    </div>
  );
};

export default StepConfirmacion;

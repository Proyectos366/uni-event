import React, { useState } from 'react';
import StepIndicator from './components/StepIndicator';
import StepDatos from './components/StepDatos';
import StepPerfil from './components/StepPerfil';
import StepConfirmacion from './components/StepConfirmacion';
import Button from '../../components/Button';
import imagoTipo from '../../assets/ImagoTipo.png';

const RegisterView = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    cedula: '',
    rol: 'estudiante'
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      console.log('Datos Finales:', formData);
      alert('¡Registro completado con éxito!');
      if (onBack) onBack(); // Opcional: volver al inicio tras registro exitoso
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepDatos formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <StepPerfil formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <StepConfirmacion formData={formData} updateFormData={updateFormData} />;
      default:
        return <StepDatos formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <section className="bg-gradient-to-br from-teal-400 to-teal-600 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="max-w-md w-full bg-unievents-bg p-8 rounded-3xl shadow-xl border border-gray-100">
          {/* Logotipo Imagotipo */}
          <img src={imagoTipo} alt="UniEvent Full Logo" className="w-40 mx-auto mb-2" />

          {/* Encabezado del Formulario */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-black text-unievents-dark">Crear Cuenta</h2>
            <p className="text-gray-500 mt-1">Únete a la comunidad</p>
          </div>

          {/* Indicador de Progreso (Stepper) */}
          <StepIndicator currentStep={step} totalSteps={3} />

          {/* Renderizado Dinámico del Paso Actual */}
          <div className="min-h-[300px] mb-8">
            {renderStep()}
          </div>

          {/* Controles de Navegación del Formulario */}
          <div className="flex gap-4">
            {step > 1 && (
              <Button variant="back" onClick={handleBack} className="flex-1">
                Atrás
              </Button>
            )}
            <Button onClick={handleNext} className="flex-[2]">
              {step === 3 ? 'Finalizar Registro' : 'Siguiente Paso'}
            </Button>
          </div>

          {/* Botón para volver al Inicio (Solo se muestra en el Paso 1) */}
          {step === 1 && onBack && (
            <div className="text-center mt-6">
              <button
                onClick={onBack}
                className="text-unievents-teal font-bold hover:underline"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisterView;

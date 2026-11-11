import Ico from "./Ico";

const ETIQUETAS = ["Acceso", "Datos", "Confirmar"];

// Indicador de progreso: círculo con check en pasos completados y etiqueta debajo.
const StepIndicator = ({ currentStep, totalSteps = 3 }) => (
  <ol className="flex items-start justify-center mb-8">
    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
      const hecho = step < currentStep;
      const actual = step === currentStep;
      return (
        <li key={step} className="flex items-start">
          <div className="flex flex-col items-center gap-1.5 w-16">
            <span
              className={`grid place-items-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300 ${
                hecho
                  ? "bg-unievents-teal border-unievents-teal text-white"
                  : actual
                    ? "bg-white border-unievents-teal text-unievents-teal ring-4 ring-teal-100"
                    : "bg-white border-gray-200 text-gray-400"
              }`}
              aria-current={actual ? "step" : undefined}
            >
              {hecho ? <Ico nombre="check" /> : step}
            </span>
            <span className={`text-xs font-semibold ${actual || hecho ? "text-unievents-dark" : "text-gray-400"}`}>
              {ETIQUETAS[step - 1]}
            </span>
          </div>
          {step < totalSteps && (
            <div className={`mt-5 h-0.5 w-10 rounded transition-colors duration-300 ${hecho ? "bg-unievents-teal" : "bg-gray-200"}`} />
          )}
        </li>
      );
    })}
  </ol>
);

export default StepIndicator;

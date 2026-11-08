import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          {/* Círculo del paso */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
              step <= currentStep
                ? 'bg-unievents-teal border-unievents-teal text-white'
                : 'bg-white border-gray-300 text-gray-400'
            }`}
          >
            {step}
          </div>
          {/* Línea conectora entre pasos */}
          {step < totalSteps && (
            <div
              className={`w-12 h-1 ml-4 rounded ${
                step < currentStep ? 'bg-unievents-teal' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;

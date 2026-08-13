import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, label: 'UPLOAD' },
    { id: 2, label: 'DEFINE' },
    { id: 3, label: 'GET FRAMED' },
  ];

  return (
    <div className="lg:hidden w-full py-4 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex items-center justify-center">
              {currentStep === step.id ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[#ff1683]"
                />
              ) : (
                <div
                  className={`w-2 h-2 rounded-full ${
                    step.id < currentStep ? 'bg-[#ff1683]' : 'bg-[#b5c5b9]'
                  }`}
                />
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-px ${
                  step.id < currentStep ? 'bg-[#ff1683]/30' : 'bg-[#123c2a]/15'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex justify-between w-full max-w-[200px] px-2">
        {steps.map((step) => (
          <span
            key={step.id}
            className={`text-[10px] uppercase tracking-wider ${
              currentStep === step.id ? 'text-[#123c2a] font-medium' : 'text-[#7a927f]'
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;

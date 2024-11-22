'use client'
import { useState } from 'react';
import { ProcessStep } from "@/components/ProcessStep";
import { steps } from "@/config/steps";
import { StepId } from "@/types/steps";

export default function Home() {
  const [currentStepId, setCurrentStepId] = useState<StepId>('config');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);
  const isLastStep = currentStepIndex === steps.length - 1;
  
  const handleNext = () => {
    if (isLastStep) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStepId('config');
      }, 2000);
      return;
    }
    
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepId(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(steps[currentStepIndex - 1].id);
    }
  };

  const currentStep = steps.find(step => step.id === currentStepId);
  const content = typeof currentStep?.content === 'function' 
    ? currentStep.content()
    : currentStep?.content;

  return (
    <div className="min-h-screen p-6 relative">
      {/* Alerta de Sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="text-green-500 text-xl font-bold mb-2">
              ✓ Processo Concluído com Sucesso!
            </div>
            <p className="text-gray-600">
              Voltando ao início...
            </p>
          </div>
        </div>
      )}

      <header className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Sistema de Comunicação Segura</h1>
        <p className="text-gray-600">Assinatura Digital e Criptografia</p>
      </header>

      <div className="w-[80%] mx-auto bg-white p-8 rounded-lg h-[80vh] border-2 border-gray-200 shadow-lg">
        <div className="flex gap-6 h-full">
          <nav className="w-64 border-r-2 border-gray-200 pr-6">
            <ul className="h-full flex flex-col justify-between py-8">
              {steps.map((step) => (
                <ProcessStep 
                  key={step.id}
                  title={step.title}
                  status={
                    step.id === currentStepId
                      ? 'current'
                      : currentStepIndex > steps.findIndex(s => s.id === step.id)
                      ? 'completed'
                      : 'pending'
                  }
                />
              ))}
            </ul>
          </nav>

          <main className="flex-1 flex flex-col">
            <div className="flex-1 p-6 rounded-lg mb-4 bg-white">
              {content}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Voltar
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 rounded text-white ${
                  isLastStep ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLastStep ? 'Concluir' : 'Avançar'}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

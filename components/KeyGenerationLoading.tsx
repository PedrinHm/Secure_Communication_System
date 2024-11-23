import { useEffect, useState } from 'react';

interface LoadingConfig {
  title: string;
  steps: string[];
  animationType: 'numbers' | 'bits';
}

const RSA_CONFIG: LoadingConfig = {
  title: "Gerando Chaves RSA",
  steps: [
    "Inicializando o processo de geração das chaves RSA...",
    "Gerando números primos grandes e aleatórios...",
    "Calculando o produto dos números primos (modulus)...",
    "Determinando o valor do expoente público (e = 65537)...",
    "Calculando a chave privada correspondente...",
    "Finalizando a criação das chaves RSA...",
    "Parabéns! As chaves foram geradas com sucesso."
  ],
  animationType: 'numbers'
};

const AES_CONFIG: LoadingConfig = {
  title: "Gerando Chave AES",
  steps: [
    "Inicializando o processo de criação da chave AES...",
    "Gerando um valor aleatório seguro...",
    "Validando a segurança da chave gerada...",
    "Ajustando o comprimento da chave para 256 bits...",
    "Finalizando o processo de geração da chave AES...",
    "Parabéns! A chave AES foi gerada com sucesso."
  ],
  animationType: 'bits'
};

interface KeyGenerationLoadingProps {
  type: 'RSA' | 'AES';
  onComplete: () => void;
}

export function KeyGenerationLoading({ type, onComplete }: KeyGenerationLoadingProps) {
  const config = type === 'RSA' ? RSA_CONFIG : AES_CONFIG;
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === config.steps.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.steps.length]);

  useEffect(() => {
    if (currentStep === 1) {
      setShowAnimation(true);
      const animationTimer = setInterval(() => {
        setShowAnimation((prev) => !prev);
      }, 300);

      return () => clearInterval(animationTimer);
    }
  }, [currentStep]);

  const renderAnimation = () => {
    if (config.animationType === 'numbers') {
      return Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * 999999)
      ).join(" • ");
    } else {
      return Array.from({ length: 2 }, () => (
        <div key={Math.random()}>
          {Array.from({ length: 32 }, () => 
            Math.random() < 0.5 ? '0' : '1'
          ).join('')}
        </div>
      ));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <div className="space-y-4">
          {/* Título */}
          <h3 className="text-xl font-bold text-center mb-6">
            {config.title}
          </h3>

          {/* Container com altura fixa para todo o conteúdo */}
          <div className="h-[180px] flex flex-col">
            {/* Área de mensagem e animação com altura fixa */}
            <div className="h-[120px] flex flex-col items-center justify-center">
              {/* Mensagem atual */}
              <div className="text-center mb-4">
                <p className="text-gray-700 text-lg">
                  {config.steps[currentStep]}
                </p>
              </div>

              {/* Animação */}
              <div className={`text-sm font-mono text-gray-500 text-center overflow-hidden space-y-1 transition-opacity duration-200 ${
                currentStep === 1 && showAnimation ? 'opacity-100' : 'opacity-0'
              }`}>
                {renderAnimation()}
              </div>
            </div>

            {/* Área do botão com altura fixa */}
            <div className="h-[60px] flex items-center justify-center">
              {currentStep === config.steps.length - 1 && (
                <button
                  onClick={onComplete}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  Concluir
                </button>
              )}
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ 
                width: `${(currentStep / (config.steps.length - 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { RSA_CONFIG, AES_CONFIG }; 
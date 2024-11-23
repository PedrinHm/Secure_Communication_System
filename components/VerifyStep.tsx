import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, KeyIcon, DocumentIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface DetailedStepProps {
  completed: boolean;
  step: number;
  currentStep: number;
  isProcessing: boolean;
}

function DetailedStep({ completed, step, currentStep, isProcessing }: DetailedStepProps) {
  const isActive = step === currentStep;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-6 bg-white shadow-sm"
    >
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recuperação da Chave AES</h3>
            {completed && <CheckIcon className="w-6 h-6 text-green-500" />}
          </div>
          
          <div className="flex items-center justify-center gap-8 py-4">
            <motion.div 
              className="flex flex-col items-center"
              animate={isActive ? { x: 140 } : { x: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <KeyIcon className="w-12 h-12 text-blue-500" />
              <span className="text-sm mt-2">Chave RSA Privada</span>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center relative"
              animate={isActive || completed ? 
                { filter: "blur(0px)" } : 
                { filter: "blur(4px)" }
              }
              transition={{ duration: 0.5, delay: isActive ? 1.2 : 0 }}
            >
              <KeyIcon className="w-12 h-12 text-green-500" />
              <span className="text-sm mt-2">Chave AES</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-green-500/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.div>
          </div>
          
          <p className="text-sm text-gray-600">
            A chave privada RSA do professor é utilizada para descriptografar a chave simétrica AES 
            que foi cifrada durante o processo de envio.
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Descriptografia do Arquivo</h3>
            {completed && <CheckIcon className="w-6 h-6 text-green-500" />}
          </div>
          
          <div className="flex items-center justify-center py-4 relative">
            <div className="relative flex items-center justify-center gap-20">
              {/* Arquivo Cifrado Inicial */}
              <motion.div 
                className="flex flex-col items-center"
                animate={completed ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <DocumentIcon className="w-12 h-12 text-gray-400" />
                <span className="text-sm mt-2">Arquivo Cifrado</span>
              </motion.div>

              {/* Arquivo Original (aparece gradualmente) */}
              <motion.div 
                className="flex flex-col items-center absolute"
                initial={{ opacity: 0 }}
                animate={completed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: isActive ? 1.5 : 0 }}
              >
                <DocumentIcon className="w-12 h-12 text-green-500" />
                <span className="text-sm mt-2">Arquivo Original</span>
              </motion.div>

              {/* Chave AES Animada com título */}
              {(isActive || completed) && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ 
                    x: 0,
                    opacity: 1,
                    scale: isActive ? [1, 1.2, 1] : 1
                  }}
                  transition={{ 
                    duration: isActive ? 2 : 0.5,
                    times: isActive ? [0, 0.3, 1] : undefined
                  }}
                >
                  <KeyIcon className="w-8 h-8 text-green-500" />
                  <span className="text-xs mt-1">Chave AES</span>
                </motion.div>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Com a chave AES recuperada, o sistema descriptografa o conteúdo do arquivo, 
            restaurando-o ao seu estado original.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Verificação da Assinatura</h3>
            {completed && <CheckIcon className="w-6 h-6 text-green-500" />}
          </div>
          
          <div className="flex items-center justify-center gap-8 py-4">
            {/* Hash do Arquivo - Agora sempre visível */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <DocumentIcon className="w-12 h-12 text-green-500" />
                {isActive && !completed && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent"
                    initial={{ y: -48 }}
                    animate={{ y: 48 }}
                    transition={{
                      duration: 1.5,
                      repeat: 1,
                      ease: "linear"
                    }}
                  />
                )}
              </div>
              <span className="text-sm mt-2">Hash do Arquivo</span>
            </div>

            {/* Primeira linha conectora */}
            {isActive && (
              <motion.div 
                className="h-0.5 w-20 bg-gradient-to-r from-blue-500 to-blue-500"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            )}

            {/* Ícone de Verificação */}
            {isActive && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <div className="relative">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500 rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                <span className="text-xs mt-1">Verificando</span>
              </motion.div>
            )}

            {/* Segunda linha conectora */}
            {isActive && (
              <motion.div 
                className="h-0.5 w-20 bg-gradient-to-r from-blue-500 to-green-500"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
              />
            )}

            {/* Assinatura Verificada */}
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={completed ? { 
                opacity: 1, 
                scale: 1 
              } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 4.5, duration: 0.3 }}
            >
              <div className="relative">
                <ShieldCheckIcon className="w-12 h-12 text-green-500" />
                {completed && (
                  <motion.div
                    className="absolute inset-0 bg-green-500/20 rounded-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1 }}
                  />
                )}
              </div>
              <span className="text-sm mt-2">Assinatura Verificada</span>
            </motion.div>
          </div>

          <motion.p 
            className="text-sm text-gray-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isActive ? (
              "Verificando a assinatura digital usando a chave pública do aluno..."
            ) : completed ? (
              "A assinatura digital foi verificada com sucesso usando a chave pública do aluno, garantindo a autenticidade e integridade do arquivo."
            ) : (
              "A assinatura digital será verificada usando a chave pública do aluno, garantindo a autenticidade e integridade do arquivo."
            )}
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

export function VerifyStep() {
  const [privateKey, setPrivateKey] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  const handleDecryption = async () => {
    if (!privateKey.trim()) {
      alert('Por favor, insira a chave privada');
      return;
    }

    setStatus('processing');
    
    try {
      // Simular processo de descriptografia
      for (let step = 0; step <= 3; step++) {
        setCurrentStep(step);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Verificação e Descriptografia</h2>
        <p className="text-gray-600">
          O professor precisa usar sua chave privada RSA para iniciar o processo de descriptografia e verificação do arquivo recebido.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Chave Privada do Professor:</label>
          <input
            type="text"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Digite sua chave privada RSA"
          />
        </div>

        <button
          onClick={handleDecryption}
          disabled={status === 'processing'}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {status === 'processing' ? 'Processando...' : 'Iniciar Descriptografia'}
        </button>
      </div>

      {status !== 'idle' && (
        <div className="space-y-4">
          <DetailedStep 
            completed={currentStep >= 1}
            step={1}
            currentStep={currentStep}
            isProcessing={status === 'processing'}
          />
          <DetailedStep 
            completed={currentStep >= 2}
            step={2}
            currentStep={currentStep}
            isProcessing={status === 'processing'}
          />
          <DetailedStep 
            completed={currentStep >= 3}
            step={3}
            currentStep={currentStep}
            isProcessing={status === 'processing'}
          />

          {status === 'success' && (
            <div className="bg-green-100 text-green-700 p-4 rounded">
              Arquivo verificado e descriptografado com sucesso!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
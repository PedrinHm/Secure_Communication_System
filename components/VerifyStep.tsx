import { useState, useEffect } from 'react';
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
          
          <div className="flex items-center justify-center gap-12 py-8">
            <motion.div 
              className="flex flex-col items-center"
              animate={isActive ? { 
                x: 100,
                scale: [1, 1.1, 1],
                rotateY: [0, 360]
              } : { x: 0 }}
              transition={{ 
                duration: 1.8, 
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <KeyIcon className="w-14 h-14 text-blue-500" />
              <span className="text-sm mt-3 font-medium">Chave RSA Privada</span>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center relative"
              animate={isActive || completed ? 
                { filter: "blur(0px)", scale: 1 } : 
                { filter: "blur(4px)", scale: 0.9 }
              }
              transition={{ duration: 0.7, delay: isActive ? 1.5 : 0 }}
            >
              <KeyIcon className="w-14 h-14 text-green-500" />
              <span className="text-sm mt-3 font-medium">Chave AES</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-green-500/30 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 1.5,
                    repeat: Infinity
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
          
          <div className="flex items-center justify-center py-8 relative">
            <div className="relative flex items-center justify-center gap-24">
              <motion.div 
                className="flex flex-col items-center"
                animate={completed ? 
                  { opacity: 0, x: -50 } : 
                  { opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <DocumentIcon className="w-14 h-14 text-gray-400" />
                <span className="text-sm mt-3 font-medium">Arquivo Cifrado</span>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={completed ? 
                  { opacity: 1, scale: 1 } : 
                  { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: isActive ? 2 : 0 }}
              >
                <DocumentIcon className="w-14 h-14 text-green-500" />
                <span className="text-sm mt-3 font-medium">Arquivo Original</span>
              </motion.div>

              {(isActive || completed) && (
                <motion.div
                  className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 1.5 }}
                >
                  <KeyIcon className="w-10 h-10 text-green-500" />
                  <span className="text-xs mt-2 font-medium">Chave AES</span>
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
export function VerifyStep({ setIsStepComplete }: { setIsStepComplete: (isComplete: boolean) => void }) {
  const [privateKey, setPrivateKey] = useState('');
  const [steps, setSteps] = useState({
    aesRecovery: { status: 'idle' as 'idle' | 'processing' | 'success' | 'error' },
    fileDecryption: { status: 'idle' as 'idle' | 'processing' | 'success' | 'error' },
    signatureVerification: { status: 'idle' as 'idle' | 'processing' | 'success' | 'error' }
  });

  const handleAESRecovery = async () => {
    if (!privateKey.trim()) {
      alert('Por favor, insira a chave privada');
      return;
    }

    setSteps(prev => ({
      ...prev,
      aesRecovery: { status: 'processing' }
    }));

    // Simular processo
    await new Promise(resolve => setTimeout(resolve, 3000));

    setSteps(prev => ({
      ...prev,
      aesRecovery: { status: 'success' }
    }));
  };

  const handleFileDecryption = async () => {
    if (steps.aesRecovery.status !== 'success') {
      alert('Por favor, complete a recuperação da chave AES primeiro');
      return;
    }

    setSteps(prev => ({
      ...prev,
      fileDecryption: { status: 'processing' }
    }));

    // Simular processo
    await new Promise(resolve => setTimeout(resolve, 3000));

    setSteps(prev => ({
      ...prev,
      fileDecryption: { status: 'success' }
    }));
  };

  const handleSignatureVerification = async () => {
    if (steps.fileDecryption.status !== 'success') {
      alert('Por favor, complete a descriptografia do arquivo primeiro');
      return;
    }

    setSteps(prev => ({
      ...prev,
      signatureVerification: { status: 'processing' }
    }));

    // Simular processo
    await new Promise(resolve => setTimeout(resolve, 5000));

    setSteps(prev => ({
      ...prev,
      signatureVerification: { status: 'success' }
    }));
  };

  const handleReset = () => {
    setPrivateKey('');
    setSteps({
      aesRecovery: { status: 'idle' },
      fileDecryption: { status: 'idle' },
      signatureVerification: { status: 'idle' }
    });
  };

  useEffect(() => {
    // Atualiza o estado de conclusão quando todas as verificações estiverem concluídas
    const allStepsCompleted = Object.values(steps).every(step => step.status === 'success');
    setIsStepComplete(allStepsCompleted);
  }, [steps, setIsStepComplete]);

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
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <DetailedStep 
            completed={steps.aesRecovery.status === 'success'}
            step={1}
            currentStep={steps.aesRecovery.status === 'processing' ? 1 : 0}
            isProcessing={steps.aesRecovery.status === 'processing'}
          />
          <button
            onClick={handleAESRecovery}
            disabled={steps.aesRecovery.status === 'processing' || steps.aesRecovery.status === 'success'}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.aesRecovery.status === 'processing' ? 'Recuperando...' : 
             steps.aesRecovery.status === 'success' ? 'Chave AES Recuperada' : 
             'Recuperar Chave AES'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailedStep 
            completed={steps.fileDecryption.status === 'success'}
            step={2}
            currentStep={steps.fileDecryption.status === 'processing' ? 2 : 0}
            isProcessing={steps.fileDecryption.status === 'processing'}
          />
          <button
            onClick={handleFileDecryption}
            disabled={steps.fileDecryption.status === 'processing' || 
                     steps.fileDecryption.status === 'success' || 
                     steps.aesRecovery.status !== 'success'}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.fileDecryption.status === 'processing' ? 'Descriptografando...' : 
             steps.fileDecryption.status === 'success' ? 'Arquivo Descriptografado' : 
             'Descriptografar Arquivo'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailedStep 
            completed={steps.signatureVerification.status === 'success'}
            step={3}
            currentStep={steps.signatureVerification.status === 'processing' ? 3 : 0}
            isProcessing={steps.signatureVerification.status === 'processing'}
          />
          <button
            onClick={handleSignatureVerification}
            disabled={steps.signatureVerification.status === 'processing' || 
                     steps.signatureVerification.status === 'success' || 
                     steps.fileDecryption.status !== 'success'}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.signatureVerification.status === 'processing' ? 'Verificando...' : 
             steps.signatureVerification.status === 'success' ? 'Assinatura Verificada' : 
             'Verificar Assinatura'}
          </button>
        </div>
      </div>

      {/* Adicione o botão de reset após o último step */}
      {Object.values(steps).every(step => step.status === 'success') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Repetir
          </button>
        </motion.div>
      )}
    </div>
  );
}
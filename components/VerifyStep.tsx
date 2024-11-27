import { motion } from 'framer-motion';
import { CheckIcon, KeyIcon, DocumentIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

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
          <p className="text-sm text-gray-600">
            A assinatura digital foi verificada com sucesso usando a chave pública do aluno,
            garantindo a autenticidade e integridade do arquivo.
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function VerifyStep({ stepState, setStepState, setIsStepComplete }) {
  const { privateKey = '', steps = {} } = stepState;

  // Inicializar `steps` caso esteja vazio
  useEffect(() => {
    if (!steps.aesRecovery) {
      setStepState((prev) => ({
        ...prev,
        steps: {
          aesRecovery: { status: 'idle' },
          fileDecryption: { status: 'idle' },
          signatureVerification: { status: 'idle' },
        },
      }));
    }
  }, [steps, setStepState]);

  const handleAESRecovery = async () => {
    if (!privateKey.trim()) {
      alert('Por favor, insira a chave privada');
      return;
    }

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        aesRecovery: { status: 'processing' },
      },
    }));

    // Simular processo
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        aesRecovery: { status: 'success' },
      },
    }));
  };

  const handleFileDecryption = async () => {
    if (steps.aesRecovery?.status !== 'success') {
      alert('Por favor, complete a recuperação da chave AES primeiro');
      return;
    }

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        fileDecryption: { status: 'processing' },
      },
    }));

    // Simular processo
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        fileDecryption: { status: 'success' },
      },
    }));
  };

  const handleSignatureVerification = async () => {
    if (steps.fileDecryption?.status !== 'success') {
      alert('Por favor, complete a descriptografia do arquivo primeiro');
      return;
    }

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        signatureVerification: { status: 'processing' },
      },
    }));

    // Simular processo
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setStepState((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        signatureVerification: { status: 'success' },
      },
    }));
  };

  const handleReset = () => {
    setStepState({
      privateKey: '',
      steps: {
        aesRecovery: { status: 'idle' },
        fileDecryption: { status: 'idle' },
        signatureVerification: { status: 'idle' },
      },
    });
  };

  useEffect(() => {
    const allStepsCompleted = Object.values(steps).every(
      (step) => step.status === 'success'
    );
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
            onChange={(e) =>
              setStepState((prev) => ({ ...prev, privateKey: e.target.value }))
            }
            className="w-full p-2 border rounded"
            placeholder="Digite sua chave privada RSA"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <DetailedStep
            completed={steps.aesRecovery?.status === 'success'}
            step={1}
            currentStep={steps.aesRecovery?.status === 'processing' ? 1 : 0}
            isProcessing={steps.aesRecovery?.status === 'processing'}
          />
          <button
            onClick={handleAESRecovery}
            disabled={
              steps.aesRecovery?.status === 'processing' ||
              steps.aesRecovery?.status === 'success'
            }
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.aesRecovery?.status === 'processing'
              ? 'Recuperando...'
              : steps.aesRecovery?.status === 'success'
              ? 'Chave AES Recuperada'
              : 'Recuperar Chave AES'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailedStep
            completed={steps.fileDecryption?.status === 'success'}
            step={2}
            currentStep={steps.fileDecryption?.status === 'processing' ? 2 : 0}
            isProcessing={steps.fileDecryption?.status === 'processing'}
          />
          <button
            onClick={handleFileDecryption}
            disabled={
              steps.fileDecryption?.status === 'processing' ||
              steps.fileDecryption?.status === 'success' ||
              steps.aesRecovery?.status !== 'success'
            }
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.fileDecryption?.status === 'processing'
              ? 'Descriptografando...'
              : steps.fileDecryption?.status === 'success'
              ? 'Arquivo Descriptografado'
              : 'Descriptografar Arquivo'}
          </button>
        </div>

        <div className="space-y-4">
          <DetailedStep
            completed={steps.signatureVerification?.status === 'success'}
            step={3}
            currentStep={
              steps.signatureVerification?.status === 'processing' ? 3 : 0
            }
            isProcessing={steps.signatureVerification?.status === 'processing'}
          />
          <button
            onClick={handleSignatureVerification}
            disabled={
              steps.signatureVerification?.status === 'processing' ||
              steps.signatureVerification?.status === 'success' ||
              steps.fileDecryption?.status !== 'success'
            }
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {steps.signatureVerification?.status === 'processing'
              ? 'Verificando...'
              : steps.signatureVerification?.status === 'success'
              ? 'Assinatura Verificada'
              : 'Verificar Assinatura'}
          </button>
        </div>
      </div>

      {Object.values(steps || {}).every((step) => step.status === 'success') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Repetir
          </button>
        </motion.div>
      )}
    </div>
  );
}
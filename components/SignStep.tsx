import { motion } from 'framer-motion';
import { useState, useEffect } from 'react'; 
import { FaFileAlt, FaLock, FaSignature } from 'react-icons/fa';

export function SignStep({ stepState, setStepState, setIsStepComplete }) {
  const {
    isSigningAnimating,
    isEncryptingAnimating,
    isSigned,
    isEncrypted,
    showSignInfo,
    showEncryptInfo,
  } = stepState; 

  const startSigningAnimation = () => {
    setStepState({ isSigningAnimating: true });
    setTimeout(() => {
      setStepState({ isSigningAnimating: false, isSigned: true });
    }, 2000);
  };

  const startEncryptingAnimation = () => {
    setStepState({ isEncryptingAnimating: true });
    setTimeout(() => {
      setStepState({ isEncryptingAnimating: false, isEncrypted: true });
    }, 2000);
  };

  const handleReset = () => {
    setStepState({
      isSigningAnimating: false,
      isEncryptingAnimating: false,
      isSigned: false,
      isEncrypted: false,
      showSignInfo: false,
      showEncryptInfo: false,
    });
  };

  const getStatusText = () => {
    if (!isSigned) return "Primeiro, assine digitalmente o arquivo.";
    if (isSigningAnimating) return "Assinando digitalmente o arquivo...";
    if (!isEncrypted && !isEncryptingAnimating) return "Agora, cifre o arquivo para protegê-lo.";
    if (isEncryptingAnimating) return "Cifrando o arquivo...";
    return "Arquivo assinado e cifrado com sucesso!";
  };

  useEffect(() => {
    // Atualiza o estado de conclusão quando o arquivo estiver assinado e cifrado
    setIsStepComplete(isSigned && isEncrypted);
  }, [isSigned, isEncrypted, setIsStepComplete]);

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
        {/* Coluna da esquerda - Assinatura */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              startSigningAnimation();
              setStepState({ showSignInfo: true });
            }}
            className="w-48 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSigningAnimating || isEncryptingAnimating || isSigned}
          >
            Assinar Digitalmente
          </button>
          {showSignInfo && (
            <div className="mt-2 bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Assinatura Digital</h3>
              <p className="text-sm text-green-600">
                A assinatura digital garante a autenticidade do documento,
                confirmando que ele foi realmente criado por você e não foi
                alterado desde sua criação. Utiliza criptografia assimétrica
                com sua chave privada.
              </p>
            </div>
          )}
        </div>

        {/* Coluna central - Arquivo */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <motion.div className="text-6xl text-blue-600">
              <FaFileAlt />
            </motion.div>

            <motion.div
              className="absolute text-green-600 text-4xl"
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={
                isSigningAnimating
                  ? { x: 0, y: 0, opacity: 1 }
                  : isSigned
                  ? { x: -30, y: -30, opacity: 1 }
                  : { x: -100, y: -100, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <FaSignature />
            </motion.div>

            <motion.div
              className="absolute text-yellow-600 text-4xl"
              initial={{ x: 100, y: -100, opacity: 0 }}
              animate={
                isEncryptingAnimating
                  ? { x: 0, y: 0, opacity: 1 }
                  : isEncrypted
                  ? { x: 30, y: -30, opacity: 1 }
                  : { x: 100, y: -100, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <FaLock />
            </motion.div>
          </div>
        </div>

        {/* Coluna da direita - Cifragem */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              startEncryptingAnimation();
              setStepState({ showEncryptInfo: true });
            }}
            className="w-48 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSigningAnimating || isEncryptingAnimating || !isSigned || isEncrypted}
          >
            Cifrar Arquivo
          </button>
          {showEncryptInfo && (
            <div className="mt-2 bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">Cifragem</h3>
              <p className="text-sm text-yellow-600">
                A cifragem protege o conteúdo do arquivo, tornando-o ilegível
                para quem não possui a chave de descriptografia. Apenas o
                destinatário com a chave correta poderá acessar o conteúdo.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-gray-700">
        {getStatusText()}
      </p>

      {(isSigned && isEncrypted) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            Repetir
          </button>
        </motion.div>
      )}
    </div>
  );
}

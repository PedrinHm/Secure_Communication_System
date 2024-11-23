import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaFileAlt, FaLock, FaSignature } from 'react-icons/fa';

export function SignStep() {
  const [isSigningAnimating, setIsSigningAnimating] = useState(false);
  const [isEncryptingAnimating, setIsEncryptingAnimating] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [showSignInfo, setShowSignInfo] = useState(false);
  const [showEncryptInfo, setShowEncryptInfo] = useState(false);

  const startSigningAnimation = () => {
    setIsSigningAnimating(true);
    setTimeout(() => {
      setIsSigningAnimating(false);
      setIsSigned(true);
    }, 2000);
  };

  const startEncryptingAnimation = () => {
    setIsEncryptingAnimating(true);
    setTimeout(() => {
      setIsEncryptingAnimating(false);
      setIsEncrypted(true);
    }, 2000);
  };

  const getStatusText = () => {
    if (!isSigned) return "Primeiro, assine digitalmente o arquivo.";
    if (isSigningAnimating) return "Assinando digitalmente o arquivo...";
    if (!isEncrypted && !isEncryptingAnimating) return "Agora, cifre o arquivo para protegê-lo.";
    if (isEncryptingAnimating) return "Cifrando o arquivo...";
    return "Arquivo assinado e cifrado com sucesso!";
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      {/* Container principal com largura fixa */}
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
        {/* Coluna da esquerda - Assinatura */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              startSigningAnimation();
              setShowSignInfo(true);
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
              setShowEncryptInfo(true);
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

      {/* Status e detalhes técnicos permanecem iguais */}
      <p className="text-center text-gray-700">
        {getStatusText()}
      </p>

      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalhes Técnicos</h3>
        
        <div className="space-y-2">
          {/* Hash */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Hash:</span>
            <span className={`font-mono ${isSigned ? 'text-green-600' : 'text-gray-400'}`}>
              {isSigned ? "8f4e8d9c7b6a5..." : "Aguardando assinatura..."}
            </span>
          </div>

          {/* Assinatura */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Assinatura:</span>
            <span className={`${isSigned ? 'text-green-600' : 'text-gray-400'}`}>
              {isSigned ? "RSA-256" : "Pendente"}
            </span>
          </div>

          {/* Nome cifrado */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Nome cifrado:</span>
            <span className={`font-mono ${isEncrypted ? 'text-yellow-600' : 'text-gray-400'}`}>
              {isEncrypted ? "Y8x&%7#F.txt" : "arquivo_original.txt"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Lock, CheckCircle, RefreshCw, Key } from "lucide-react";

export function ProtectStep() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [originalKeySize] = useState(32); // Tamanho da chave AES (256 bits = 32 bytes)
  const [encryptedKeySize, setEncryptedKeySize] = useState<number | null>(null);
  const [recipientName] = useState("Professor João");
  const [showDetails, setShowDetails] = useState(false);
  const [encryptionSteps, setEncryptionSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleEncryptKey = async () => {
    setIsEncrypting(true);
    setEncryptionSteps([]);
    setCurrentStep(0);

    const steps = [
      "Gerando padding PKCS#1 v1.5 para a chave AES...",
      "Convertendo chave AES para formato binário...",
      "Aplicando função de hash SHA-256 para verificação...",
      "Obtendo chave pública RSA do destinatário...",
      "Realizando cifragem RSA-2048...",
      "Codificando resultado em Base64...",
      "Verificando integridade da chave cifrada...",
    ];

    // Simula cada etapa do processo de cifragem
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setEncryptionSteps(prev => [...prev, steps[i]]);
          setCurrentStep(i + 1);
          resolve(null);
        }, 800); // Cada etapa leva 800ms
      });
    }

    // Finaliza o processo
    setTimeout(() => {
      setEncryptedKeySize(256); // Tamanho típico de uma chave RSA-2048 cifrada
      setIsEncrypting(false);
      setIsEncrypted(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsEncrypting(false);
    setIsEncrypted(false);
    setShowInfo(false);
    setEncryptedKeySize(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6 p-6"
    >
      {/* Cabeçalho simplificado */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Proteção da Chave Simétrica</h2>
            <p className="text-gray-500 mt-1">Cifrando sua chave com segurança</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="hover:bg-blue-50"
          >
            <Info className="w-4 h-4 mr-2" />
            {showDetails ? "Ocultar detalhes" : "Mais detalhes"}
          </Button>
        </div>
      </div>

      {/* Card principal com animação suave */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">Como funciona a proteção?</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Utilizamos criptografia assimétrica RSA para proteger sua chave AES.
                  A chave pública do destinatário é usada para cifrar, garantindo que
                  apenas ele possa descriptografar usando sua chave privada.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Área central com visualização do processo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Ícone da chave sem animação */}
          <div>
            <Key className={`w-16 h-16 ${isEncrypted ? 'text-green-500' : 'text-blue-500'}`} />
          </div>

          <Button
            size="lg"
            onClick={() => {
              handleEncryptKey();
              setShowInfo(true);
            }}
            disabled={isEncrypting || isEncrypted}
            className={`w-64 ${isEncrypted ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            {isEncrypting ? (
              <motion.div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Protegendo...
              </motion.div>
            ) : isEncrypted ? (
              <motion.div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Chave Protegida
              </motion.div>
            ) : (
              <motion.div className="flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Proteger Chave
              </motion.div>
            )}
          </Button>

          {/* Status e métricas */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
                {/* Card de status com passos da cifragem */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`rounded-full p-2 ${
                      isEncrypted ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {isEncrypted ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <RefreshCw className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {isEncrypting
                          ? "Cifrando chave simétrica..."
                          : isEncrypted
                          ? "Processo concluído!"
                          : "Pronto para iniciar"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Destinatário: {recipientName}
                      </p>
                    </div>
                  </div>

                  {/* Passos da cifragem */}
                  {(isEncrypting || isEncrypted) && (
                    <div className="space-y-2 mt-4 border-t pt-4">
                      {encryptionSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{step}</span>
                        </motion.div>
                      ))}
                      {isEncrypting && currentStep < 7 && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-2"
                        >
                          <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                          <span className="text-sm text-blue-600">Processando...</span>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* Comparação visual */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tamanho Original</span>
                    <span className="font-medium">{originalKeySize} bytes</span>
                  </div>
                  <motion.div
                    className="h-2 bg-blue-200 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  >
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(originalKeySize/256)*100}%` }}
                    />
                  </motion.div>

                  {isEncrypted && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tamanho Cifrado</span>
                        <span className="font-medium">{encryptedKeySize} bytes</span>
                      </div>
                      <motion.div
                        className="h-2 bg-green-200 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                      >
                        <motion.div
                          className="h-full bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                        />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Botão de navegação centralizado */}
      {isEncrypted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <Button
            variant="outline"
            onClick={handleReset}
            className="hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Repetir
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Lock, CheckCircle, RefreshCw, Key } from "lucide-react";
import forge from 'node-forge';
import { useStepStore } from '@/store/stepStates';

export function ProtectStep({ stepState, setStepState, setIsStepComplete }) {
  const {
    isEncrypting,
    isEncrypted,
    showInfo,
    encryptedKeySize,
    showDetails,
    encryptionSteps,
    currentStep,
    recipientName = "Professor Willian",
    originalKeySize = 32, // Tamanho da chave AES (256 bits = 32 bytes)
  } = stepState;

  const { aesKey, ReceiverPublicKey, setEncriptedKey } = useStepStore();

  const receiverPublicKey = stepState.ReceiverPublicKey;

  const handleEncryptKey = async () => {
    setStepState({
      isEncrypting: true,
      encryptionSteps: [],
      currentStep: 0,
    });

    const steps = [
      "Gerando padding PKCS#1 v1.5 para a chave AES...",
      "Convertendo chave AES para formato binário...",
      "Aplicando função de hash SHA-256 para verificação...",
      "Obtendo chave pública RSA do destinatário...",
      "Realizando cifragem RSA-2048...",
      "Codificando resultado em Base64...",
      "Verificando integridade da chave cifrada...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setStepState((prev) => ({
            ...prev,
            encryptionSteps: [...prev.encryptionSteps, steps[i]],
            currentStep: i + 1,
          }));
          resolve(null);
        }, 100);
      });
    }

    const publicKey = forge.pki.publicKeyFromPem(ReceiverPublicKey);
    const encryptedKey = publicKey.encrypt(aesKey, 'RSA-OAEP');

    setTimeout(() => {
      console.log("Cifragem concluída.");
      setStepState({
        encryptedKeySize: 256,
        isEncrypting: false,
        isEncrypted: true,
        encryptedKey: forge.util.encode64(encryptedKey),
      });
      setEncriptedKey(encryptedKey)
    }, 500);
  };

  const handleReset = () => {
    setStepState({
      isEncrypting: false,
      isEncrypted: false,
      showInfo: false,
      encryptedKeySize: null,
      encryptionSteps: [],
      currentStep: 0,
    });
  };

  const toggleDetails = () => {
    setStepState({ showDetails: !showDetails });
  };

  useEffect(() => {
    setIsStepComplete(isEncrypted);
  }, [isEncrypted, setIsStepComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6 p-6"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Proteção da Chave Simétrica</h2>
            <p className="text-gray-500 mt-1">Cifrando sua chave com segurança</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDetails}
            className="hover:bg-blue-50"
          >
            <Info className="w-4 h-4 mr-2" />
            {showDetails ? "Ocultar detalhes" : "Mais detalhes"}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            key="details"
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center space-y-8">
          <div>
            <Key className={`w-16 h-16 ${isEncrypted ? 'text-green-500' : 'text-blue-500'}`} />
          </div>

          <Button
            size="lg"
            onClick={() => {
              handleEncryptKey();
              setStepState({ showInfo: true });
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

          <AnimatePresence>
            {showInfo && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
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
                  <div className="space-y-2 mt-4 border-t pt-4">
                    {encryptionSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

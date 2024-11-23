import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ProtectStep() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [originalKeySize] = useState(32); // Tamanho da chave AES (256 bits = 32 bytes)
  const [encryptedKeySize, setEncryptedKeySize] = useState<number | null>(null);

  const handleEncryptKey = () => {
    setIsEncrypting(true);

    // Simula o processo de cifragem da chave simétrica
    setTimeout(() => {
      setEncryptedKeySize(256); // Simulando o tamanho de uma chave cifrada RSA (em bytes)
      setIsEncrypting(false);
      setIsEncrypted(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Proteção da Chave Simétrica</h2>

      {/* Explicação */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-700 mb-2">Por que este passo é necessário?</h3>
        <p className="text-sm text-blue-600">
          A proteção da chave simétrica é essencial para garantir que apenas o destinatário 
          possa acessar o conteúdo cifrado. Neste passo, usamos a chave pública do destinatário 
          para cifrar a chave simétrica, garantindo segurança adicional no transporte da chave.
        </p>
      </div>

      {/* Botão para iniciar o processo */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            handleEncryptKey();
            setShowInfo(true);
          }}
          disabled={isEncrypting || isEncrypted}
        >
          {isEncrypted ? "Chave Protegida com Sucesso" : "Proteger Chave Simétrica"}
        </Button>
      </div>

      {/* Feedback visual do processo */}
      {showInfo && (
        <div className="space-y-6">
          {/* Estado do processo */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Status do Processo</h3>
            <p className="text-sm text-gray-700">
              {isEncrypting
                ? "Cifrando a chave simétrica usando a chave pública do destinatário..."
                : isEncrypted
                ? "Chave simétrica protegida com sucesso!"
                : "Pronto para proteger a chave simétrica."}
            </p>
          </div>

          {/* Comparação visual do tamanho da chave */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-md flex justify-between items-center">
              <span className="text-gray-600 font-medium">Tamanho Original:</span>
              <span className="text-gray-800 font-semibold">{originalKeySize} bytes</span>
            </div>
            <motion.div
              className="bg-blue-500 h-6 rounded"
              style={{ width: `${originalKeySize}px` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />

            {isEncrypted && (
              <>
                <div className="w-full max-w-md flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Tamanho Após Cifragem:</span>
                  <span className="text-gray-800 font-semibold">{encryptedKeySize} bytes</span>
                </div>
                <motion.div
                  className="bg-green-500 h-6 rounded"
                  style={{ width: `${encryptedKeySize || 0}px` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { FaKey } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { KeyGenerationLoading } from "@/components/KeyGenerationLoading";
import { KeyDisplay } from "@/components/KeyDisplay";
import { RefreshCw } from "lucide-react";

export function ConfigStep({ setIsStepComplete }: { setIsStepComplete: (isComplete: boolean) => void }) {
  const [showRSALoading, setShowRSALoading] = useState(false);
  const [showAESLoading, setShowAESLoading] = useState(false);
  const [rsaGenerated, setRsaGenerated] = useState(false);
  const [aesGenerated, setAesGenerated] = useState(false);
  const [showRSAKeys, setShowRSAKeys] = useState(false);
  const [showAESKey, setShowAESKey] = useState(false);

  const handleGenerateRSA = () => {
    setShowRSALoading(true);
    setTimeout(() => {
      setRsaGenerated(true);
    }, 2000);
  };

  const handleGenerateAES = () => {
    setShowAESLoading(true);
    setTimeout(() => {
      setAesGenerated(true);
    }, 2000);
  };

  const handleReset = () => {
    setShowRSALoading(false);
    setShowAESLoading(false);
    setRsaGenerated(false);
    setAesGenerated(false);
    setShowRSAKeys(false);
    setShowAESKey(false);
  };

  useEffect(() => {
    // Atualiza o estado de conclusão quando ambas as chaves forem geradas
    setIsStepComplete(rsaGenerated && aesGenerated);
  }, [rsaGenerated, aesGenerated, setIsStepComplete]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <h2 className="text-xl font-bold">Configuração Inicial</h2>

      <div className="flex flex-col gap-4 h-full">
        {/* Container para os botões e reset */}
        <div className="flex justify-between items-start">
          {/* Container para os botões de gerar chaves */}
          <div className="flex flex-col gap-4">
            {/* Botão RSA */}
            <Button
              onClick={handleGenerateRSA}
              className={`gap-6 max-w-[280px] ${
                rsaGenerated ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
              size="lg"
              disabled={rsaGenerated}
            >
              <FaKey className="text-2xl" />
              <span>{rsaGenerated ? "Chaves RSA Geradas" : "Gerar Par de Chaves RSA"}</span>
            </Button>

            {/* Botão AES */}
            <Button
              onClick={handleGenerateAES}
              className={`gap-6 max-w-[280px] ${
                aesGenerated ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              }`}
              size="lg"
              disabled={aesGenerated}
            >
              <MdSecurity className="text-2xl" />
              <span>{aesGenerated ? "Chave AES Gerada" : "Gerar Chave AES"}</span>
            </Button>
          </div>

          {/* Botão de Reset */}
          {(rsaGenerated && aesGenerated) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
        </div>

        {/* Loading RSA */}
        {showRSALoading && (
          <KeyGenerationLoading
            type="RSA"
            onComplete={() => {
              setShowRSALoading(false);
              setShowRSAKeys(true);
            }}
          />
        )}

        {/* Loading AES */}
        {showAESLoading && (
          <KeyGenerationLoading
            type="AES"
            onComplete={() => {
              setShowAESLoading(false);
              setShowAESKey(true);
            }}
          />
        )}

        {/* Exibição das chaves RSA e AES */}
        <div className="flex flex-wrap gap-8 mt-2 justify-center">
          {showRSAKeys && (
            <>
              <KeyDisplay
                title="Chave Pública RSA"
                content={`-----BEGIN PUBLIC KEY-----\nMIIEowIBAAKCAQEABQEFz5A89cK3ow\nE9TVON1X4Rt1wihx9DzQ9/HmjAQSu\nsLJqGhFdleR75mv1o4cnfOfR7dUwU\nCdk8dGd2WEdheM5Kth3gVLVNbHg8\nTlFy3DkNLOfkP1K38zjFL2nJhgvQi\n2vGOhS6X8dbsq2zjS3MK+q1xL03ax\nGyZSOEVTuLpTfPXtbfZtiHEwewH/J\nGZSAHiSglHZvGSnsZmWePAFzTh7Gw\n1KSF4TS3D6DqQlY6RHqW5Tu8pK2uG\n5Kct5ihxtE7fZ8nWGu8w4tbHsQlYh\n-----END PUBLIC KEY-----`}
                bgColor="#e0f7fa"
                textColor="#00796b"
              />
              <KeyDisplay
                title="Chave Privada RSA"
                content={`-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA5G8R7TICeY5wO\n1VG7N5R3GV2t1nMepB2xZzZ7vjPje\ncI2G9hLq1IjEGJsET+//sE6km/sz9\n8FbHUb5P5CjOc3Boq7O0X2yE6WiEH\n5Kct5ihxtE7fZ8nWGu8w4tbHsQlYh\nWqSHfyQOQlYzm7xApk3mn1HLqO4Ox\nLE0TxjsiDL11ScBppUhOwhbx4VRFI\n0jZFk5C2MwwsPZmftFJROEqgLxy5O\npt+xlwiJFRmlJwACt6lBGoDZT2tiD\n-----END RSA PRIVATE KEY-----`}
                bgColor="#e0f7fa"
                textColor="#00796b"
              />
            </>
          )}

          {showAESKey && (
            <KeyDisplay
              title="Chave AES"
              content={`WXd9Hndks72MdP93Lw5T7nYFiJ9kIwe3Dn2DJkd8PlW35XKd74hdlwKJ4MnT8Ld9We9TiJ3Mxkf83lDkwiJW9mfDk3kdmD9tF5MlxkWn3dLJtI9wK7fh8HdJwlKfn3jL7fK3j9kDl29tLmfJn3DkL3Mkf9wdL7n8TkKwnfj4LdF9tK8M4fKDmL37djKfKw8wDn6J4HdL9wJfn8d3lkf2n3JdKw4Lfj6Mn4l9TfJn5dwLKwlxn3kT2D6djfkJ92lTwMn`}
              bgColor="#f3e5f5"
              textColor="#6a1b9a"
            />
          )}
        </div>
      </div>
    </div>
  );
}

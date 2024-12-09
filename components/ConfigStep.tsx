import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaKey } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { KeyGenerationLoading } from "@/components/KeyGenerationLoading";
import { KeyDisplay } from "@/components/KeyDisplay";
import { RefreshCw } from "lucide-react";
import forge from 'node-forge';
import crypto from 'crypto';
import { useStepStore } from '@/store/stepStates';

export function ConfigStep({ stepState, setStepState, setIsStepComplete }) {
  const { rsaGenerated, aesGenerated, showRSALoading, showAESLoading, showRSAKeys, showAESKey } = stepState;
  const { setRsaPrivateKey, setRsaPublicKey } = useStepStore();

  const handleGenerateRSA = () => {
    setStepState({ showRSALoading: true });
    
    setTimeout(() => {
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
      const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
      const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

      setRsaPrivateKey(privateKeyPem)
      setRsaPublicKey(publicKeyPem)

      setStepState({ 
        rsaGenerated: true, 
        showRSALoading: false, 
        showRSAKeys: true,
        rsaPrivateKey: privateKeyPem,
        rsaPublicKey: publicKeyPem
      });
    }, 2000);
  };

  const handleGenerateAES = () => {
    setStepState({ showAESLoading: true });
    
    setTimeout(() => {
      const key = crypto.randomBytes(32).toString('hex');
      setStepState({ 
        aesGenerated: true, 
        showAESLoading: false, 
        showAESKey: true,
        aesKey: key
      });
    }, 2000);
  };

  const handleReset = () => {
    setStepState({
      rsaGenerated: false,
      aesGenerated: false,
      showRSALoading: false,
      showAESLoading: false,
      showRSAKeys: false,
      showAESKey: false,
    });
  };

  useEffect(() => {
    setIsStepComplete(rsaGenerated && aesGenerated);
  }, [rsaGenerated, aesGenerated, setIsStepComplete]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <h2 className="text-xl font-bold">Configuração Inicial</h2>

      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4">
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

          {(rsaGenerated && aesGenerated) && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Button variant="outline" onClick={handleReset} className="hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Repetir
              </Button>
            </motion.div>
          )}
        </div>

        {showRSALoading && (
          <KeyGenerationLoading
            type="RSA"
            onComplete={() => {
              setStepState({ showRSALoading: false, showRSAKeys: true });
            }}
          />
        )}

        {showAESLoading && (
          <KeyGenerationLoading
            type="AES"
            onComplete={() => {
              setStepState({ showAESLoading: false, showAESKey: true });
            }}
          />
        )}

        <div className="flex flex-wrap gap-8 mt-2 justify-center">
          {showRSAKeys && (
            <>
              <KeyDisplay
                title="Chave Pública RSA"
                content={stepState.rsaPublicKey}
                bgColor="#e0f7fa"
                textColor="#00796b"
              />
              <KeyDisplay
                title="Chave Privada RSA"
                content={stepState.rsaPrivateKey}
                bgColor="#e0f7fa"
                textColor="#00796b"
              />
            </>
          )}

          {showAESKey && (
            <KeyDisplay
              title="Chave AES"
              content={stepState.aesKey}
              bgColor="#f3e5f5"
              textColor="#6a1b9a"
            />
          )}
        </div>
      </div>
    </div>
  );
}

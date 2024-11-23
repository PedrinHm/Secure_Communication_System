import { useState } from "react";
import { FaKey } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { KeyGenerationLoading } from "@/components/KeyGenerationLoading";
import { KeyDisplay } from "@/components/KeyDisplay";

export function ConfigStep() {
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

  return (
    <div className="space-y-8 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Configuração Inicial</h2>

      <div className="flex flex-col gap-4 h-full">
        {/* Botão RSA */}
        <Button
          onClick={handleGenerateRSA}
          className={`gap-6 max-w-[280px] mb-4 ${
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
          className={`gap-6 max-w-[280px] mb-4 ${
            aesGenerated ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
          size="lg"
          disabled={aesGenerated}
        >
          <MdSecurity className="text-2xl" />
          <span>{aesGenerated ? "Chave AES Gerada" : "Gerar Chave AES"}</span>
        </Button>

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
        <div className="flex flex-wrap gap-8 mt-8 justify-center">
          {showRSAKeys && (
            <>
              <KeyDisplay
                title="Chave Pública RSA"
                content={`-----BEGIN PUBLIC KEY-----\nMIIEowIBAAKCAQEABQEFz5A89cK3ow\nE9TVON1X4Rt1wihx9DzQ9/HmjAQSu\nsLJqGhFdleR75mv1o4cnfOfR7dUwU\nnCdk8dGd2WEdheM5Kth3gVLVNbHg8\nTlFy3DkNLOfkP1K38zjFL2nJhgvQi\n2vGOhS6X8dbsq2zjS3MK+q1xL03ax\nGyZSOEVTuLpTfPXtbfZtiHEwewH/J\nGZSAHiSglHZvGSnsZmWePAFzTh7Gw\n1KSF4TS3D6DqQlY6RHqW5Tu8pK2uG\n5Kct5ihxtE7fZ8nWGu8w4tbHsQlYh-----END PUBLIC KEY-----`}
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

import { useState } from 'react';
import { Step } from "@/types/steps";
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { Button } from "@/components/ui/button";
import { KeyGenerationLoading } from "@/components/KeyGenerationLoading";

function KeyDisplay({ title, content, bgColor, textColor }: { title: string; content: string; bgColor: string; textColor: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const getExplanation = (title: string) => {
    switch (title) {
      case "Chave Pública RSA":
        return "Chave pública RSA é usada para criptografar dados e verificar assinaturas digitais. Pode ser compartilhada livremente.";
      case "Chave Privada RSA":
        return "Chave privada RSA é usada para descriptografar dados e criar assinaturas digitais. Deve ser mantida em segredo.";
      case "Chave AES":
        return "Chave simétrica AES é usada tanto para criptografar quanto descriptografar dados. É mais rápida que RSA, mas deve ser compartilhada de forma segura.";
      default:
        return content;
    }
  };

  return (
    <div 
      style={{ 
        backgroundColor: bgColor, 
        borderColor: textColor,
        width: '350px',
        height: '400px',
        margin: '0 16px 16px 16px'
      }} 
      className="p-8 rounded-lg border flex flex-col items-center justify-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: textColor }}>{title}</h3>
      <pre 
        className="font-mono text-sm text-center overflow-auto"
        style={{ 
          color: textColor,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          width: '100%',
          flex: 1
        }}>
        {isHovered ? getExplanation(title) : content}
      </pre>
    </div>
  );
}


export const steps: Step[] = [
  {
    id: 'config',
    title: 'Configuração Inicial',
    content: function ConfigStep() {
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
                rsaGenerated ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              size="lg"
              disabled={rsaGenerated}
            >
              <FaKey className="text-2xl" />
              <span>{rsaGenerated ? 'Chaves RSA Geradas' : 'Gerar Par de Chaves RSA'}</span>
            </Button>

            {/* Botão AES */}
            <Button 
              onClick={handleGenerateAES}
              className={`gap-6 max-w-[280px] mb-4 ${
                aesGenerated ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              size="lg"
              disabled={aesGenerated}
            >
              <MdSecurity className="text-2xl" />
              <span>{aesGenerated ? 'Chave AES Gerada' : 'Gerar Chave AES'}</span>
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
                    content={"-----BEGIN PUBLIC KEY-----\nMIIEowIBAAKCAQEABQEFz5A89cK3ow\nE9TVON1X4Rt1wihx9DzQ9/HmjAQSu\nsLJqGhFdleR75mv1o4cnfOfR7dUwU\nnCdk8dGd2WEdheM5Kth3gVLVNbHg8\nTlFy3DkNLOfkP1K38zjFL2nJhgvQi\n2vGOhS6X8dbsq2zjS3MK+q1xL03ax\nGyZSOEVTuLpTfPXtbfZtiHEwewH/J\nGZSAHiSglHZvGSnsZmWePAFzTh7Gw\n1KSF4TS3D6DqQlY6RHqW5Tu8pK2uG\n5Kct5ihxtE7fZ8nWGu8w4tbHsQlYh-----END PUBLIC KEY-----"}
                    bgColor="#e0f7fa" 
                    textColor="#00796b"
                  />
                  <KeyDisplay 
                    title="Chave Privada RSA"
                    content={"-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA5G8R7TICeY5wO\n1VG7N5R3GV2t1nMepB2xZzZ7vjPje\ncI2G9hLq1IjEGJsET+//sE6km/sz9\n8FbHUb5P5CjOc3Boq7O0X2yE6WiEH\n5Kct5ihxtE7fZ8nWGu8w4tbHsQlYh\nWqSHfyQOQlYzm7xApk3mn1HLqO4Ox\nLE0TxjsiDL11ScBppUhOwhbx4VRFI\n0jZFk5C2MwwsPZmftFJROEqgLxy5O\npt+xlwiJFRmlJwACt6lBGoDZT2tiD\n-----END RSA PRIVATE KEY-----"}
                    bgColor="#e0f7fa" 
                    textColor="#00796b"
                  />
                </>
              )}

              {showAESKey && (
                <KeyDisplay 
                  title="Chave AES"
                  content={"WXd9Hndks72MdP93Lw5T7nYFiJ9kIwe3Dn2DJkd8PlW35XKd74hdlwKJ4MnT8Ld9We9TiJ3Mxkf83lDkwiJW9mfDk3kdmD9tF5MlxkWn3dLJtI9wK7fh8HdJwlKfn3jL7fK3j9kDl29tLmfJn3DkL3Mkf9wdL7n8TkKwnfj4LdF9tK8M4fKDmL37djKfKw8wDn6J4HdL9wJfn8d3lkf2n3JdKw4Lfj6Mn4l9TfJn5dwLKwlxn3kT2D6djfkJ92lTwMn"}
                  bgColor="#f3e5f5" 
                  textColor="#6a1b9a"
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  },
 {
    id: 'prep',
    title: 'Preparação do Ambiente',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Preparação do Ambiente</h2>
        <p>Conteúdo sobre a preparação do ambiente...</p>
      </div>
    )
  },
  {
    id: 'sign',
    title: 'Processo de Assinatura e Cifragem',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Processo de Assinatura e Cifragem</h2>
        <p>Conteúdo sobre o processo de assinatura e cifragem...</p>
      </div>
    )
  },
  {
    id: 'protect',
    title: 'Proteção da Chave Simétrica',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Proteção da Chave Simétrica</h2>
        <p>Conteúdo sobre a proteção da chave simétrica...</p>
      </div>
    )
  },
  {
    id: 'pack',
    title: 'Empacotamento e Simulação',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Empacotamento e Simulação</h2>
        <p>Conteúdo sobre empacotamento e simulação...</p>
      </div>
    )
  },
  {
    id: 'verify',
    title: 'Verificação e Descriptografia',
    content: (
      <div>
        <h2 className="text-xl font-bold mb-4">Verificação e Descriptografia</h2>
        <p>Conteúdo sobre verificação e descriptografia...</p>
      </div>
    )
  }
]; 
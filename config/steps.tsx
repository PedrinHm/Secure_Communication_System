import { useState } from 'react';
import { Step } from "@/types/steps";
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { Button } from "@/components/ui/button";
import { KeyGenerationLoading } from "@/components/KeyGenerationLoading";

export const steps: Step[] = [
  {
    id: 'config',
    title: 'Configuração Inicial',
    content: function ConfigStep() {
      const [showRSALoading, setShowRSALoading] = useState(false);
      const [showAESLoading, setShowAESLoading] = useState(false);
      const [rsaGenerated, setRsaGenerated] = useState(false);
      const [aesGenerated, setAesGenerated] = useState(false);
      const [showRSAPublicDescription, setShowRSAPublicDescription] = useState(false);
      const [showRSAPrivateDescription, setShowRSAPrivateDescription] = useState(false);
      const [showAESDescription, setShowAESDescription] = useState(false);
      
      const handleGenerateRSA = () => {
        setShowRSALoading(true);
        setTimeout(() => setRsaGenerated(true), 2000);
      };

      const handleGenerateAES = () => {
        setShowAESLoading(true);
        setTimeout(() => setAesGenerated(true), 2000);
      };

      // Adicione uma classe CSS comum para os contêineres de chave com tamanho fixo
      const keyContainerStyle = "bg-blue-100 p-4 rounded-lg shadow-md border-2 border-blue-300 flex flex-col w-[300px] h-[200px]";

      return (
        <div className="space-y-8 h-full flex flex-col">
          <h2 className="text-xl font-bold mb-4">Configuração Inicial</h2>
          
          <div className="flex flex-col gap-4 h-full">
            {/* Botão RSA */}
            <Button 
              onClick={handleGenerateRSA}
              className={`gap-6 max-w-[280px] ${
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
              className={`gap-6 max-w-[280px] ${
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
                onComplete={() => setShowRSALoading(false)} 
              />
            )}

            {/* Loading AES */}
            {showAESLoading && (
              <KeyGenerationLoading 
                type="AES" 
                onComplete={() => setShowAESLoading(false)} 
              />
            )}

            {/* Exibição das chaves */}
            <div className="flex gap-4 h-full">
              {/* Container das chaves RSA */}
              {rsaGenerated && (
                <>
                  <div className={keyContainerStyle}>
                    <h3 className="text-lg font-semibold mb-3 text-blue-800 text-center">
                      Chave Pública RSA
                    </h3>
                    <div 
                      style={{backgroundColor: '#2563eb'}}
                      className="p-3 rounded font-mono text-base border border-blue-200 text-white flex-1 overflow-hidden text-ellipsis"
                      onMouseEnter={() => setShowRSAPublicDescription(true)}
                      onMouseLeave={() => setShowRSAPublicDescription(false)}
                    >
                      <div className="text-center pt-4 px-4">
                        {showRSAPublicDescription ? (
                          <span>Esta é a chave pública RSA usada para criptografar dados.</span>
                        ) : (
                          <>
                            -----BEGIN PUBLIC KEY-----<br />
                            <span className="my-1 inline-block">MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA</span><br />
                            <span className="my-1 inline-block">9j3KDqZPUxnhqZfc8QNn4kW1y0zFhQEXZ9Rqz/dVuPND</span><br />
                            <span className="my-1 inline-block">mX3IwZQQUB9cZ+XkqNX5mMULw5xNVHjPYeIHAkBABD7U</span><br />
                            <span className="my-1 inline-block">8VYR3XfGD9N1Xt8K3DcuDmKz9hN5vY2WqR4PJH6zv8k9</span><br />
                            <span className="my-1 inline-block">mX3IwZQQUB9cZ+XkqNX5mMULw5xNVHjPYeIHAkBABD7U</span><br />
                            -----END PUBLIC KEY-----
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={keyContainerStyle}>
                    <h3 className="text-lg font-semibold mb-3 text-blue-800 text-center">
                      Chave Privada RSA
                    </h3>
                    <div 
                      style={{backgroundColor: '#2563eb'}}
                      className="p-3 rounded font-mono text-base border border-blue-200 text-white flex-1 overflow-hidden text-ellipsis"
                      onMouseEnter={() => setShowRSAPrivateDescription(true)}
                      onMouseLeave={() => setShowRSAPrivateDescription(false)}
                    >
                      <div className="text-center pt-4 px-4">
                        {showRSAPrivateDescription ? (
                          <span>Esta é a chave privada RSA usada para descriptografar dados.</span>
                        ) : (
                          <>
                            -----BEGIN PRIVATE KEY-----<br />
                            <span className="my-1 inline-block">MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEA</span><br />
                            <span className="my-1 inline-block">AMIIBCgKCAQEA9j3KDqZPUxnhqZfc8QNn4kW1y0zFhQE</span><br />
                            <span className="my-1 inline-block">XZ9Rqz/dVuPNDmX3IwZQQUB9cZ+XkqNX5mMULw5xNVHj</span><br />
                            <span className="my-1 inline-block">PYeIHAkBABD7U8VYR3XfGD9N1Xt8K3DcuDmKz9hN5vY2</span><br />
                            <span className="my-1 inline-block">WqR4PJH6zv8k9mX3IwZQQUB9cZ+XkqNX5mMULw5xNVHj</span><br />
                            -----END PRIVATE KEY-----
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Container da chave AES */}
              {aesGenerated && (
                <div className={keyContainerStyle}>
                  <h3 className="text-lg font-semibold mb-3 text-blue-800 text-center">
                    Chave AES
                  </h3>
                  <div 
                    style={{backgroundColor: '#2563eb'}}
                    className="p-3 rounded font-mono text-base border border-blue-200 text-white flex-1 overflow-hidden text-ellipsis"
                    onMouseEnter={() => setShowAESDescription(true)}
                    onMouseLeave={() => setShowAESDescription(false)}
                  >
                    <div className="text-center pt-4 px-4">
                      {showAESDescription ? (
                        <span>Esta é a chave AES usada para criptografia simétrica.</span>
                      ) : (
                        <>
                          -----BEGIN AES KEY-----<br />
                          <span className="my-1 inline-block">Xt8K3DcuDmKz9hN5vY2WqR4PJH6zv8k9</span><br />
                          <span className="my-1 inline-block">mX3IwZQQUB9cZ+XkqNX5mMULw5xNVHjP</span><br />
                          <span className="my-1 inline-block">YeIHAkBABD7U8VYR3XfGD9N1Xt8K3Dcu</span><br />
                          <span className="my-1 inline-block">DmKz9hN5vY2WqR4PJH6zv8k9mX3IwZQQ</span><br />
                          -----END AES KEY-----
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LockClosedIcon as LockIcon,
  KeyIcon,
  UserIcon as StudentIcon,
  UserGroupIcon as TeacherIcon,
  ArchiveBoxIcon as PackageIcon 
} from '@heroicons/react/24/solid';
import { PencilSquareIcon as SignatureIcon } from '@heroicons/react/24/solid';

export function SendStep({ setIsStepComplete }: { setIsStepComplete: (isComplete: boolean) => void }) {
  const [enviado, setEnviado] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [iniciarMovimento, setIniciarMovimento] = useState(false);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  
  const garantias = [
    {
      icon: LockIcon,
      texto: "Confidencialidade através da cifragem",
      delay: 0.8
    },
    {
      icon: SignatureIcon,
      texto: "Autenticidade através da assinatura digital",
      delay: 1.6
    },
    {
      icon: KeyIcon,
      texto: "Integridade através do hash",
      delay: 2.4
    }
  ];

  const handleEnvio = () => {
    setEnviado(true);
    
    // Animar as garantias sequencialmente
    garantias.forEach((_, index) => {
      setTimeout(() => {
        setEtapaAtual(index + 1);
      }, index * 800);
    });
    
    // Iniciar movimento apenas após a última garantia ser adicionada
    setTimeout(() => {
      setIniciarMovimento(true);
    }, 4000);

    // Exibir mensagem e resumo apenas após o pacote chegar
    setTimeout(() => {
      setMensagemSucesso('Pacote enviado com sucesso (e segurança) para o Professor João!');
      setMostrarResumo(true);
    }, 7500);
  };

  useEffect(() => {
    // Atualiza o estado de conclusão quando o pacote for enviado
    setIsStepComplete(enviado && mostrarResumo);
  }, [enviado, mostrarResumo, setIsStepComplete]);

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Empacotamento e Envio</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full mb-8">
        <h3 className="font-semibold mb-4">Componentes do Pacote</h3>
        
        <div className="flex flex-col">
          <div className="flex gap-12 mb-6">
            <ul className="space-y-3 flex-1">
              <li className="flex items-center">
                <LockIcon className="w-5 h-5 mr-3 text-blue-500" />
                <span>Arquivo cifrado com chave simétrica</span>
              </li>
              <li className="flex items-center">
                <SignatureIcon className="w-5 h-5 mr-3 text-blue-500" />
                <span>Assinatura digital do arquivo original</span>
              </li>
              <li className="flex items-center">
                <KeyIcon className="w-5 h-5 mr-3 text-blue-500" />
                <span>Chave simétrica cifrada com RSA</span>
              </li>
            </ul>

            <div className="space-y-3 flex-1">
              {garantias.map((garantia, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={etapaAtual > index ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: garantia.delay - 0.3 }}
                  className="flex items-center text-gray-600"
                >
                  <garantia.icon className="w-5 h-5 mr-3 text-green-500" />
                  <span>{garantia.texto}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleEnvio}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors z-10"
              disabled={enviado}
            >
              Enviar Pacote
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex flex-col items-center">
          <StudentIcon className="w-12 h-12" />
          <span className="text-sm text-gray-600 mt-1">Aluno</span>
        </div>
        
        <div className="flex-1 mx-4 relative">
          {/* Linha pontilhada */}
          <svg
            className="w-full absolute top-1/2 -translate-y-1/2"
            height="20"
            strokeDasharray="5,5"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
              </marker>
            </defs>
            <line
              x1="0"
              y1="10"
              x2="100%"
              y2="10"
              stroke="#9CA3AF"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          </svg>
          
          {enviado && (
            <motion.div
              initial={{ left: 0 }}
              animate={{ left: iniciarMovimento ? 'calc(100% - 16px)' : 0 }}
              transition={{ 
                duration: 3,
                ease: "linear",
              }}
              className="absolute top-0 -translate-y-full -mt-2"
              style={{ position: 'absolute' }}
            >
              <div className="relative">
                <PackageIcon className="w-8 h-8 text-blue-500" />
                
                {garantias.map((garantia, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 0 }}
                    animate={etapaAtual > index ? { 
                      opacity: 1, 
                      x: -20 + (index * 20 - ((garantias.length - 1) * 10))
                    } : {}}
                    transition={{ duration: 0.3, delay: garantia.delay - 0.3 }}
                    className="absolute top-0 left-1/2 -translate-y-full -mt-1 w-4 h-4"
                    style={{ zIndex: index + 1 }}
                  >
                    <garantia.icon className="w-4 h-4 text-green-500" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <TeacherIcon className="w-12 h-12" />
          <span className="text-sm text-gray-600 mt-1">Professor</span>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="text-green-600 font-medium mb-4">
          {mensagemSucesso}
        </div>
      )}

      {mostrarResumo && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg w-full">
          <h4 className="font-semibold mb-2">Resumo do Envio:</h4>
          <ul className="text-sm text-gray-600">
            <li>Arquivo cifrado: meu_arquivo.txt</li>
            <li>Assinatura digital: Base64 (trecho)</li>
            <li>Chave simétrica cifrada: RSA (trecho)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
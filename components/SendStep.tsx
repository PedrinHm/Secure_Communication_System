import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LockClosedIcon as LockIcon,
  KeyIcon,
  UserIcon as StudentIcon,
  UserGroupIcon as TeacherIcon,
  ArchiveBoxIcon as PackageIcon 
} from '@heroicons/react/24/solid';
import { PencilSquareIcon as SignatureIcon } from '@heroicons/react/24/solid';

export function SendStep({ stepState, setStepState, setIsStepComplete }) {
  const {
    enviado,
    etapaAtual,
    mensagemSucesso,
    iniciarMovimento,
    mostrarResumo,
    garantias = [
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
    ],
  } = stepState;

  const handleEnvio = () => {
    setStepState({ enviado: true, etapaAtual: 0 });

    // Animar as garantias sequencialmente
    garantias.forEach((_, index) => {
      setTimeout(() => {
        setStepState((prev) => ({
          ...prev,
          etapaAtual: index + 1,
        }));
      }, index * 800);
    });

    // Iniciar movimento apenas após a última garantia ser adicionada
    setTimeout(() => {
      setStepState({ iniciarMovimento: true });
    }, 4000);

    // Exibir mensagem e resumo após o pacote chegar
    setTimeout(() => {
      setStepState({
        mensagemSucesso: 'Pacote enviado com sucesso (e segurança) para o Professor João!',
        mostrarResumo: true,
      });
    }, 7500);
  };

  const handleReset = () => {
    setStepState({
      enviado: false,
      etapaAtual: 0,
      mensagemSucesso: '',
      iniciarMovimento: false,
      mostrarResumo: false,
    });
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
              <PackageIcon className="w-8 h-8 text-blue-500" />
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

      {mostrarResumo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Repetir
          </button>
        </motion.div>
      )}
    </div>
  );
}

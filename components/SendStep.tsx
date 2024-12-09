import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  LockClosedIcon as LockIcon,
  KeyIcon,
  UserIcon as StudentIcon,
  UserGroupIcon as TeacherIcon,
  ArchiveBoxIcon as PackageIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import { PencilSquareIcon as SignatureIcon } from '@heroicons/react/24/solid';

const ANIMATION_DELAY = 800;
const MOVEMENT_DELAY = 4000;
const SUCCESS_DELAY = 9000;

const PACKAGE_STEPS = [
  {
    icon: LockIcon,
    text: "Arquivo cifrado com chave simétrica",
    delay: 0.8
  },
  {
    icon: SignatureIcon,
    text: "Assinatura digital do arquivo original",
    delay: 1.6
  },
  {
    icon: KeyIcon,
    text: "Chave simétrica cifrada com RSA",
    delay: 2.4
  }
] as const;

const ANIMATION_VARIANTS = {
  packageMovement: {
    initial: { left: 0, y: -30 },
    animate: { 
      left: 'calc(100% - 16px)',
      y: [-30, -40, -30, -40, -30],
      rotate: [0, 3, 0, -3, 0],
      scale: [1, 1.05, 1, 1.05, 1]
    },
    transition: { 
      duration: 8,
      times: [0, 0.25, 0.5, 0.75, 1],
      ease: [0.4, 0.0, 0.2, 1], 
      repeat: 0,
      repeatDelay: 0
    }
  },
  checkmark: {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }
};

const PackageSteps = ({ completedSteps }) => (
  <ul className="space-y-3 flex-1">
    {PACKAGE_STEPS.map((step, index) => (
      <motion.li 
        key={index}
        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center">
          <step.icon className="w-5 h-5 mr-3 text-blue-500" />
          <span>{step.text}</span>
        </div>
        
        <motion.div
          variants={ANIMATION_VARIANTS.checkmark}
          initial="initial"
          animate={completedSteps > index ? "animate" : "initial"}
          className="ml-2"
        >
          <CheckCircleIcon className="w-6 h-6 text-green-500" />
        </motion.div>
      </motion.li>
    ))}
  </ul>
);

const SecurityGuarantees = ({ garantias, etapaAtual }) => (
  <div className="space-y-3 flex-1">
    {garantias.map((garantia, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={etapaAtual > index ? { 
          opacity: 1, 
          x: 0,
          transition: {
            delay: garantia.delay - 0.3,
            duration: 0.5
          }
        } : {}}
        className="flex items-center text-gray-600"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <garantia.icon className="w-5 h-5 mr-3 text-green-500" />
          <span>{garantia.texto}</span>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

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

  const [completedSteps, setCompletedSteps] = useState(0);

  const handleEnvio = useCallback(() => {
    setStepState({ enviado: true, etapaAtual: 0 });

    PACKAGE_STEPS.forEach((_, index) => {
      setTimeout(() => {
        setCompletedSteps(index + 1);
      }, index * ANIMATION_DELAY);
    });

    garantias.forEach((_, index) => {
      setTimeout(() => {
        setStepState((prev) => ({
          ...prev,
          etapaAtual: index + 1,
        }));
      }, (index + PACKAGE_STEPS.length) * ANIMATION_DELAY);
    });

    setTimeout(() => {
      setStepState({
        mensagemSucesso: 'Pacote enviado com sucesso (e segurança) para o Professor Willian!',
        mostrarResumo: true,
        iniciarMovimento: true
      });
    }, SUCCESS_DELAY);
  }, [setStepState, garantias]);


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
    setIsStepComplete(enviado && mostrarResumo);
  }, [enviado, mostrarResumo, setIsStepComplete]);

  const PackageWithGlow = () => (
    <motion.div
      variants={ANIMATION_VARIANTS.packageMovement}
      initial="initial"
      animate={iniciarMovimento ? "animate" : "initial"}
      className="absolute top-0 -mt-4"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="relative"
      >
        {/* Efeito de brilho */}
        <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-md opacity-50"></div>
        <PackageIcon className="w-8 h-8 text-blue-500 relative z-10" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-black/10 rounded-full blur-sm"></div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center p-4 max-w-4xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Empacotamento e Envio</h2>
      </div>

      {mensagemSucesso && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 font-medium text-lg text-center mb-4"
        >
          {mensagemSucesso}
        </motion.div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-md w-full mb-6">
        <h3 className="font-semibold mb-3">Componentes do Pacote</h3>
        <div className="flex gap-12 mb-4">
          <PackageSteps completedSteps={completedSteps} />
          <SecurityGuarantees garantias={garantias} etapaAtual={etapaAtual} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleEnvio}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors z-10"
            disabled={enviado}
          >
            Enviar Pacote
          </button>
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
            <PackageWithGlow />
          )}
        </div>

        <div className="flex flex-col items-center">
          <TeacherIcon className="w-12 h-12" />
          <span className="text-sm text-gray-600 mt-1">Professor</span>
        </div>
      </div>

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
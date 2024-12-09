import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaFileAlt, FaLock, FaSignature } from 'react-icons/fa';
import forge from 'node-forge';
import { useStepStore } from '@/store/stepStates';
import { signHash } from '../lib/utils';

export function SignStep({ stepState, setStepState, setIsStepComplete }) {
  const {
    isSigningAnimating,
    isEncryptingAnimating,
    isSigned,
    isEncrypted,
    showSignInfo,
    showEncryptInfo,
  } = stepState;

  const { rsaPrivateKey, fileHash, ReceiverPublicKey, setSignature } = useStepStore();

  const handleSignAndEncryptDocument = async () => {
    if (!fileHash || !rsaPrivateKey) {
      console.error("Hash do arquivo ou chave privada não estão disponíveis.");
      return;
    }

    const signature = signHash(fileHash, rsaPrivateKey);
    setSignature(signature)

    console.log("Assinatura gerada:", signature);   

    setStepState({ isSigningAnimating: false, isSigned: true });
  };

  // const createTarGz = async (files: Blob[], outputFileName: string) => {
  //   return new Promise((resolve, reject) => {
  //     const output = fs.createWriteStream(outputFileName);
  //     const archive = archiver('gz');

  //     output.on('close', () => {
  //       console.log(`Arquivo ${outputFileName} criado com sucesso.`);
  //       resolve(true);
  //     });

  //     archive.on('error', (err) => {
  //       reject(err);
  //     });

  //     archive.pipe(output);

  //     files.forEach((file) => {
  //       archive.append(file, { name: path.basename(file.name) });
  //     });

  //     archive.finalize();
  //   });
  // };

  // const splitFile = async (fileName: string, size: number) => {
  //   const fileBuffer = fs.readFileSync(fileName);
  //   const totalParts = Math.ceil(fileBuffer.length / size);

  //   for (let i = 0; i < totalParts; i++) {
  //     const partBuffer = fileBuffer.slice(i * size, (i + 1) * size);
  //     const partFileName = `${fileName}.part${i + 1}`;
  //     fs.writeFileSync(partFileName, partBuffer);
  //     console.log(`Parte ${partFileName} criada.`);
  //   }
  // };

  // const encryptParts = async (partPrefix: string) => {
  //   if (!ReceiverPublicKey) {
  //     console.error("Chave pública do destinatário não está disponível.");
  //     return;
  //   }

  //   const publicKey = forge.pki.publicKeyFromPem(ReceiverPublicKey);

  //   const files = fs.readdirSync('.').filter(file => file.startsWith(partPrefix));

  //   for (const file of files) {
  //     const fileBuffer = fs.readFileSync(file);
  //     const encrypted = publicKey.encrypt(fileBuffer);
  //     const encryptedFileName = `${file}.enc`;
  //     fs.writeFileSync(encryptedFileName, encrypted);
  //     console.log(`Arquivo cifrado: ${encryptedFileName}`);
  //   }
  // };

  const startEncryptingAnimation = () => {
    setStepState({ isEncryptingAnimating: true });

    // const tarFileName = 'document_e_assinatura.tar.gz';
    // await createTarGz([file, signatureBase64], tarFileName);

    // await splitFile(tarFileName, 200); 

    // await encryptParts('part_'); 
    setTimeout(() => {
      setStepState({ isEncryptingAnimating: false, isEncrypted: true });
    }, 2000);
  };

  const handleReset = () => {
    setStepState({
      isSigningAnimating: false,
      isEncryptingAnimating: false,
      isSigned: false,
      isEncrypted: false,
      showSignInfo: false,
      showEncryptInfo: false,
    });
  };

  const getStatusText = () => {
    if (!isSigned) return "Primeiro, assine digitalmente o arquivo.";
    if (isSigningAnimating) return "Assinando digitalmente o arquivo...";
    if (!isEncrypted && !isEncryptingAnimating) return "Agora, cifre o arquivo para protegê-lo.";
    if (isEncryptingAnimating) return "Cifrando o arquivo...";
    return "Arquivo assinado e cifrado com sucesso!";
  };

  useEffect(() => {
    setIsStepComplete(isSigned && isEncrypted);
  }, [isSigned, isEncrypted, setIsStepComplete]);

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4">
        {/* Coluna da esquerda - Assinatura */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              handleSignAndEncryptDocument();
              setStepState({ showSignInfo: true });
            }}
            className="w-48 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSigningAnimating || isEncryptingAnimating || isSigned}
          >
            Assinar Digitalmente
          </button>
          {showSignInfo && (
            <div className="mt-2 bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Assinatura Digital</h3>
              <p className="text-sm text-green-600">
                A assinatura digital garante a autenticidade do documento,
                confirmando que ele foi realmente criado por você e não foi
                alterado desde sua criação. Utiliza criptografia assimétrica
                com sua chave privada.
              </p>
            </div>
          )}
        </div>

        {/* Coluna central - Arquivo */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <motion.div className="text-6xl text-blue-600">
              <FaFileAlt />
            </motion.div>

            <motion.div
              className="absolute text-green-600 text-4xl"
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={isSigningAnimating
                ? { x: 0, y: 0, opacity: 1 }
                : isSigned
                ? { x: -30, y: -30, opacity: 1 }
                : { x: -100, y: -100, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <FaSignature />
            </motion.div>

            <motion.div
              className="absolute text-yellow-600 text-4xl"
              initial={{ x: 100, y: -100, opacity: 0 }}
              animate={isEncryptingAnimating
                ? { x: 0, y: 0, opacity: 1 }
                : isEncrypted
                ? { x: 30, y: -30, opacity: 1 }
                : { x: 100, y: -100, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <FaLock />
            </motion.div>
          </div>
        </div>

        {/* Coluna da direita - Cifragem */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => {
              startEncryptingAnimation();
              setStepState({ showEncryptInfo: true });
            }}
            className="w-48 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isEncryptingAnimating || isEncrypted || !isSigned}
          >
            Cifrar Documento
          </button>
          {showEncryptInfo && (
            <div className="mt-2 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Cifra de Documento</h3>
              <p className="text-sm text-blue-600">
                A cifra protege o documento, garantindo que apenas o destinatário
                autorizado, com a chave privada correspondente, possa acessá-lo.
                Utiliza criptografia assimétrica.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">{getStatusText()}</h2>
      </div>
    </div>
  );
}

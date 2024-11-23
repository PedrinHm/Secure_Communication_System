import { useRef, useEffect } from "react";
import { calculateHash } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export function PrepStep({ stepState, setStepState, setIsStepComplete }) {
  const { publicKey, file, fileContent, fileHash } = stepState; // Extrai o estado da etapa
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isPublicKeyValid = publicKey?.trim().length > 0;
    const isFileValid = !!file;

    // Atualiza o estado de conclusão
    setIsStepComplete(isPublicKeyValid && isFileValid);

    // Feedback visual opcional para o usuário
    if (isPublicKeyValid && !isFileValid) {
      toast({
        title: "Quase lá!",
        description: "Agora selecione um arquivo para continuar.",
        variant: "info",
      });
    } else if (!isPublicKeyValid && isFileValid) {
      toast({
        title: "Quase lá!",
        description: "Agora insira a chave pública para continuar.",
        variant: "info",
      });
    }
  }, [file, publicKey, setIsStepComplete]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setStepState({ file: selectedFile, fileContent: null });

    const isViewableFile = /\.(txt|json|md|csv|log|xml|yaml|yml|html|css|js|ts|jsx|tsx)$/i.test(selectedFile.name);

    if (isViewableFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setStepState({ fileContent: content });
        calculateHash(content).then((hash) => setStepState({ fileHash: hash }));
      };
      reader.readAsText(selectedFile);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as ArrayBuffer;
        calculateHash(content).then((hash) => setStepState({ fileHash: hash }));
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePublicKeyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setStepState({ publicKey: value });

    if (value.trim().length > 0) {
      toast({
        title: "Sucesso!",
        description: "Chave pública inserida.",
        variant: "success",
      });
    }
  };

  const handleReset = () => {
    setStepState({
      publicKey: '',
      file: null,
      fileContent: null,
      fileHash: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-2xl mx-auto p-6">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Preparação do Ambiente</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="mb-4">
              <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                Chave Pública do Destinatário
              </Label>
              <Textarea
                placeholder="Cole aqui a chave pública (formato PEM)..."
                value={publicKey || ''} // Usa o estado centralizado
                onChange={handlePublicKeyChange}
                className="mt-2 font-mono text-sm"
                rows={6}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <Label htmlFor="fileInput" className="text-base font-semibold text-gray-700 flex items-center gap-2">
              Arquivo para Envio
            </Label>
            <p className="text-sm text-gray-500 mb-2">Selecione um arquivo para ser criptografado</p>

            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={triggerFileInput}
            >
              {!file ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600">Arraste e solte um arquivo aqui, ou clique para selecionar</p>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    Remover
                  </Button>
                </div>
              )}
            </div>
          </div>

          {fileHash && (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-gray-700">Hash do Arquivo Original</strong>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(fileHash)}
                >
                  Copiar Hash
                </Button>
              </div>
              <p className="text-sm font-mono bg-gray-50 p-3 rounded-md border border-gray-200 break-all">
                {fileHash}
              </p>
            </div>
          )}
        </div>

        {(publicKey?.trim().length > 0 && file) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-4"
          >
            <Button variant="outline" onClick={handleReset} className="hover:bg-gray-50">
              <RefreshCw className="w-4 h-4 mr-2" />
              Repetir
            </Button>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
}

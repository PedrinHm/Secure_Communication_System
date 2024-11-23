import { useState, useRef, useEffect } from "react";
import { calculateHash } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";

export function PrepStep({ setIsStepComplete }: { setIsStepComplete: (isComplete: boolean) => void }) {
  const [publicKey, setPublicKey] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isPublicKeyValid = publicKey.trim().length > 0;
    const isFileValid = !!file;
    
    // Só completa o step se ambos estiverem prontos
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

    setFile(selectedFile);
    setFileContent(null);

    const isViewableFile = /\.(txt|json|md|csv|log|xml|yaml|yml|html|css|js|ts|jsx|tsx)$/i.test(selectedFile.name);

    if (isViewableFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setFileContent(content);
        calculateHash(content).then((hash) => setFileHash(hash));
      };
      reader.readAsText(selectedFile);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as ArrayBuffer;
        calculateHash(content).then((hash) => setFileHash(hash));
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePublicKeyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setPublicKey(value);
    
    if (value.trim().length > 0) {
      toast({
        title: "Sucesso!",
        description: "Chave pública inserida.",
        variant: "success",
      });
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
                <Tooltip>
                  <TooltipTrigger>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    Cole a chave pública do professor aqui
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Textarea
                placeholder="Cole aqui a chave pública (formato PEM)..."
                value={publicKey}
                onChange={handlePublicKeyChange}
                className="mt-2 font-mono text-sm"
                rows={6}
              />
            </div>
            
            {publicKey.trim().length > 0 && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-700">Chave pública válida!</span>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <Label htmlFor="fileInput" className="text-base font-semibold text-gray-700 flex items-center gap-2">
              Arquivo para Envio
              <Tooltip>
                <TooltipTrigger>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Este arquivo será criptografado com a chave pública.</p>
                  <p>A visualização prévia está disponível apenas para arquivos de texto.</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <p className="text-sm text-gray-500 mb-2">Selecione um arquivo para ser criptografado</p>
            
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                 onClick={triggerFileInput}>
              {!file ? (
                <>
                  <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="space-y-1 text-center">
                    <p className="text-sm text-gray-600">
                      Arraste e solte um arquivo aqui, ou
                    </p>
                    <Button 
                      type="button" 
                      variant="secondary" 
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                    >
                      Escolher Arquivo
                    </Button>
                    <p className="text-xs text-gray-500">
                      Qualquer tipo de arquivo é aceito
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setFileContent(null);
                      setFileHash(null);
                    }}
                  >
                    Remover
                  </Button>
                </div>
              )}
            </div>
          </div>

          {fileContent && /\.(txt|json|md|csv|log|xml|yaml|yml|html|css|js|ts|jsx|tsx)$/i.test(file?.name || '') && (
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <strong className="text-gray-700">Visualização do Arquivo</strong>
                </div>
                {fileContent.length > 10000 && (
                  <span className="text-xs text-gray-500">
                    Exibindo os primeiros 10.000 caracteres
                  </span>
                )}
              </div>
              <ScrollArea className="p-4 max-h-[200px]">
                <pre className="text-sm font-mono text-gray-600 whitespace-pre-wrap">
                  {fileContent.slice(0, 10000)}
                </pre>
              </ScrollArea>
            </div>
          )}

          {file && !fileContent && (
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Arquivo não suportado para visualização. Arquivos suportados: .txt, .json, .md, .csv, .log, .xml, .yaml, .yml, .html, .css, .js, .ts, .jsx, .tsx</span>
              </div>
            </div>
          )}

          {fileHash && (
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <strong className="text-gray-700">Hash do Arquivo Original</strong>
                  <Tooltip>
                    <TooltipTrigger>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      O hash é uma assinatura digital única gerada a partir do conteúdo do arquivo. Ele será usado para verificar a integridade do arquivo.
                    </TooltipContent>
                  </Tooltip>
                </div>
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
      </div>
    </TooltipProvider>
  );
}

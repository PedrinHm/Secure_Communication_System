import { useState } from "react";
import { calculateHash } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export function PrepStep() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        setFileContent(content);

        calculateHash(content).then((hash) => setFileHash(hash));
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Preparação do Ambiente</h2>

      <div className="mb-4">
        <label htmlFor="publicKeyInput" className="block font-medium">
          Chave Pública do Destinatário (Professor):
        </label>
        <Textarea
          id="publicKeyInput"
          placeholder="Insira a chave pública aqui"
          value={publicKey || ""}
          onChange={(e) => setPublicKey(e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fileInput" className="block font-medium">
          Selecionar Arquivo para Enviar:
        </label>
        <input
          id="fileInput"
          type="file"
          className="mt-0 block w-full border rounded p-2"
          onChange={handleFileSelect}
        />
        {file && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <strong>Arquivo Selecionado:</strong> {file.name}
          </div>
        )}
      </div>

      {fileContent && (
        <ScrollArea className="bg-gray-100 rounded max-h-40 overflow-hidden mb-4">
          <div className="p-4">
            <strong>Conteúdo do Arquivo:</strong>
            <pre className="mt-1 text-sm whitespace-pre-wrap">{fileContent}</pre>
          </div>
        </ScrollArea>
      )}

      {fileHash && (
        <div className="p-4 bg-gray-100 rounded">
          <strong>Hash do Arquivo Original:</strong>
          <p className="mt-1 text-sm">{fileHash}</p>
        </div>
      )}
    </div>
  );
}

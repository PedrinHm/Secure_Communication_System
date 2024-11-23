import { useState } from "react";
import { calculateHash } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PrepStep() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileContent(null);

    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;

      if (fileExtension === "txt") {
        setFileContent(content);
      }

      calculateHash(content).then((hash) => setFileHash(hash));
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Preparação do Ambiente</h2>

      <div className="mb-4">
        <Label htmlFor="publicKeyInput" className="block font-medium">
          Chave Pública do Destinatário:
        </Label>
        <Textarea
          id="publicKeyInput"
          placeholder="Insira a chave pública aqui"
          value={publicKey || ""}
          onChange={(e) => setPublicKey(e.target.value)}
          className="mt-2 min-h-[60px]"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="fileInput" className="block font-medium">
          Selecionar Arquivo para Enviar:
        </Label>
        <Input
          id="fileInput"
          type="file"
          className="mt-2"
          onChange={handleFileSelect}
        />
        {file && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <strong>Arquivo Selecionado:</strong> {file.name}
          </div>
        )}
      </div>

      {fileContent && (
        <div className="bg-gray-100 rounded max-h-40 overflow-hidden">
          <div className="p-4 border-b border-gray-300">
            <strong>Conteúdo do Arquivo:</strong>
          </div>
          <ScrollArea className="p-4 overflow-auto max-h-[120px]">
            <pre className="mt-1 text-sm whitespace-pre-wrap">{fileContent}</pre>
          </ScrollArea>
        </div>
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

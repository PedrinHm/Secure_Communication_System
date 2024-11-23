import { useState } from "react";

interface KeyDisplayProps {
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
}

export function KeyDisplay({ title, content, bgColor, textColor }: KeyDisplayProps) {
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
      }}
      className="p-4 rounded-lg border flex flex-col items-center justify-start w-[300px] h-[330px] m-4 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-lg font-semibold mb-4 text-center" style={{ color: textColor }}>
        {title}
      </h3>
      <pre
        className="font-mono text-sm text-center overflow-auto flex-1 w-full"
        style={{
          color: textColor,
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {isHovered ? getExplanation(title) : content}
      </pre>
    </div>
  );
}

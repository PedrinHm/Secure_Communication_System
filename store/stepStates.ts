import { create } from 'zustand';

interface StepState {
  configCompleted: boolean;
  prepCompleted: boolean;
  signCompleted: boolean;
  protectCompleted: boolean;
  packCompleted: boolean;
  verifyCompleted: boolean;
  rsaPrivateKey?: string;
  rsaPublicKey?: string;
  aesKey?: string;
  fileHash?: string;
  file?: File | null;
  ReceiverPublicKey?: string;
  generatedFiles: { [key: string]: Blob };
  encryptedKey?: string;
  signature?: string;
  setStepCompleted: (step: string, completed: boolean) => void;  
  setRsaPublicKey: (key: string) => void;
  setRsaPrivateKey: (key: string) => void;
  setReceiverPublicKey: (key: string) => void;
  setAesKey: (key: string) => void;
  setFileHash: (hash: string) => void;
  setFile: (file: File) => void;
  setEncriptedKey: (key: string) => void;
  setSignature: (key: string) => void;
}

export const useStepStore = create<StepState>((set) => ({
  configCompleted: false,
  prepCompleted: false,
  signCompleted: false,
  protectCompleted: false,
  packCompleted: false,
  verifyCompleted: false,
  rsaPrivateKey: '',
  rsaPublicKey: '',
  aesKey: '',
  fileHash: '',
  file: null,
  ReceiverPublicKey: '',
  generatedFiles: {},
  setStepCompleted: (step, completed) =>
    set((state) => ({ ...state, [`${step}Completed`]: completed })),
  setRsaPrivateKey: (key) => set((state) => ({ ...state, rsaPrivateKey: key })),
  setRsaPublicKey: (key) => set((state) => ({ ...state, rsaPublicKey: key })),
  setReceiverPublicKey: (key) => set((state) => ({ ...state, ReceiverPublicKey: key })),
  setAesKey: (key) => set((state) => ({ ...state, aesKey: key })),
  setFileHash: (hash) => set((state) => ({ ...state, fileHash: hash })),
  setFile: (file) => set((state) => ({ ...state, file: file })),
  setEncriptedKey: (key) => set((state) => ({ ...state, encryptedKey: key })),
  setSignature: (key) => set((state) => ({ ...state, signature: key })),
}));

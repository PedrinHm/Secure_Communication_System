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
  recipientPublicKey?: string;
  generatedFiles: { [key: string]: Blob };
  setStepCompleted: (step: string, completed: boolean) => void;  
  setRsaPublicKey: (key: string) => void;
  setRsaPrivateKey: (key: string) => void;
  setRecipientPublicKey: (key: string) => void;
  setAesKey: (key: string) => void;
  setFileHash: (hash: string) => void;
  setFile: (file: File) => void;
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
  recipientPublicKey: '',
  generatedFiles: {},
  setStepCompleted: (step, completed) =>
    set((state) => ({ ...state, [`${step}Completed`]: completed })),
  setRsaPrivateKey: (key) => set((state) => ({ ...state, rsaPrivateKey: key })),
  setRsaPublicKey: (key) => set((state) => ({ ...state, rsaPublicKey: key })),
  setRecipientPublicKey: (key) => set((state) => ({ ...state, recipientPublicKey: key })),
  setAesKey: (key) => set((state) => ({ ...state, aesKey: key })),
  setFileHash: (hash) => set((state) => ({ ...state, fileHash: hash })),
  setFile: (file) => set((state) => ({ ...state, file: file })),
}));

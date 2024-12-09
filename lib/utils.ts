import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import forge from 'node-forge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function calculateHash(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const signHash = (hash: string, privateKeyPem: string): string => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const md = forge.md.sha256.create();
  md.update(hash, 'utf8');
  const signature = privateKey.sign(md);
  return forge.util.encode64(signature);
};

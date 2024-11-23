import { Step } from "@/types/steps";
import { ConfigStep } from '@/components/ConfigStep';
import { PrepStep } from '@/components/PrepStep';
import { SignStep } from "@/components/SignStep";
import { ProtectionStep } from "@/components/ProtectionStep";
import { SendStep } from "@/components/SendStep";
import { VerifyStep } from "@/components/VerifyStep";

export const steps: Step[] = [
  {
    id: 'config',
    title: 'Configuração Inicial',
    content: ConfigStep,
  },
  {
    id: 'prep',
    title: 'Preparação do Ambiente',
    content: PrepStep,
  },
  {
    id: 'sign',
    title: 'Processo de Assinatura e Cifragem',
    content: SignStep,
  },
  {
    id: 'protect',
    title: 'Proteção da Chave Simétrica',
    content: ProtectionStep,
  },
  {
    id: 'pack',
    title: 'Empacotamento e Simulação',
    content: SendStep,
  },
  {
    id: 'verify',
    title: 'Verificação e Descriptografia',
    content: VerifyStep,
  }
]; 
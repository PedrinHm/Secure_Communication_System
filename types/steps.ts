export type StepId = 'config' | 'prep' | 'sign' | 'protect' | 'pack' | 'verify';

export interface Step {
  id: StepId;
  title: string;
  content: React.ReactNode | (() => React.ReactNode);
} 
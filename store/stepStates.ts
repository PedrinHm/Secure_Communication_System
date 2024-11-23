import { create } from 'zustand'

interface StepState {
  configCompleted: boolean
  prepCompleted: boolean
  signCompleted: boolean
  protectCompleted: boolean
  packCompleted: boolean
  verifyCompleted: boolean
  setStepCompleted: (step: string, completed: boolean) => void
}

export const useStepStore = create<StepState>((set) => ({
  configCompleted: false,
  prepCompleted: false,
  signCompleted: false,
  protectCompleted: false,
  packCompleted: false,
  verifyCompleted: false,
  setStepCompleted: (step, completed) => 
    set((state) => ({ ...state, [`${step}Completed`]: completed }))
})) 
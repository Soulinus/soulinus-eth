"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface FormData {
  step1?: string;
  step2?: string;
  [key: string]: any;
}

interface FormContextType {
  currentStep: number;
  formData: FormData;
  updateForm: (newData: FormData) => void;
  updateCurrentStep: (step: number) => void;
  contractAddress: string;
  updateContractAddress: (address: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const ContractFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [contractAddress, setContractAddress] = useState<string>("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  const updateForm = (newData: FormData) => {
    setFormData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  const updateCurrentStep = (step: number) => {
    setCurrentStep(step);
  };

  const updateContractAddress = (address: string) => {
    setContractAddress(address);
  };

  const providerValue = {
    currentStep,
    formData,
    updateForm,
    updateCurrentStep,
    contractAddress,
    updateContractAddress,
  };

  return <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>;
};

export const useContractForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

"use client";

import { useRouter } from "next/navigation";
import { stepsConfig } from "../stepsConfig";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContractForm } from "@/app/contractSettings/context";

export default function StepNavigationControl() {
  const { currentStep } = useContractForm();
  const router = useRouter();
  function goToPreviousStep() {
    const previousStep = stepsConfig[currentStep - 1];
    if (!previousStep) {
      return;
    }
    router.push(previousStep.path);
  }
  function gotToNextStep() {
    const nextStep = stepsConfig[currentStep + 1];
    if (!nextStep) {
      return;
    }
    router.push(nextStep.path);
  }
  return (
    <div className="flex justify-around">
      <button className="btn w-32" onClick={goToPreviousStep}>
        <ChevronLeft /> Previous
      </button>
      <button className="btn w-32" onClick={gotToNextStep}>
        Next <ChevronRight />
      </button>
    </div>
  );
}

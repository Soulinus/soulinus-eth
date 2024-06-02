"use client";

import { stepsConfig } from "../stepsConfig";
import { useContractForm } from "@/app/contractSettings/context";

export function Steps() {
  const { currentStep } = useContractForm();

  return (
    <div className="flex justify-center">
      <ul className="steps steps-vertical lg:steps-horizontal">
        {stepsConfig.map((step, index) => (
          <li key={index} className={`step ${currentStep + 1 > index && "step-success"}`}>
            {step.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

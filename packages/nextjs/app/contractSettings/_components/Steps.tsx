"use client";

import Link from "next/link";
import { stepsConfig } from "../stepsConfig";
import { useContractForm } from "@/app/contractSettings/context";

export function Steps() {
  const { currentStep } = useContractForm();

  return (
    <div className="flex justify-center">
      <ul className="steps steps-vertical lg:steps-horizontal">
        {stepsConfig.map((step, index) => (
          <Link key={index} href={step.path} className={`step ${currentStep + 1 > index && "step-success"}`}>
            <span>{step.title}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

import { useContractForm } from "@/app/contractSettings/context";

const steps = ["Create Contract", "Deposit Funds", "Lock your Funds", "Assign Beneficiaries"];

export function Steps() {
  const { currentStep } = useContractForm();
  return (
    <div className="flex justify-center">
      <ul className="steps">
        {steps.map((step, index) => (
          <li key={index} className={`step ${currentStep > index && "step-success"}`}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

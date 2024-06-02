"use client";

import StepNavigationControl from "./_components/StepNavigationControl";
import { Steps } from "./_components/Steps";
import { ContractFormProvider } from "./context";

export default function setupContract({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <ContractFormProvider>
        <Steps />
        <div className="flex flex-col w-full mt-2">
          <div className="grid card bg-base-300 rounded-box pb-4">
            <div className="">{children}</div>
            <StepNavigationControl />
          </div>
        </div>
      </ContractFormProvider>
    </div>
  );
}

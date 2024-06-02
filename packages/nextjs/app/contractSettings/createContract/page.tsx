"use client";

import { useEffect } from "react";
import { useContractForm } from "../context";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function CreateContract() {
  const { updateCurrentStep } = useContractForm();
  useEffect(() => {
    updateCurrentStep(0);
  }, [updateCurrentStep]);
  return (
    <div className="py-10 flex flex-col items-center space-y-4">
      <h1 className="title text-center">Create contract</h1>
      <ConnectButton label="Sign in" />
    </div>
  );
}

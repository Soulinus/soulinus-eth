"use client";

import { useEffect } from "react";
import { useContractForm } from "../context";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Address } from "@/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "@/hooks/scaffold-eth";
import { isZeroAddress } from "@/utils/scaffold-eth/common";

export default function CreateContract() {
  const { updateCurrentStep, updateWillContractAddress } = useContractForm();
  const { address: connectedAddress } = useAccount();
  const { data: willAddress } = useScaffoldReadContract({
    contractName: "WillFactory",
    functionName: "getWillAddress",
    args: [connectedAddress],
  });
  const { writeContractAsync, isPending } = useScaffoldWriteContract("WillFactory");
  useEffect(() => {
    updateCurrentStep(0);
  }, [updateCurrentStep]);

  useEffect(() => {
    if (willAddress && !isZeroAddress(willAddress)) {
      updateWillContractAddress(willAddress);
    }
  }, [willAddress, updateWillContractAddress]);
  const handleCreateWillContract = async () => {
    try {
      await writeContractAsync({
        functionName: "createWill",
      });
    } catch (error) {}
  };
  return (
    <div className="py-10 flex flex-col items-center space-y-4">
      <h1 className="title text-center">Create contract</h1>
      {connectedAddress && (
        <>
          You are connected to <Address address={connectedAddress} format="long" />
        </>
      )}
      <ConnectButton label="Sign in" />
      {(!willAddress || isZeroAddress(willAddress)) && (
        <>
          <h2 className="title text-center">You need to create a Will contract</h2>
          <button className="btn" onClick={handleCreateWillContract}>
            Create Will contract
          </button>
        </>
      )}
      {willAddress && !isZeroAddress(willAddress) && (
        <>
          My Will contract is at <Address address={willAddress} format="long" />
        </>
      )}
    </div>
  );
}

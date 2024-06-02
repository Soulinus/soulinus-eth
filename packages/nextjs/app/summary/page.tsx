"use client";

import { formatEther, parseEther } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { Address, Balance } from "@/components/scaffold-eth";
import willContractAbi from "@/contracts/willContractAbi";
import { useScaffoldReadContract } from "@/hooks/scaffold-eth";

export default function ContractSummary() {
  const { address: connectedAddress } = useAccount();
  const { data: willContractAddress } = useScaffoldReadContract({
    contractName: "WillFactory",
    functionName: "getWillAddress",
    args: [connectedAddress],
  });
  const wagmiContractConfig = {
    address: willContractAddress,
    abi: willContractAbi,
  };
  const { data, error, isPending } = useReadContracts({
    contracts: [
      {
        ...wagmiContractConfig,
        functionName: "getBeneficiaries",
      },
      {
        ...wagmiContractConfig,
        functionName: "lockTime",
      },
    ],
  });
  const [beneficiariesData, lockTimeData] = data || [];

  return (
    <div className="grid card bg-base-300 rounded-box py-4 my-3">
      <div className="p-6 max-w-3xl mx-auto  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contract Summary</h1>
        {isPending ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <pre className="text-red-500">{error.message}</pre>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Contract Details</h2>
              <div className="">
                Contract Address: <Address address={willContractAddress} format="long" />
              </div>
              <div className="">
                Balance: <Balance address={willContractAddress} />
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Beneficiaries</h2>
              {beneficiariesData?.result?.[0].map((address, index) => (
                <div key={index} className="p-4 mb-2 rounded-lg shadow-inner">
                  <h3 className="text-lg font-medium">Beneficiary {index + 1}</h3>
                  <p className="">Address: {address}</p>
                  <p className="">Amount: {formatEther(beneficiariesData?.result?.[1][index])} Eth</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Lock Time</h2>
              <p className="">{new Date((Number(lockTimeData?.result) ?? 0) * 1000).toLocaleString()}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

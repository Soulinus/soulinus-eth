"use client";

import { useEffect, useState } from "react";
import { useContractForm } from "../context";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address, Balance, EtherInput } from "@/components/scaffold-eth";

export default function DepositFunds() {
  const [loading, setLoading] = useState(false);
  const { updateCurrentStep, willContractAddress } = useContractForm();
  useEffect(() => {
    updateCurrentStep(1);
  }, [updateCurrentStep]);
  const { address: connectedAddress } = useAccount();
  const [fundAmount, setFundAmount] = useState("");
  const { data: hash, sendTransaction } = useSendTransaction();

  async function transferFunds() {
    console.log(`transferFunds - ${fundAmount} ETH`);
    sendTransaction({ to: willContractAddress, value: parseEther(fundAmount) });
  }

  return (
    <div className="py-10 flex flex-col items-center space-y-4">
      <p className="text-center">You can now deposit funds to your contract.</p>
      <div className="text-sm font-semibold mb-2">
        Connected Address: <Address address={connectedAddress} format="long" />
      </div>

      <div className="text-sm font-semibold">
        Connected Wallet Balance: <Balance address={connectedAddress} />
      </div>
      <div className="text-sm font-semibold mb-2">
        Contract Address: <Address address={willContractAddress} format="long" />
      </div>
      <div className="text-sm font-semibold">
        Contract Balance: <Balance address={willContractAddress} />
      </div>

      <EtherInput placeholder="Amount to send" value={fundAmount} onChange={value => setFundAmount(value)} />

      <button className="btn btn-primary" onClick={transferFunds} disabled={loading}>
        {!loading ? (
          <BanknotesIcon className="h-6 w-6" />
        ) : (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        <span>Transfer Funds</span>
      </button>

      {hash && (
        <p className="text-center">
          <span className="font-bold">Transaction Hash:</span> {hash}
        </p>
      )}
    </div>
  );
}

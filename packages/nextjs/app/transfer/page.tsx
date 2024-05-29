"use client";

import { useState } from "react";
import { Address, AddressInput, Balance, EtherInput } from "@/components/scaffold-eth";
import { useTransactor } from "@/hooks/scaffold-eth";
import { notification } from "@/utils/scaffold-eth";
import { Address as AddressType, createWalletClient, http, parseEther } from "viem";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const localWalletClient = createWalletClient({
  chain: hardhat,
  transport: http(),
});

/**
 * Faucet modal which lets you send ETH to any address.
 */
export default function Transfer() {
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [sendValue, setSendValue] = useState("");
  const { address: walletAddress } = useAccount();

  const faucetTxn = useTransactor(localWalletClient);

  const sendETH = async () => {
    if (!walletAddress || !inputAddress) {
      return;
    }
    try {
      setLoading(true);
      await faucetTxn({
        to: inputAddress,
        value: parseEther(sendValue as `${number}`),
        account: walletAddress,
      });
      setLoading(false);
      setInputAddress(undefined);
      setSendValue("");
    } catch (error) {
      console.error("⚡️ ~ file: transfer/page.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {/* dummy input to capture event onclick on modal box */}
      <input className="h-0 w-0 absolute top-0 left-0" />
      <h3 className="text-xl font-bold mb-3">Transfer Funds</h3>
      <label htmlFor="faucet-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
        ✕
      </label>
      <div className="space-y-3">
        <div className="flex space-x-4">
          <div>
            <span className="text-sm font-bold">From:</span>
            <Address address={walletAddress} />
          </div>
          <div>
            <span className="text-sm font-bold pl-3">Available:</span>
            <Balance address={walletAddress} />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <AddressInput
            placeholder="Destination Address"
            value={inputAddress ?? ""}
            onChange={value => setInputAddress(value as AddressType)}
          />
          <EtherInput placeholder="Amount to send" value={sendValue} onChange={value => setSendValue(value)} />
          <button className="h-10 btn btn-primary btn-sm px-2 rounded-full" onClick={sendETH} disabled={loading}>
            {!loading ? (
              <BanknotesIcon className="h-6 w-6" />
            ) : (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

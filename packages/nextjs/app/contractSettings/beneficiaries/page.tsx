"use client";

import { useEffect, useState } from "react";
import { useContractForm } from "../context";
import { AddressInput, EtherInput } from "@/components/scaffold-eth";
import { useScaffoldWriteContract } from "@/hooks/scaffold-eth";

interface Beneficiary {
  address: string;
  amount: string;
}

export default function Beneficiaries() {
  const { updateCurrentStep } = useContractForm();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [newBeneficiary, setNewBeneficiary] = useState<Beneficiary>({ address: "", amount: "" });
  const { writeContractAsync, isPending } = useScaffoldWriteContract("EthInheritance");

  useEffect(() => {
    updateCurrentStep(3);
  }, [updateCurrentStep]);

  useEffect(() => {
    if (beneficiaries.length === 0) {
      addBeneficiary();
    }
  }, []);

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, newBeneficiary]);
    setNewBeneficiary({ address: "", amount: "" });
  };

  const removeBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index));
  };

  const updateBeneficiary = (index: number, { address, amount }: Beneficiary) => {
    const newBeneficiaries = [...beneficiaries];
    newBeneficiaries[index] = { address, amount };
    setBeneficiaries(newBeneficiaries);
  };

  const saveBeneficiaries = async () => {
    if (!beneficiaries || !beneficiaries.length) {
      return;
    }
    try {
      // await writeContractAsync({
      //   functionName: "addBeneficiary",
      //   args: [beneficiaries[0]],
      // });
    } catch (error) {}
  };

  return (
    <div className="py-10 flex flex-col items-center space-y-4">
      <h1 className="title text-center">Add Beneficiaries</h1>
      {/* <BeneficiaryForm /> */}
      <ul className="list-none">
        {beneficiaries.map((beneficiary, index) => (
          <li key={index} className="mb-2">
            Beneficiary {index + 1}{" "}
            <button onClick={() => removeBeneficiary(index)} className="btn btn-secondary btn-xs">
              Remove
            </button>
            <div className="mb-4">
              Address:{" "}
              <AddressInput
                placeholder="Beneficiary Address"
                value={beneficiary.address}
                onChange={address => updateBeneficiary(index, { ...beneficiary, address })}
              />
              Amount:{" "}
              <EtherInput
                placeholder="Allocated Amount"
                value={beneficiary.amount}
                onChange={amount => updateBeneficiary(index, { ...beneficiary, amount })}
              />
            </div>
          </li>
        ))}
      </ul>
      <button onClick={addBeneficiary} className="btn btn-secondary mt-2">
        + Add Beneficiary
      </button>
      <div className="divider my-2"></div>
      <button className="btn w-1/2 sm:w-1/3" onClick={saveBeneficiaries}>
        Save Beneficiaries
      </button>
      {beneficiaries.map(beneficiary => (
        <div key={beneficiary.address}>
          {beneficiary.address} - {beneficiary.amount} ETH
        </div>
      ))}
    </div>
  );
}

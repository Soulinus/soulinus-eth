"use client";

import { useEffect, useState } from "react";
import DateIntervalForm from "../_components/DateInterval";
import { useContractForm } from "../context";
import { useWriteContract } from "wagmi";
import willContractAbi from "@/contracts/willContractAbi";
import { useScaffoldWriteContract } from "@/hooks/scaffold-eth";

function getTimestamp(date: Date) {
  const timestamp = BigInt(Math.round(date.getTime() / 1000));
  return timestamp;
}

export default function LockFunds() {
  const { updateCurrentStep, willContractAddress } = useContractForm();
  useEffect(() => {
    updateCurrentStep(2);
  }, [updateCurrentStep]);
  const { error, isPending, writeContract } = useWriteContract();
  // const { writeContractAsync, isPending } = useScaffoldWriteContract("Will");
  const [selectedInterval, setSelectedInterval] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");
  const [calculatedDate, setCalculatedDate] = useState<Date | null>(null);

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    setCustomDate(""); // Clear custom date if an interval is selected
  };

  const handleCustomDateChange = (date: string) => {
    setCustomDate(date);
    setSelectedInterval(""); // Clear selected interval if a custom date is entered
  };
  useEffect(() => {
    if (selectedInterval) {
      const newDate = new Date();
      switch (selectedInterval) {
        case "2minutes":
          newDate.setMinutes(newDate.getMinutes() + 2);
          break;
        case "1month":
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case "3months":
          newDate.setMonth(newDate.getMonth() + 3);
          break;
        case "6months":
          newDate.setMonth(newDate.getMonth() + 6);
          break;
        case "1year":
          newDate.setFullYear(newDate.getFullYear() + 1);
          break;
        default:
          break;
      }
      setCalculatedDate(newDate);
    } else if (customDate) {
      setCalculatedDate(new Date(customDate));
    } else {
      setCalculatedDate(null);
    }
  }, [selectedInterval, customDate]);

  async function handleLockFunds() {
    if (!calculatedDate) {
      return;
    }
    const timestamp = getTimestamp(calculatedDate);
    console.log(timestamp);
    try {
      await writeContract({
        address: willContractAddress,
        abi: willContractAbi,
        functionName: "lockFunds",
        args: [timestamp],
      });
    } catch (error) {}
  }
  return (
    <div className="py-10 flex flex-col items-center space-y-4">
      <h1 className="title text-center">Lock the funds</h1>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Choose a Date Interval</h1>
        <form onSubmit={handleLockFunds} className="space-y-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After 2 minutes(Testing only)</span>
              <input
                type="radio"
                name="interval"
                value="2minutes"
                checked={selectedInterval === "2minutes"}
                onChange={() => handleIntervalChange("2minutes")}
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After 1 month</span>
              <input
                type="radio"
                name="interval"
                value="1month"
                checked={selectedInterval === "1month"}
                onChange={() => handleIntervalChange("1month")}
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After 3 months</span>
              <input
                type="radio"
                name="interval"
                value="3months"
                checked={selectedInterval === "3months"}
                onChange={() => handleIntervalChange("3months")}
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After 6 months</span>
              <input
                type="radio"
                name="interval"
                value="3months"
                checked={selectedInterval === "6months"}
                onChange={() => handleIntervalChange("6months")}
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After 1 year</span>
              <input
                type="radio"
                name="interval"
                value="1year"
                checked={selectedInterval === "1year"}
                onChange={() => handleIntervalChange("1year")}
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">After a specific date</span>
              <input
                type="date"
                name="customDate"
                value={customDate}
                onChange={e => handleCustomDateChange(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          {calculatedDate && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Released Date:</span>
                <span className="label-text font-bold">{`${calculatedDate.toLocaleDateString()} - ${calculatedDate.toLocaleTimeString()}`}</span>
              </label>
            </div>
          )}
          <div className="flex justify-center">
            <button type="submit" className="btn btn-accent">
              Lock the funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const DateIntervalForm: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");

  const handleIntervalChange = (interval: string) => {
    setSelectedInterval(interval);
    setCustomDate(""); // Clear custom date if an interval is selected
  };

  const handleCustomDateChange = (date: string) => {
    setCustomDate(date);
    setSelectedInterval(""); // Clear selected interval if a custom date is entered
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedInterval) {
      console.log(`Selected Interval: ${selectedInterval}`);
    }
    if (customDate) {
      console.log(`Custom Date: ${customDate}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Choose a Date Interval</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DateIntervalForm;

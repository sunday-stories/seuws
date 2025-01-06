import React, { useEffect, useState } from "react";
import './Report.css';

const Report = () => {
  // States to store data
  const [dailyConsumption, setDailyConsumption] = useState(0);
  const [monthlyConsumption, setMonthlyConsumption] = useState(0);
  const [cost, setCost] = useState(0);
  const [faults, setFaults] = useState([]);
  const [usageStatus, setUsageStatus] = useState("");
  const [overUsage, setOverUsage] = useState("");

  useEffect(() => {
    // Fetch the data from localStorage or other sources
    const dailyConsumption = parseFloat(localStorage.getItem("totalDailyConsumption")) || 0;
    const monthlyConsumption = parseFloat(localStorage.getItem("totalMonthlyConsumption")) || 0;
    const usageStatus = getUsageStatus(monthlyConsumption);

    // Fetch the smart meter readings
    const smartMeterDailyReading = parseFloat(localStorage.getItem("smartMeterDailyReading")) || 0;
    const smartMeterMonthlyReading = parseFloat(localStorage.getItem("smartMeterMonthlyReading")) || 0;

    // Calculate the cost based on consumption (using KSEB rate structure)
    const calculatedCost = calculateCost(monthlyConsumption);
    const faults = checkForFaults(dailyConsumption);

    // Check for over usage
    const overUsageMessage = checkForOverUsage(smartMeterDailyReading, smartMeterMonthlyReading, dailyConsumption, monthlyConsumption);

    // Set the data to state
    setDailyConsumption(dailyConsumption);
    setMonthlyConsumption(monthlyConsumption);
    setCost(calculatedCost);
    setFaults(faults);
    setUsageStatus(usageStatus);
    setOverUsage(overUsageMessage);
  }, []);

  // Calculate the cost based on KSEB billing structure
  const calculateCost = (consumption) => {
    let cost = 0;
    if (consumption <= 50) {
      cost = consumption * 3.5;
    } else if (consumption <= 100) {
      cost = 50 * 3.5 + (consumption - 50) * 4.5;
    } else if (consumption <= 150) {
      cost = 50 * 3.5 + 50 * 4.5 + (consumption - 100) * 5.5;
    } else if (consumption <= 200) {
      cost = 50 * 3.5 + 50 * 4.5 + 50 * 5.5 + (consumption - 150) * 6.5;
    } else {
      cost = 50 * 3.5 + 50 * 4.5 + 50 * 5.5 + 50 * 6.5 + (consumption - 200) * 7.5;
    }
    return cost.toFixed(2);
  };

  // Get usage status based on consumption
  const getUsageStatus = (consumption) => {
    if (consumption <= 100) {
      return "Normal usage.";
    } else if (consumption <= 200) {
      return "Moderate usage, consider energy-saving measures.";
    } else {
      return "High usage, fault or inefficiency likely.";
    }
  };

  // Check for faults (simplified example)
  const checkForFaults = (dailyConsumption) => {
    const faults = [];
    if (dailyConsumption > 10) {
      faults.push("Possible fault detected due to high daily consumption.");
    }
    return faults;
  };

  // Check if smart meter readings exceed the expected consumption
  const checkForOverUsage = (smartMeterDailyReading, smartMeterMonthlyReading, userDailyUsage, userMonthlyUsage) => {
    let message = "";

    // Compare daily usage
    if (smartMeterDailyReading > userDailyUsage) {
      message += "Daily usage exceeded the expected value. ";
    }

    // Compare monthly usage
    if (smartMeterMonthlyReading > userMonthlyUsage) {
      message += "Monthly usage exceeded the expected value. ";
    }

    if (message === "") {
      message = "No over-usage detected.";
    }

    return message;
  };

  return (
    <div className="report-container">
      <h2>Energy Consumption Report</h2>

      <div className="report-details">
        <h3>Daily Consumption</h3>
        <p><strong>Consumption:</strong> {dailyConsumption.toFixed(3)} kWh</p>

        <h3>Monthly Consumption</h3>
        <p><strong>Consumption:</strong> {monthlyConsumption.toFixed(3)} kWh</p>

        <div className="cost-section">
          <h3>Calculated Bill</h3>
          <p><strong>Total Cost:</strong> ₹ {cost}</p>
        </div>

        <div className="usage-status">
          <h3>Usage Status</h3>
          <p>{usageStatus}</p>
        </div>

        <div className="over-usage-status">
          <h3>Over-Usage</h3>
          <p>{overUsage}</p>
        </div>

        <div className="fault-status">
          <h3>Faults</h3>
          {faults.length > 0 ? (
            <ul>
              {faults.map((fault, index) => (
                <li key={index}>{fault}</li>
              ))}
            </ul>
          ) : (
            <p>No faults detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;

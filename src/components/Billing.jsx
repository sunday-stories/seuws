import React, { useState, useEffect } from "react";
import "./Billing.css"; // Optionally, you can add a CSS file for custom styles.

const Billing = () => {
  const [monthlyConsumption, setMonthlyConsumption] = useState(0);
  const [billAmount, setBillAmount] = useState(0);

  // KSEB tariff rates (example values, update based on the actual rates)
  const rateSlabs = [
    { limit: 50, rate: 3.1 },  // First 50 units at 3.1 Rs per unit
    { limit: 100, rate: 5.2 }, // Next 50 units at 5.2 Rs per unit
    { limit: 200, rate: 6.7 }, // Next 100 units at 6.7 Rs per unit
    { limit: Infinity, rate: 7.9 }, // Above 200 units at 7.9 Rs per unit
  ];

  // Function to calculate bill based on KSEB rate slabs
  const calculateBill = (consumption) => {
    let remainingConsumption = consumption;
    let totalBill = 0;

    // Calculate bill based on the slabs
    for (let i = 0; i < rateSlabs.length; i++) {
      const slab = rateSlabs[i];
      if (remainingConsumption <= 0) break;

      const unitsInThisSlab = Math.min(remainingConsumption, slab.limit);
      totalBill += unitsInThisSlab * slab.rate;
      remainingConsumption -= unitsInThisSlab;
    }

    setBillAmount(totalBill);
  };

  // Fetch the total monthly consumption from localStorage when the component mounts
  useEffect(() => {
    const totalMonthlyConsumption = localStorage.getItem("totalMonthlyConsumption") || 0;
    setMonthlyConsumption(parseFloat(totalMonthlyConsumption));
    calculateBill(parseFloat(totalMonthlyConsumption));
  }, []);

  return (
    <div className="billing-container">
      <h1>Billing Information</h1>
      <div className="billing-details">
        <p>
          <strong>Total Monthly Consumption:</strong> {monthlyConsumption} kWh
        </p>
        <p>
          <strong>Bill Amount:</strong> ₹ {billAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Billing;

import React, { useState, useEffect } from "react";
import "./ApplianceManagement.css"; // Make sure this is imported

const ApplianceManagement = () => {
  const [appliances, setAppliances] = useState([]);
  const [newAppliance, setNewAppliance] = useState({ name: "", power: "", usage: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem("appliances"));
    if (savedAppliances) {
      setAppliances(savedAppliances);
    }
  }, []);

  useEffect(() => {
    if (appliances.length > 0) {
      localStorage.setItem("appliances", JSON.stringify(appliances));

      const totalDailyConsumption = calculateTotalConsumption("daily");
      const totalMonthlyConsumption = totalDailyConsumption * 30;

      localStorage.setItem("totalDailyConsumption", totalDailyConsumption);
      localStorage.setItem("totalMonthlyConsumption", totalMonthlyConsumption);
    } else {
      localStorage.removeItem("appliances");
      localStorage.removeItem("totalDailyConsumption");
      localStorage.removeItem("totalMonthlyConsumption");
    }
  }, [appliances]);

  const addAppliance = () => {
    if (newAppliance.name && newAppliance.power && newAppliance.usage) {
      const updatedAppliances = [...appliances, newAppliance];
      setAppliances(updatedAppliances);
      setNewAppliance({ name: "", power: "", usage: "" });
    }
  };

  const editAppliance = (index) => {
    const applianceToEdit = appliances[index];
    setNewAppliance(applianceToEdit);
    setEditingIndex(index);
  };

  const updateAppliance = () => {
    if (newAppliance.name && newAppliance.power && newAppliance.usage) {
      const updatedAppliances = [...appliances];
      updatedAppliances[editingIndex] = newAppliance;
      setAppliances(updatedAppliances);
      setNewAppliance({ name: "", power: "", usage: "" });
      setEditingIndex(null);
    }
  };

  const deleteAppliance = (index) => {
    const updatedAppliances = appliances.filter((_, i) => i !== index);
    setAppliances(updatedAppliances);
  };

  const calculateTotalConsumption = (timeframe) => {
    return appliances.reduce((total, appliance) => {
      const dailyConsumption = (appliance.power * appliance.usage) / 1000;
      return total + dailyConsumption;
    }, 0);
  };

  return (
    <div className="appliance-management-container">
      <h2>Appliance Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingIndex !== null ? updateAppliance() : addAppliance();
        }}
        className="appliance-management-form"
      >
        <input
          type="text"
          placeholder="Appliance Name"
          value={newAppliance.name}
          onChange={(e) => setNewAppliance({ ...newAppliance, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Power Rating (W)"
          value={newAppliance.power}
          onChange={(e) => setNewAppliance({ ...newAppliance, power: e.target.value })}
        />
        <input
          type="number"
          placeholder="Usage Time (hrs/day)"
          value={newAppliance.usage}
          onChange={(e) => setNewAppliance({ ...newAppliance, usage: e.target.value })}
        />
        <button type="submit">
          {editingIndex !== null ? "Update Appliance" : "Add Appliance"}
        </button>
      </form>

      <h3>Appliances List</h3>
      <ul className="appliance-list">
        {appliances.map((appliance, index) => (
          <li key={index}>
            {appliance.name} - {appliance.power}W - {appliance.usage}hrs/day
            <div>
              <button className="edit" onClick={() => editAppliance(index)}>Edit</button>
              <button onClick={() => deleteAppliance(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplianceManagement;
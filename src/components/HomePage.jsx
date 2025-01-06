import React from "react"; 
import { useNavigate } from "react-router-dom";
import './HomePage.css'; // Import the CSS for styling

const HomePage = () => {
    const navigate = useNavigate();

    // Function to format values with up to 3 decimals
    const formatConsumption = (value) => {
        return parseFloat(value).toFixed(3);
    };

    return (
        <div className="home-page-container">
            <h1>Smart Energy Usage Warning System</h1>
            
            <div className="button-group">
                <button onClick={() => navigate("/live-readings")}>Smart Meter Readings</button>
                <button onClick={() => navigate("/smart-plug")}>Smart Plug</button>
                <button onClick={() => navigate("/appliance-management")}>Manage Appliances</button>
                <button onClick={() => navigate("/inverter-details")}>Inverter Details</button>
                <button onClick={() => navigate("/billing")}>Billing</button>
                <button onClick={() => navigate("/report")}>Generate Report</button> {/* New Report Button */}
            </div>

            <div className="energy-consumption">
                <h2>Total Energy Consumption</h2>
                <p><strong>Daily Consumption:</strong> {formatConsumption(localStorage.getItem("totalDailyConsumption") || 0)} kWh</p>
                <p><strong>Monthly Consumption:</strong> {formatConsumption(localStorage.getItem("totalMonthlyConsumption") || 0)} kWh</p>
            </div>
        </div>
    );
};

export default HomePage;

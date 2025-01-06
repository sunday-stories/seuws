import React, { useState, useEffect } from 'react';
import { fetchReadings } from '../services/api';
import './LiveView.css';

const LiveView = () => {
    const [readings, setReadings] = useState({
        voltage: 0,
        current: 0,
        power: 0,
        energy: 0,
    });
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null); // State for the warning message

    useEffect(() => {
        const getReadings = async () => {
            try {
                const data = await fetchReadings();
                setReadings(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch readings. Please check the ESP32 connection.');
            }
        };

        // Fetch readings every second
        const interval = setInterval(getReadings, 1000);
        return () => clearInterval(interval);
    }, []);

    // Compare live reading with total daily consumption
    useEffect(() => {
        const totalDailyConsumption = localStorage.getItem("totalDailyConsumption") || 0;

        if (readings.energy > totalDailyConsumption) {
            setWarning("Warning: Smart meter reading exceeds the total daily energy usage!");
        } else {
            setWarning(null); // Reset the warning if condition is normal
        }
    }, [readings]);

    return (
        <div className="live-view-container">
            <h2>Live Energy Readings</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="readings-card">
                    <p><strong>Voltage:</strong> {readings.voltage} V</p>
                    <p><strong>Current:</strong> {readings.current} A</p>
                    <p><strong>Power:</strong> {readings.power} W</p>
                    <p><strong>Energy:</strong> {readings.energy} kWh</p>
                </div>
            )}

            {/* Display the warning if the reading exceeds the total daily consumption */}
            {warning && (
                <div className="warning-message">
                    <strong>{warning}</strong>
                </div>
            )}
        </div>
    );
};

export default LiveView;
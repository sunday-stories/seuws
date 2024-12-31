import React, { useState, useEffect } from 'react';
import { fetchReadings } from '../services/api';

const LiveView = () => {
    const [readings, setReadings] = useState({
        voltage: 0,
        current: 0,
        power: 0,
        energy: 0,
    });
    const [error, setError] = useState(null);

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

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Live Energy Readings</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <p><strong>Voltage:</strong> {readings.voltage} V</p>
                    <p><strong>Current:</strong> {readings.current} A</p>
                    <p><strong>Power:</strong> {readings.power} W</p>
                    <p><strong>Energy:</strong> {readings.energy} kWh</p>
                </div>
            )}
        </div>
    );
};

export default LiveView;

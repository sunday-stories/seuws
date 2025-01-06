import React, { useState, useEffect } from "react";
import "./InverterDetails.css"; // Import the CSS for styling

const InverterDetails = () => {
    const [batteryCapacity, setBatteryCapacity] = useState(localStorage.getItem("batteryCapacity") || ""); // Battery capacity in Ah
    const [inverterCapacity, setInverterCapacity] = useState(localStorage.getItem("inverterCapacity") || ""); // Inverter capacity in Watts
    const [devices, setDevices] = useState(JSON.parse(localStorage.getItem("devices")) || []); // List of connected devices
    const [deviceName, setDeviceName] = useState(""); // Name of the new device
    const [devicePower, setDevicePower] = useState(""); // Power rating of the new device
    const [backupTime, setBackupTime] = useState(null); // Calculated backup time

    // Save battery capacity and inverter capacity to localStorage
    useEffect(() => {
        localStorage.setItem("batteryCapacity", batteryCapacity);
        localStorage.setItem("inverterCapacity", inverterCapacity);
        localStorage.setItem("devices", JSON.stringify(devices));
    }, [batteryCapacity, inverterCapacity, devices]);

    // Add a new device to the list
    const addDevice = () => {
        if (deviceName && devicePower) {
            const newDevice = { name: deviceName, power: parseFloat(devicePower) };
            setDevices([...devices, newDevice]);
            setDeviceName("");
            setDevicePower("");
        }
    };

    // Delete a device from the list
    const deleteDevice = (index) => {
        const updatedDevices = devices.filter((_, i) => i !== index);
        setDevices(updatedDevices);
    };

    // Edit a device's details
    const editDevice = (index) => {
        const deviceToEdit = devices[index];
        setDeviceName(deviceToEdit.name);
        setDevicePower(deviceToEdit.power);
        deleteDevice(index); // Remove the old entry to replace it with the updated one
    };

    // Calculate the total backup time
    const calculateBackupTime = () => {
        const totalPower = devices.reduce((sum, device) => sum + device.power, 0);
        if (batteryCapacity && inverterCapacity && totalPower > 0) {
            const batteryWh = parseFloat(batteryCapacity) * 12; // Assuming 12V battery
            const runtime = batteryWh / Math.min(totalPower, inverterCapacity); // Backup time in hours
            setBackupTime(runtime.toFixed(2)); // Display runtime with 2 decimal places
        } else {
            setBackupTime("Invalid input! Ensure all fields are filled correctly.");
        }
    };

    return (
        <div className="inverter-details-container">
            <h1>Inverter Details</h1>

            {/* Input for battery capacity */}
            <label>
                Battery Capacity (Ah):
                <input
                    type="number"
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    placeholder="Enter battery capacity"
                />
            </label>

            {/* Input for inverter capacity */}
            <label>
                Inverter Capacity (W):
                <input
                    type="number"
                    value={inverterCapacity}
                    onChange={(e) => setInverterCapacity(e.target.value)}
                    placeholder="Enter inverter capacity"
                />
            </label>

            {/* Input for adding devices */}
            <div className="device-input">
                <label>
                    Device Name:
                    <input
                        type="text"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        placeholder="Enter device name"
                    />
                </label>
                <label>
                    Device Power (W):
                    <input
                        type="number"
                        value={devicePower}
                        onChange={(e) => setDevicePower(e.target.value)}
                        placeholder="Enter device power"
                    />
                </label>
                <button onClick={addDevice}>Add Device</button>
            </div>

            {/* Display list of devices */}
            <div className="devices-list">
                <h3>Connected Devices:</h3>
                {devices.length > 0 ? (
                    devices.map((device, index) => (
                        <div key={index} className="device-item">
                            <p>
                                <strong>{device.name}:</strong> {device.power} W
                            </p>
                            <button onClick={() => editDevice(index)}>Edit</button>
                            <button onClick={() => deleteDevice(index)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No devices added yet.</p>
                )}
            </div>

            {/* Calculate and display backup time */}
            <button onClick={calculateBackupTime} className="calculate-button">
                Calculate Backup Time
            </button>
            {backupTime && (
                <div className="backup-time">
                    <h2>Backup Time:</h2>
                    <p>{backupTime} hours</p>
                </div>
            )}
        </div>
    );
};

export default InverterDetails;
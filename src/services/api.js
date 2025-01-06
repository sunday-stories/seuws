export const fetchReadings = async () => {
    const response = await fetch('http://192.168.59.189/readings'); // Replace <ESP32_IP> with the actual IP
    if (!response.ok) throw new Error("Failed to fetch readings");
    return await response.json();
};
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LiveView from "./components/LiveView";
import SmartPlugView from "./components/SmartPlugView";
import ApplianceManagement from "./components/ApplianceManagement";
import InverterDetails from "./components/InverterDetails"; // Import the new InverterDetails component
import Billing from "./components/Billing"; // Import the new Billing component
import Report from "./components/Report"; // Import the new Report component

const App = () => {
  return (
    <Router basename="/seuws">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live-readings" element={<LiveView />} />
        <Route path="/smart-plug" element={<SmartPlugView />} />
        <Route path="/appliance-management" element={<ApplianceManagement />} />
        <Route path="/inverter-details" element={<InverterDetails />} /> {/* Existing route */}
        <Route path="/billing" element={<Billing />} /> {/* New route for Billing */}
        <Route path="/report" element={<Report />} /> {/* New route for Report */}
      </Routes>
    </Router>
  );
};

export default App;

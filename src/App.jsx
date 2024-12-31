import React from 'react';
import LiveView from './components/LiveView';

function App() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
            <h1>Smart Energy Usage Warning System</h1>
            <LiveView />
        </div>
    );
}

export default App;

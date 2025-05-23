import React, { useState } from 'react';
import MapComponent from './MapComponent';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 ${theme}`}>
      <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-indigo-900 dark:text-white">
        Interactive Map Dashboard
      </h1>
      <div className="w-full max-w-7xl rounded-2xl shadow-2xl overflow-hidden">
        <MapComponent theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
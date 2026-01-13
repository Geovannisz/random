import React, { useState, useEffect } from 'react';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-2xl font-mono text-blue-400">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-xs text-gray-500">
        {time.toLocaleDateString()}
      </div>
    </div>
  );
};

export default ClockWidget;

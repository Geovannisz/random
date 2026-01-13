import React from 'react';
import { Bot } from 'lucide-react';

const DiscordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
        <Bot size={64} className="text-indigo-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Discord Bot Manager</h2>
        <p className="text-gray-400 max-w-md">
            This module will control the Discord bot settings and display server statistics.
            (Placeholder)
        </p>
    </div>
  );
};

export default DiscordPage;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Cpu } from 'lucide-react';

const RavenPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Raven. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('raven_api_url') || '');
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const saveApiUrl = (url) => {
      setApiUrl(url);
      localStorage.setItem('raven_api_url', url);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      if (apiUrl) {
          // Actual Fetch to Flowise or Local API
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: input })
          });

          const data = await response.json();
          // Assuming Flowise returns { text: "response" } or similar
          const replyText = data.text || data.message || JSON.stringify(data);

          setMessages(prev => [...prev, { role: 'assistant', content: replyText }]);

      } else {
          // Mock Mode
          setTimeout(() => {
              setMessages(prev => [...prev, { role: 'assistant', content: `[MOCK] I received: "${userMessage.content}". (Set API URL to connect to real Raven)` }]);
              setLoading(false);
          }, 1000);
          return; // Exit early for mock
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Is the local API running?` }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-purple-400 flex items-center gap-2">
            <Cpu /> Raven AI
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-gray-800 rounded hover:bg-gray-700 text-gray-300"
            title="API Settings"
          >
            <Settings size={20} />
          </button>
      </div>

      {showSettings && (
          <div className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
              <label className="block text-sm font-medium mb-1 text-gray-300">Flowise/Local API URL</label>
              <input
                type="text"
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                placeholder="http://localhost:3000/api/v1/prediction/..."
                value={apiUrl}
                onChange={(e) => saveApiUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">Leave empty to use Mock Mode.</p>
          </div>
      )}

      <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
                 <div className="bg-gray-800 p-3 rounded-lg rounded-bl-none text-gray-400 italic">
                     Thinking...
                 </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Ask Raven something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RavenPage;

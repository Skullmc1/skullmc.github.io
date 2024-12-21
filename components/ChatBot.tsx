'use client';

import { useState, FormEvent } from 'react';

interface ChatMessage {
  role: string;
  content: string;
  timestamp: Date;
}

function ChatBot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { 
      role: 'user', 
      content: message,
      timestamp: new Date()
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-700">
      {/* Chat header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">AI</span>
        </div>
        <div>
          <h3 className="font-semibold text-white">AI Assistant</h3>
          <p className="text-xs text-gray-400">
            {isLoading ? 'Typing...' : 'Online'}
          </p>
        </div>
      </div>

      {/* Chat history */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
        {chatHistory.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`relative max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-100'
              } ${
                msg.role === 'user'
                  ? 'chat-bubble-right'
                  : 'chat-bubble-left'
              }`}
            >
              {msg.content}
            </div>
            <span className="text-xs text-gray-500 mt-1 px-2">
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="relative bg-gray-800 text-gray-100 rounded-2xl px-4 py-2 chat-bubble-left">
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-full bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-blue-500 text-white rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors w-12 h-12 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatBot; 
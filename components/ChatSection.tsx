'use client';

import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('./ChatBot'), {
  ssr: false,
  loading: () => <p>Loading chat...</p>
});

const ChatSection = () => {
  return (
    <div id="chat" className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">AI Chatbot</h2>
      <ChatBot />
    </div>
  );
};

export default ChatSection; 
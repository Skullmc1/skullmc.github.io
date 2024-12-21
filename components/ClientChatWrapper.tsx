'use client';

import dynamic from 'next/dynamic';

const ChatSection = dynamic(() => import('./ChatSection'), {
  ssr: false,
  loading: () => <p>Loading chat section...</p>
});

export default function ClientChatWrapper() {
  return <ChatSection />;
} 
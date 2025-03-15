
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

const Chat = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      <Header />
      
      <main className="pt-20 pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Chat with Mindful</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Share your thoughts and feelings in a safe, private space. Our AI companion is here to listen,
              provide support, and guide you toward better mental wellbeing.
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default Chat;

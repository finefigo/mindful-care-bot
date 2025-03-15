
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your mental wellness companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('anxious') || input.toLowerCase().includes('stressed')) {
        response = "I notice you're feeling anxious. Let's try a quick breathing exercise to help calm your mind. Would you like to try that now?";
      } else if (input.toLowerCase().includes('sad') || input.toLowerCase().includes('depressed')) {
        response = "I'm sorry to hear you're feeling down. Remember that it's okay to have these feelings. Would you like to talk more about what's troubling you or would you prefer some mood-lifting activities?";
      } else if (input.toLowerCase().includes('happy') || input.toLowerCase().includes('good')) {
        response = "I'm glad you're feeling well today! It's wonderful to hear that. What positive things have happened recently that you'd like to share?";
      } else {
        response = "Thank you for sharing. How long have you been feeling this way? I'm here to listen and help you navigate these emotions.";
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-3xl mx-auto">
      <div className="relative flex-1 overflow-y-auto px-4 py-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob w-96 h-96 bg-mindful-100 top-20 -left-48 opacity-50"></div>
          <div className="blob w-96 h-96 bg-calm-100 bottom-20 -right-48 opacity-50"></div>
        </div>
        
        <div className="space-y-6 relative z-10">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'max-w-[80%] flex',
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              )}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindful-500 to-calm-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
              )}
              
              <div
                className={cn(
                  'rounded-2xl px-4 py-3 shadow-sm',
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-mindful-500 to-calm-500 text-white ml-2'
                    : 'bg-white/80 backdrop-blur-sm border border-neutral-200'
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div
                  className={cn(
                    'text-xs mt-1 opacity-70',
                    message.sender === 'user' ? 'text-neutral-100' : 'text-neutral-500'
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                  <User className="w-4 h-4 text-neutral-600" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mindful-500 to-calm-500 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <span className="text-xs font-bold text-white">AI</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-neutral-200">
                <div className="loading-dots">
                  <span className="inline-block w-2 h-2 rounded-full bg-neutral-400 mr-1"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-neutral-400 mr-1"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-neutral-400"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-neutral-200 p-4 backdrop-blur-sm bg-white/80">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleRecording}
            className={cn(
              'p-2 rounded-full transition-colors',
              isRecording
                ? 'bg-red-100 text-red-500'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            )}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-1 py-2 px-4 bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-mindful-300 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={cn(
              'p-2 rounded-full',
              !input.trim()
                ? 'bg-neutral-200 text-neutral-400'
                : 'bg-gradient-to-r from-mindful-500 to-calm-500 text-white hover:from-mindful-600 hover:to-calm-600'
            )}
            aria-label="Send message"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

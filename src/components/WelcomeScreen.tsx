
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomeScreen = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  const welcomeText = "Your personal mental wellness companion";
  
  useEffect(() => {
    if (textIndex < welcomeText.length && isTyping) {
      const timeout = setTimeout(() => {
        setAnimatedText(welcomeText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 70);
      
      return () => clearTimeout(timeout);
    } else if (textIndex === welcomeText.length) {
      setIsTyping(false);
    }
  }, [textIndex, isTyping, welcomeText]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Background Blobs */}
      <div className="blob w-96 h-96 bg-mindful-200 top-10 -left-48 md:left-0"></div>
      <div className="blob w-96 h-96 bg-calm-200 bottom-10 -right-48 md:right-0"></div>
      
      <div className="max-w-3xl w-full flex flex-col items-center text-center z-10 animate-fade-in">
        <div className="mb-4 flex space-x-2">
          <span className="inline-block px-3 py-1 bg-mindful-100 text-mindful-800 rounded-full text-xs font-medium">
            Mental Wellness
          </span>
          <span className="inline-block px-3 py-1 bg-calm-100 text-calm-800 rounded-full text-xs font-medium">
            AI-Powered
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-mindful-700 to-calm-600">
          Mindful
        </h1>
        
        <p className="text-xl md:text-2xl font-light text-neutral-700 mb-8 h-8">
          {animatedText}
          <span className={`inline-block w-1 h-5 ml-1 bg-mindful-500 ${!isTyping ? 'opacity-0' : 'animate-pulse'}`}></span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-mindful-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-mindful-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-800">Daily Check-ins</h3>
            <p className="text-sm text-neutral-600">Track your mood and mental state with AI-powered analysis</p>
          </div>
          
          <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-calm-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Brain className="w-6 h-6 text-calm-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-800">Guided Exercises</h3>
            <p className="text-sm text-neutral-600">Interactive breathing and meditation exercises</p>
          </div>
          
          <div className="glass-panel p-6 transform transition-transform hover:scale-105 hover:shadow-xl">
            <div className="w-12 h-12 bg-mindful-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-mindful-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-neutral-800">Wellness Resources</h3>
            <p className="text-sm text-neutral-600">Connect with mental health professionals and resources</p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/chat')} 
          className="group px-8 py-6 bg-gradient-to-r from-mindful-500 to-calm-500 hover:from-mindful-600 hover:to-calm-600 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <span className="mr-2">Get Started</span>
          <ArrowRight className="inline-block transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

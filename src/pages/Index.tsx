
import React, { useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import MoodTracker from '@/components/MoodTracker';
import Header from '@/components/Header';

const Index = () => {
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
      
      <main className="pt-20 pb-16">
        {/* Welcome Section */}
        <section className="py-10">
          <WelcomeScreen />
        </section>
        
        {/* Daily Check-in Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Daily Mood Check-in</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Track your emotional state and mental wellbeing with our AI-powered mood analysis.
                Regular check-ins help you understand your patterns and improve your mental health.
              </p>
            </div>
            
            <MoodTracker />
          </div>
        </section>
      </main>
      
      <footer className="border-t border-neutral-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Mindful. All rights reserved. 
          </p>
          <p className="text-neutral-400 text-xs mt-2">
            Mindful is designed to support mental wellbeing but is not a replacement for professional mental health care.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

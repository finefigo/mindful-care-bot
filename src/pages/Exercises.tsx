
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import BreathingExercise from '@/components/BreathingExercise';

const Exercises = () => {
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
      
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Wellness Exercises</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Practice these guided exercises to reduce stress, improve focus, and 
              enhance your overall mental wellbeing.
            </p>
          </div>
          
          <BreathingExercise />
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">More Exercises Coming Soon</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We're developing additional guided exercises including mindfulness meditation, 
              progressive muscle relaxation, and visualization techniques.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-neutral-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} Mindful. All rights reserved. 
          </p>
          <p className="text-neutral-400 text-xs mt-2">
            Practice these exercises regularly for best results. If you experience any discomfort, 
            please stop and consult a healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Exercises;

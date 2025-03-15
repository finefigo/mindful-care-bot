
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

type ExerciseStep = 'inhale' | 'hold' | 'exhale' | 'rest';

interface ExerciseState {
  step: ExerciseStep;
  seconds: number;
  totalSeconds: number;
}

const exercisePattern = [
  { step: 'inhale', duration: 4, instruction: 'Breathe in slowly' },
  { step: 'hold', duration: 4, instruction: 'Hold your breath' },
  { step: 'exhale', duration: 6, instruction: 'Breathe out slowly' },
  { step: 'rest', duration: 2, instruction: 'Pause' },
] as const;

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [exercise, setExercise] = useState<ExerciseState>({
    step: 'inhale',
    seconds: exercisePattern[0].duration,
    totalSeconds: 0,
  });
  const [cycles, setCycles] = useState(0);
  const [patternIndex, setPatternIndex] = useState(0);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setExercise((prev) => {
          // Update seconds
          const seconds = prev.seconds - 1;
          
          // Check if we need to move to next step
          if (seconds <= 0) {
            // Calculate next pattern index
            const nextPatternIndex = (patternIndex + 1) % exercisePattern.length;
            setPatternIndex(nextPatternIndex);
            
            // Update cycle count when completing a full cycle
            if (nextPatternIndex === 0) {
              setCycles((c) => c + 1);
            }
            
            // Return next state with new step
            return {
              step: exercisePattern[nextPatternIndex].step as ExerciseStep,
              seconds: exercisePattern[nextPatternIndex].duration,
              totalSeconds: prev.totalSeconds + 1,
            };
          }
          
          // Continue same step with decremented seconds
          return {
            ...prev,
            seconds,
            totalSeconds: prev.totalSeconds + 1,
          };
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, patternIndex]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPatternIndex(0);
    setCycles(0);
    setExercise({
      step: 'inhale',
      seconds: exercisePattern[0].duration,
      totalSeconds: 0,
    });
  };

  const getCurrentInstruction = () => {
    return exercisePattern[patternIndex].instruction;
  };

  const getProgressPercentage = () => {
    const total = exercisePattern[patternIndex].duration;
    const progress = exercise.seconds;
    return 100 - ((progress / total) * 100);
  };

  // Animation states for the circle
  const circleAnimation = {
    inhale: 'animate-breathe-in',
    hold: '',
    exhale: 'animate-breathe-out',
    rest: '',
  };

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2 text-center">Breathing Exercise</h2>
      <p className="text-neutral-600 mb-8 text-center">
        Take a moment to relax with this guided breathing exercise
      </p>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-64 h-64 mb-6">
          {/* Ripple Effect */}
          <div className={`absolute inset-0 rounded-full ${isActive ? 'animate-ripple' : ''} bg-mindful-100 opacity-70`}></div>
          
          {/* Progress Circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * getProgressPercentage()) / 100}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Breathing Circle */}
          <div 
            className={`absolute inset-0 flex items-center justify-center ${circleAnimation[exercise.step]}`}
          >
            <div className="w-32 h-32 bg-gradient-to-r from-mindful-300 to-calm-300 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-light text-white">{exercise.seconds}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-2">{getCurrentInstruction()}</h3>
        <p className="text-neutral-500 mb-4">Completed cycles: {cycles}</p>
        
        <div className="flex space-x-4">
          <Button
            onClick={toggleExercise}
            className="bg-gradient-to-r from-mindful-500 to-calm-500 hover:from-mindful-600 hover:to-calm-600 text-white rounded-full px-6"
          >
            {isActive ? <Pause className="mr-2" size={18} /> : <Play className="mr-2" size={18} />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            onClick={resetExercise}
            variant="outline"
            className="rounded-full px-6"
          >
            <RefreshCw className="mr-2" size={18} />
            Reset
          </Button>
        </div>
      </div>
      
      <div className="bg-neutral-50 p-4 rounded-xl">
        <h4 className="font-medium mb-2">Benefits of Deep Breathing</h4>
        <ul className="text-sm text-neutral-600 space-y-2">
          <li>• Reduces stress and anxiety</li>
          <li>• Lowers blood pressure</li>
          <li>• Improves focus and concentration</li>
          <li>• Helps you manage emotions</li>
          <li>• Promotes better sleep quality</li>
        </ul>
      </div>
    </div>
  );
};

export default BreathingExercise;

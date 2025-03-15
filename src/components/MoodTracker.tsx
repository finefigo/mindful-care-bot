
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'low' | 'bad';

const moodEmojis: Record<Mood, string> = {
  great: '😄',
  good: '🙂',
  okay: '😐',
  low: '😕',
  bad: '😢',
};

const moodColors: Record<Mood, string> = {
  great: 'bg-green-500',
  good: 'bg-green-400',
  okay: 'bg-blue-400',
  low: 'bg-orange-400',
  bad: 'bg-red-400',
};

const moodLabels: Record<Mood, string> = {
  great: 'Great',
  good: 'Good',
  okay: 'Okay',
  low: 'Low',
  bad: 'Bad',
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleMoodSelection = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      console.log('Mood submitted:', { mood: selectedMood, note: moodNote });
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setMoodNote('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="glass-panel p-8 max-w-2xl mx-auto animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p className="text-neutral-600 mb-6">
            Your mood check-in has been recorded. Tracking your moods regularly helps you understand your emotional patterns.
          </p>
          <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
            <p className="font-medium mb-2">Your check-in:</p>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">{moodEmojis[selectedMood!]}</span>
              <span className="font-medium">{moodLabels[selectedMood!]}</span>
            </div>
            {moodNote && <p className="text-sm italic">"{moodNote}"</p>}
          </div>
          <Button 
            onClick={handleReset} 
            className="bg-gradient-to-r from-mindful-500 to-calm-500 hover:from-mindful-600 hover:to-calm-600 text-white"
          >
            New Check-in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-2 text-center">How are you feeling today?</h2>
      <p className="text-neutral-600 mb-8 text-center">Track your mood to gain insights into your emotional patterns</p>
      
      <div className="grid grid-cols-5 gap-2 mb-8">
        {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelection(mood)}
            className={`aspect-square p-4 rounded-xl transition-all duration-300 ${
              selectedMood === mood 
                ? `ring-2 ring-offset-2 ring-${moodColors[mood].split('-')[1]}-400 transform scale-105` 
                : 'hover:bg-neutral-100'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">{moodEmojis[mood]}</span>
              <span className={`text-xs font-medium ${selectedMood === mood ? 'text-neutral-800' : 'text-neutral-500'}`}>
                {moodLabels[mood]}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mb-8">
        <label htmlFor="mood-note" className="block text-sm font-medium text-neutral-700 mb-2">
          What's influencing your mood? (optional)
        </label>
        <textarea
          id="mood-note"
          rows={3}
          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-mindful-300 focus:border-transparent"
          placeholder="Share your thoughts here..."
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
        />
      </div>
      
      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="group px-6 py-2 bg-gradient-to-r from-mindful-500 to-calm-500 hover:from-mindful-600 hover:to-calm-600 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">Save Mood</span>
          <ArrowRight className="inline-block transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default MoodTracker;

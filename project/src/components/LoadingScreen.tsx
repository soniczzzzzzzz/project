import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { CheckCircle, MapPin, Zap } from 'lucide-react';

interface LoadingScreenProps {
  user: User;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: `Hello, ${user.name}! 👋`, icon: CheckCircle },
    { text: `Locating ${user.city}...`, icon: MapPin },
    { text: 'Fetching air quality data...', icon: Zap },
    { text: 'Analyzing pollution levels...', icon: CheckCircle },
    { text: 'Preparing your dashboard...', icon: CheckCircle },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  const currentStep = steps[step];
  const StepIcon = currentStep?.icon || CheckCircle;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30"></div>
      
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mb-6 animate-pulse shadow-xl">
            <StepIcon className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {currentStep?.text || 'Loading...'}
          </h2>
          
          <div className="w-80 bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600 text-lg font-semibold">{Math.round(progress)}%</p>
        </div>

        <div className="space-y-2">
          {steps.map((stepItem, index) => (
            <div
              key={index}
              className={`flex items-center justify-center gap-3 transition-all duration-300 ${
                index <= step ? 'text-green-600 opacity-100' : 'text-gray-400 opacity-50'
              }`}
            >
              {index <= step ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className="text-sm font-medium">{stepItem.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
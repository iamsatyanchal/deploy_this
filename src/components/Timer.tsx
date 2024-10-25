import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import useSound from 'use-sound';
import { cn } from '@/lib/utils';

interface TimerSettings {
  focusDuration: number;
  breakDuration: number;
  notifications: boolean;
  sound: boolean;
}

export function Timer({ settings }: { settings: TimerSettings }) {
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [playSound] = useSound('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (settings.sound) {
        playSound();
      }
      if (settings.notifications) {
        new Notification(isWorkMode ? "Break Time!" : "Focus Time!", {
          body: isWorkMode ? "Time for a break!" : "Let's get back to work!",
        });
      }
      setIsWorkMode(!isWorkMode);
      setTimeLeft(isWorkMode ? settings.breakDuration * 60 : settings.focusDuration * 60);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkMode, settings, playSound]);

  useEffect(() => {
    setTimeLeft(isWorkMode ? settings.focusDuration * 60 : settings.breakDuration * 60);
  }, [settings.focusDuration, settings.breakDuration, isWorkMode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkMode ? settings.focusDuration * 60 : settings.breakDuration * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">
          {isWorkMode ? "Focus Time" : "Break Time"}
        </h2>
        <p className="text-neutral-600">
          {isWorkMode ? 
            (isRunning ? "Stay focused!" : "Ready to focus?") : 
            (isRunning ? "Take a good rest!" : "Time for a break!")
          }
        </p>
      </div>

      <div className="text-center space-y-8">
        <div className={cn(
          "text-7xl font-mono font-bold tracking-tight transition-colors",
          isWorkMode ? "text-neutral-900" : "text-neutral-600"
        )}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant={isWorkMode ? "default" : "secondary"}
            size="lg"
            onClick={toggleTimer}
            className="w-32 h-12 rounded-full"
          >
            {isRunning ? 
              <Pause className="mr-2 h-4 w-4" /> : 
              <Play className="mr-2 h-4 w-4" />
            }
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={resetTimer}
            className="w-12 h-12 rounded-full p-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
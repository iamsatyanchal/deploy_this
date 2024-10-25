import React, { useState } from 'react';
import { Bell, Clock, Moon, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface TimerSettings {
  focusDuration: number;
  breakDuration: number;
  notifications: boolean;
  sound: boolean;
}

export function Settings({ onSettingsChange }: { onSettingsChange: (settings: TimerSettings) => void }) {
  const [settings, setSettings] = useState<TimerSettings>({
    focusDuration: 25,
    breakDuration: 5,
    notifications: true,
    sound: true,
  });

  const toggleSetting = (key: keyof TimerSettings) => {
    if (typeof settings[key] === 'boolean') {
      const newSettings = { ...settings, [key]: !settings[key] };
      setSettings(newSettings);
      onSettingsChange(newSettings);
    }
  };

  const adjustDuration = (key: 'focusDuration' | 'breakDuration', increment: boolean) => {
    const newValue = increment 
      ? settings[key] + 5 
      : Math.max(5, settings[key] - 5);
    
    const newSettings = { ...settings, [key]: newValue };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-neutral-400" />
              <span>Focus Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => adjustDuration('focusDuration', false)}
              >-</Button>
              <span className="w-16 text-center">{settings.focusDuration} min</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => adjustDuration('focusDuration', true)}
              >+</Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-neutral-400" />
              <span>Break Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => adjustDuration('breakDuration', false)}
              >-</Button>
              <span className="w-16 text-center">{settings.breakDuration} min</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => adjustDuration('breakDuration', true)}
              >+</Button>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-between h-auto p-4"
          onClick={() => toggleSetting('notifications')}
        >
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-neutral-400" />
            <span>Notifications</span>
          </div>
          <span className="text-neutral-600">{settings.notifications ? 'On' : 'Off'}</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-between h-auto p-4"
          onClick={() => toggleSetting('sound')}
        >
          <div className="flex items-center gap-3">
            <Volume2 className="h-5 w-5 text-neutral-400" />
            <span>Sound</span>
          </div>
          <span className="text-neutral-600">{settings.sound ? 'On' : 'Off'}</span>
        </Button>
      </div>
    </div>
  );
}
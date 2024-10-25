import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { Settings } from './components/Settings';
import { Tasks } from './components/Tasks';
import { BottomNav } from './components/BottomNav';

export type Tab = 'timer' | 'tasks' | 'stats' | 'settings';

interface TimerSettings {
  focusDuration: number;
  breakDuration: number;
  notifications: boolean;
  sound: boolean;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('timer');
  const [settings, setSettings] = useState<TimerSettings>({
    focusDuration: 25,
    breakDuration: 5,
    notifications: true,
    sound: true,
  });

  const handleSettingsChange = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    if (newSettings.notifications) {
      Notification.requestPermission();
    }
  };

  return (
    <div className="h-[100dvh] bg-neutral-50 flex flex-col">
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'timer' && <Timer settings={settings} />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'stats' && <Stats />}
        {activeTab === 'settings' && <Settings onSettingsChange={handleSettingsChange} />}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
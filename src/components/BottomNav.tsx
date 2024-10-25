import React from 'react';
import { Timer, ListTodo, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tab } from '../App';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'timer' as const, icon: Timer, label: 'Timer' },
    { id: 'tasks' as const, icon: ListTodo, label: 'Tasks' },
    { id: 'stats' as const, icon: BarChart2, label: 'Stats' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-2">
      <div className="flex justify-between items-center">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
              activeTab === id ? "text-neutral-900" : "text-neutral-400"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
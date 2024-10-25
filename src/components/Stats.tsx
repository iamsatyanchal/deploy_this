import React from 'react';
import { Clock, Target, Zap } from 'lucide-react';

export function Stats() {
  const stats = [
    { icon: Clock, label: 'Focus Time', value: '2h 30m' },
    { icon: Target, label: 'Tasks Completed', value: '12' },
    { icon: Zap, label: 'Current Streak', value: '5 days' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Statistics</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white p-4 rounded-lg shadow-sm">
            <Icon className="h-5 w-5 text-neutral-400 mb-2" />
            <p className="text-sm text-neutral-600">{label}</p>
            <p className="text-2xl font-bold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
        <div className="space-y-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="flex items-center gap-2">
              <span className="w-8 text-sm text-neutral-600">{day}</span>
              <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neutral-900 rounded-full"
                  style={{ width: `${Math.random() * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
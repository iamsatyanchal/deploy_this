import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-neutral-900">Tasks</h1>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-200"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} size="icon" className="rounded-lg">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm"
          >
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => toggleTask(task.id)}
            >
              <Check className={cn(
                "h-4 w-4 transition-opacity",
                task.completed ? "opacity-100" : "opacity-0"
              )} />
            </Button>
            <span className={cn(
              "flex-1 text-neutral-900",
              task.completed && "line-through text-neutral-400"
            )}>
              {task.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-neutral-400 hover:text-red-500"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Edit3, Check, X } from 'lucide-react';

interface Note {
  id: number;
  text: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('pomodoro-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('pomodoro-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote.trim() }]);
      setNewNote('');
      setIsEditing(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <Edit3 size={20} />
          </button>
        )}
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
          />
          <button
            onClick={addNote}
            className="p-2 text-green-600 hover:text-green-700"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-red-600 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <span className="text-gray-700">{note.text}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="p-1 text-gray-400 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
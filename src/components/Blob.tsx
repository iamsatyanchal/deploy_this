import React from 'react';

interface BlobProps {
  isRunning: boolean;
  isWorkMode: boolean;
}

const Blob: React.FC<BlobProps> = ({ isRunning, isWorkMode }) => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div
        className={`
          absolute inset-0 rounded-full 
          ${isWorkMode ? 'bg-purple-400' : 'bg-pink-400'}
          transition-all duration-300 ease-in-out
          ${isRunning ? 'animate-blob' : ''}
        `}
      >
        <div className="absolute w-4 h-4 bg-white rounded-full left-1/4 top-1/3" />
        <div className="absolute w-4 h-4 bg-white rounded-full right-1/4 top-1/3" />
        <div
          className={`
            absolute w-8 h-8 border-4 border-white rounded-full
            left-1/2 top-1/2 -translate-x-1/2
            ${isWorkMode ? 'border-t-0' : 'border-b-0'}
          `}
        />
      </div>
    </div>
  );
};

export default Blob;
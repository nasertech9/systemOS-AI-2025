import React, { useState, useEffect } from 'react';

const bootLines = [
  "Initializing AURA OS v2.5...",
  "Loading kernel modules...",
  "Mounting virtual file system...",
  "Starting core services...",
  "Checking neural network integrity...",
  "Calibrating quantum processors...",
  "Syncing with global consciousness network...",
  "Establishing connection to AI core...",
  "Connection successful.",
  "Boot sequence complete. Welcome.",
];

const BootScreen: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, index * 350);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black font-roboto-mono text-green-400 p-4 overflow-hidden">
      <div className="w-full max-w-4xl h-full border-2 border-green-400/50 shadow-glow-green p-4 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-400/20 to-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 animate-scanline z-10"></div>
        <div className="relative z-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-orbitron animate-flicker">AURA</h1>
            <p className="text-sm">Artificial Unified Reactive Assistant</p>
          </div>
          <div id="boot-log">
            {lines.map((line, index) => (
              <p key={index} className="text-sm md:text-base">
                <span className="text-green-600 mr-2">&gt;</span>{line}
              </p>
            ))}
            {lines.length === bootLines.length && (
              <p className="text-white animate-pulse mt-4">
                <span className="text-green-600 mr-2">&gt;</span>_
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;

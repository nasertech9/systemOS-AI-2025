
import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import { useWindowManager } from '../context/WindowManagerContext';
import { APPS } from '../config/apps';

interface TaskbarProps {
  onLogout: () => void;
}

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="text-sm text-center">
            <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-xs">{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</div>
        </div>
    );
};

const Taskbar: React.FC<TaskbarProps> = ({ onLogout }) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { windows, focusWindow, toggleMinimize } = useWindowManager();

  const handleAppIconClick = (winId: string) => {
    const window = windows.find(w => w.id === winId);
    if(window) {
        if(window.isMinimized) {
            toggleMinimize(winId);
        } else {
            // Check if it's the currently focused window
            const maxZIndex = Math.max(...windows.map(w => w.zIndex));
            if(window.zIndex < maxZIndex) {
                focusWindow(winId);
            } else {
                toggleMinimize(winId);
            }
        }
    }
  };


  return (
    <>
      {isStartMenuOpen && <StartMenu onLogout={onLogout} closeMenu={() => setIsStartMenuOpen(false)} />}
      <footer className="absolute bottom-0 left-0 right-0 h-12 bg-black/50 backdrop-blur-lg border-t border-cyan-500/30 flex items-center px-2 z-50">
        <button
          onClick={() => setIsStartMenuOpen(prev => !prev)}
          className="p-2 rounded hover:bg-cyan-400/20 transition-colors"
        >
          <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        <div className="h-full border-l border-gray-500/50 mx-2"></div>
        
        <div className="flex-grow flex items-center space-x-2">
            {windows.map(win => {
                const appConfig = APPS.find(app => app.id === win.appId);
                const maxZIndex = Math.max(...windows.filter(w => !w.isMinimized).map(w => w.zIndex));
                const isActive = !win.isMinimized && win.zIndex === maxZIndex;

                return (
                    <button 
                        key={win.id}
                        onClick={() => handleAppIconClick(win.id)}
                        className={`h-9 w-9 p-1.5 rounded-md flex items-center justify-center transition-colors ${isActive ? 'bg-cyan-500/30' : 'hover:bg-white/10'}`}
                        title={win.title}
                    >
                        {appConfig?.icon}
                    </button>
                )
            })}
        </div>

        <div className="px-3">
          <Clock />
        </div>
      </footer>
    </>
  );
};

export default Taskbar;

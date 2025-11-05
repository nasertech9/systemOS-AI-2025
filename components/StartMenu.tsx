
import React, { useEffect, useRef } from 'react';
import { useWindowManager } from '../context/WindowManagerContext';
import { APPS } from '../config/apps';

interface StartMenuProps {
  onLogout: () => void;
  closeMenu: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onLogout, closeMenu }) => {
  const { openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);

  const handleAppClick = (appId: string) => {
    openWindow(appId);
    closeMenu();
  };

  return (
    <div
      ref={menuRef}
      className="absolute bottom-14 left-2 w-72 bg-black/70 backdrop-blur-xl border border-cyan-500/50 rounded-lg shadow-lg shadow-cyan-500/20 z-40 overflow-hidden"
    >
      <div className="p-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1.5 bg-gray-800/50 border border-cyan-700 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
        />
      </div>
      <div className="p-2 space-y-1">
        {APPS.map(app => (
          <button
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-cyan-400/20 transition-colors text-left"
          >
            <div className="w-8 h-8 flex-shrink-0">{app.icon}</div>
            <span>{app.title}</span>
          </button>
        ))}
      </div>
      <div className="border-t border-cyan-500/50 p-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-magenta-500/20 transition-colors text-left"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;

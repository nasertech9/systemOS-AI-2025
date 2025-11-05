import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { WindowInstance } from '../types';
import { APPS } from '../config/apps';

interface WindowManagerContextType {
  windows: WindowInstance[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowState: (id: string, updates: Partial<WindowInstance>) => void;
  getActiveWindow: () => WindowInstance | undefined;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);

  const getActiveWindow = useCallback(() => {
    if (windows.length === 0) return undefined;
    const nonMinimized = windows.filter(w => !w.isMinimized);
    if (nonMinimized.length === 0) return undefined;
    return nonMinimized.reduce((a, b) => a.zIndex > b.zIndex ? a : b);
  }, [windows]);

  const openWindow = useCallback((appId: string) => {
    const appConfig = APPS.find(app => app.id === appId);
    if (!appConfig) return;

    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const newWindow: WindowInstance = {
      id: `win-${Date.now()}`,
      appId: appConfig.id,
      title: appConfig.title,
      x: window.innerWidth / 2 - appConfig.defaultSize.width / 2 + (windows.length * 20),
      y: window.innerHeight / 2 - appConfig.defaultSize.height / 2 + (windows.length * 20),
      width: appConfig.defaultSize.width,
      height: appConfig.defaultSize.height,
      zIndex: nextZIndex,
      isMinimized: false,
      isMaximized: false,
    };

    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    const windowToFocus = windows.find(win => win.id === id);
    if (!windowToFocus) return;

    if (windowToFocus.zIndex === getActiveWindow()?.zIndex && !windowToFocus.isMinimized) {
        return; // Already active, do nothing
    }

    setWindows(prev =>
      prev.map(win =>
        win.id === id
          ? { ...win, zIndex: nextZIndex, isMinimized: false }
          : win
      )
    );
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex, getActiveWindow]);
  
  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev => 
      prev.map(win => {
        if (win.id === id) {
          if (win.isMinimized) {
            // Un-minimizing brings it to front
            return { ...win, isMinimized: false, zIndex: nextZIndex };
          }
          return { ...win, isMinimized: true };
        }
        return win;
      })
    );
    if (windows.find(w => w.id === id)?.isMinimized) {
      setNextZIndex(prev => prev + 1);
    }
  }, [windows, nextZIndex]);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        const isCurrentlyMaximized = win.isMaximized;
        
        if (!isCurrentlyMaximized) {
          // Bring to front when maximizing
          focusWindow(id);
        }

        if (isCurrentlyMaximized) {
          // Restore
          return {
            ...win,
            isMaximized: false,
            x: win.prevX ?? win.x,
            y: win.prevY ?? win.y,
            width: win.prevWidth ?? win.width,
            height: win.prevHeight ?? win.height,
          };
        } else {
          // Maximize
          return {
            ...win,
            isMaximized: true,
            isMinimized: false,
            prevX: win.x,
            prevY: win.y,
            prevWidth: win.width,
            prevHeight: win.height,
            zIndex: nextZIndex, // Bring to front
          };
        }
      }
      return win;
    }));
     if (!windows.find(w => w.id === id)?.isMaximized) {
      setNextZIndex(prev => prev + 1);
    }
  }, [windows, nextZIndex, focusWindow]);
  
  const updateWindowState = useCallback((id: string, updates: Partial<WindowInstance>) => {
    setWindows(prev => prev.map(win => (win.id === id ? { ...win, ...updates } : win)));
  }, []);

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, toggleMinimize, toggleMaximize, updateWindowState, getActiveWindow }}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

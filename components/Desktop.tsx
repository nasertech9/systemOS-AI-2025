
import React from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import { useWindowManager } from '../context/WindowManagerContext';
import { APPS } from '../config/apps';

interface DesktopProps {
  onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const { windows, openWindow } = useWindowManager();

  return (
    <div className="h-screen w-screen overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?random=1')"}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <main className="relative h-full w-full">
        {/* Desktop Icons */}
        <div className="absolute top-0 left-0 p-4 flex flex-col items-start space-y-4">
          {APPS.map(app => (
            <DesktopIcon
              key={app.id}
              icon={app.icon}
              label={app.title}
              onDoubleClick={() => openWindow(app.id)}
            />
          ))}
        </div>

        {/* Windows */}
        {windows.map(win => {
            const AppContent = APPS.find(app => app.id === win.appId)?.component;
            if (win.isMinimized) return null;
            return AppContent ? (
              <Window key={win.id} window={win}>
                <AppContent onLogout={onLogout} />
              </Window>
            ) : null;
        })}
      </main>
      <Taskbar onLogout={onLogout} />
    </div>
  );
};

export default Desktop;

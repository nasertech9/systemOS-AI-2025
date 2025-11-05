import React, { ReactNode, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useWindowManager } from '../context/WindowManagerContext';
import type { WindowInstance } from '../types';
import { APPS } from '../config/apps';

interface WindowProps {
  window: WindowInstance;
  children: ReactNode;
}

const MinimizeIcon = () => <path d="M0 5h10v1H0z" />;
const MaximizeIcon = () => <path d="M0 1h10v1H0zm0 8h10v1H0zM1 1h1v8H1zm7 0h1v8H8zM1 1h8v1H1zm0 7h8v1H1z" />;
const RestoreIcon = () => <path d="M3 0h7v1H3zm0 9h7v1H3zM0 3h1v7H0zm9 0h1v7h-1zM0 3h7v1H0zm0 6h7v1H0zM1 1h1v2H1zm-1 2h2V1H0z" />;
const CloseIcon = () => <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />;


const Window: React.FC<WindowProps> = ({ window, children }) => {
  const { closeWindow, focusWindow, toggleMinimize, toggleMaximize, updateWindowState, getActiveWindow } = useWindowManager();

  const appConfig = APPS.find(app => app.id === window.appId);
  const minWidth = appConfig?.minSize?.width ?? 200;
  const minHeight = appConfig?.minSize?.height ?? 150;

  const isActive = getActiveWindow()?.id === window.id;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    updateWindowState(window.id, { x: window.x + info.offset.x, y: window.y + info.offset.y });
  };
  
  const handleResize = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    let newWidth = window.width + info.offset.x;
    let newHeight = window.height + info.offset.y;

    if (newWidth < minWidth) newWidth = minWidth;
    if (newHeight < minHeight) newHeight = minHeight;
    
    updateWindowState(window.id, { width: newWidth, height: newHeight });
  };

  const maximizedStyles = window.isMaximized ? {
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 3rem)',
    x: 0,
    y: 0,
  } : {};

  return (
    <motion.div
      drag={!window.isMaximized}
      dragMomentum={false}
      dragConstraints={{ top: 0, left: 0, right: document.documentElement.clientWidth - window.width, bottom: document.documentElement.clientHeight - window.height - 48}}
      onDragEnd={handleDragEnd}
      dragListener={false}
      onTapStart={() => focusWindow(window.id)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
          opacity: 1, 
          scale: 1,
          x: window.x,
          y: window.y,
          width: window.width,
          height: window.height,
           ...maximizedStyles,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15, type: 'tween' }}
      style={{
        position: 'absolute',
        zIndex: window.zIndex,
      }}
      className={`bg-black/50 backdrop-blur-xl border rounded-lg shadow-2xl flex flex-col transition-colors duration-200 ${isActive ? 'border-cyan-400/80 shadow-cyan-500/30' : 'border-gray-500/30 shadow-black/30'} ${window.isMaximized && 'rounded-none'}`}
    >
      <motion.div
        onPointerDown={(e) => {
          if (!window.isMaximized) {
             (e.target as HTMLElement).closest('.window-drag-handle')?.setPointerCapture(e.pointerId);
          }
        }}
        onDoubleClick={() => toggleMaximize(window.id)}
        className={`window-drag-handle h-8 flex-shrink-0 ${window.isMaximized ? 'rounded-none' : 'rounded-t-lg'} flex items-center justify-between px-2 select-none ${!window.isMaximized && 'cursor-move'}`}
      >
        <span className="text-sm font-bold text-cyan-200 truncate pr-2">{window.title}</span>
        <div className="flex items-center space-x-2">
            <button onClick={() => toggleMinimize(window.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors text-white"><svg fill="currentColor" width="10" height="10" viewBox="0 0 10 10"><MinimizeIcon/></svg></button>
            <button onClick={() => toggleMaximize(window.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors text-white"><svg fill="currentColor" width="10" height="10" viewBox="0 0 10 10">{window.isMaximized ? <RestoreIcon/> : <MaximizeIcon/>}</svg></button>
            <button onClick={() => closeWindow(window.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/80 transition-colors text-white"><svg width="10" height="10" viewBox="0 0 10 10"><CloseIcon/></svg></button>
        </div>
      </motion.div>
      <div className="flex-grow p-1 overflow-hidden relative">
        <div className="w-full h-full overflow-auto bg-black/30 rounded-sm">
          {children}
        </div>
      </div>

       {!window.isMaximized && (
         <motion.div
          drag="x"
          onDrag={handleResize}
          dragMomentum={false}
          dragConstraints={{left: 0, right: 0}}
          dragElastic={0}
          className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize z-10"
        />
       )}
    </motion.div>
  );
};

export default Window;

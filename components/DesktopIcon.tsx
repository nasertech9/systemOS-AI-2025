
import React from 'react';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onDoubleClick }) => {
  return (
    <button
      onDoubleClick={onDoubleClick}
      className="flex flex-col items-center justify-center p-2 rounded-lg w-24 h-24 text-white hover:bg-white/10 focus:bg-white/20 focus:outline-none transition-colors"
    >
      <div className="w-12 h-12 flex items-center justify-center text-cyan-300">
        {icon}
      </div>
      <span className="mt-2 text-xs text-center break-words">{label}</span>
    </button>
  );
};

export default DesktopIcon;

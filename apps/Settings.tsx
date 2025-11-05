
import React from 'react';
import { useSystemStats } from '../hooks/useSystemStats';
import SystemStatsChart from '../components/SystemStatsChart';

const Settings: React.FC = () => {
  const stats = useSystemStats();

  return (
    <div className="bg-gray-900/50 w-full h-full p-4 text-white rounded-b-lg">
      <h2 className="text-xl font-orbitron text-cyan-300 mb-4">System Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-40px)]">
        <div className="bg-black/30 rounded-lg border border-cyan-500/20">
          <SystemStatsChart data={stats.cpu} strokeColor="#06b6d4" fillColor="#06b6d4" title="CPU Usage" unit="%" />
        </div>
        <div className="bg-black/30 rounded-lg border border-cyan-500/20">
          <SystemStatsChart data={stats.memory} strokeColor="#8b5cf6" fillColor="#8b5cf6" title="Memory Usage" unit="%" />
        </div>
        <div className="bg-black/30 rounded-lg border border-cyan-500/20">
          <SystemStatsChart data={stats.disk} strokeColor="#10b981" fillColor="#10b981" title="Disk Activity" unit="%" />
        </div>
        <div className="bg-black/30 rounded-lg border border-cyan-500/20">
          <SystemStatsChart data={stats.network} strokeColor="#f59e0b" fillColor="#f59e0b" title="Network I/O" unit="%" />
        </div>
      </div>
    </div>
  );
};

export default Settings;

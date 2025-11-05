
import { useState, useEffect } from 'react';
import type { SystemStats } from '../types';

const MAX_HISTORY = 30;

const generateRandomData = () => ({
  cpu: Math.random() * 100,
  memory: Math.random() * 100,
  disk: Math.random() * 100,
  network: Math.random() * 100,
});

export const useSystemStats = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: Array(MAX_HISTORY).fill(0),
    memory: Array(MAX_HISTORY).fill(0),
    disk: Array(MAX_HISTORY).fill(0),
    network: Array(MAX_HISTORY).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { cpu, memory, disk, network } = generateRandomData();
      setStats(prevStats => ({
        cpu: [...prevStats.cpu.slice(1), cpu],
        memory: [...prevStats.memory.slice(1), memory],
        disk: [...prevStats.disk.slice(1), disk],
        network: [...prevStats.network.slice(1), network],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

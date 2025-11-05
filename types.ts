import React from 'react';

export interface AppConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
}

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  // Store previous dimensions for restoring from maximized state
  prevX?: number;
  prevY?: number;
  prevWidth?: number;
  prevHeight?: number;
}

export interface SystemStats {
  cpu: number[];
  memory: number[];
  disk: number[];
  network: number[];
}

import React from 'react';
import type { AppConfig } from '../types';
import Terminal from '../apps/Terminal';
import AIChat from '../apps/AIChat';
import Settings from '../apps/Settings';
import FileExplorer from '../apps/FileExplorer';
import Browser from '../apps/Browser';
import { TerminalIcon, ChatIcon, SettingsIcon, FolderIcon, BrowserIcon } from '../components/Icons';

export const APPS: AppConfig[] = [
  {
    id: 'terminal',
    title: 'Terminal',
    icon: <TerminalIcon className="w-8 h-8" />,
    component: Terminal,
    defaultSize: { width: 700, height: 450 },
    minSize: { width: 400, height: 250 },
  },
  {
    id: 'ai_chat',
    title: 'AI Chat',
    icon: <ChatIcon className="w-8 h-8" />,
    component: AIChat,
    defaultSize: { width: 420, height: 650 },
    minSize: { width: 320, height: 400 },
  },
  {
    id: 'settings',
    title: 'System Dashboard',
    icon: <SettingsIcon className="w-8 h-8" />,
    component: Settings,
    defaultSize: { width: 720, height: 500 },
    minSize: { width: 500, height: 400 },
  },
  {
    id: 'file_explorer',
    title: 'File Explorer',
    icon: <FolderIcon className="w-8 h-8" />,
    component: FileExplorer,
    defaultSize: { width: 680, height: 500 },
    minSize: { width: 450, height: 300 },
  },
  {
    id: 'browser',
    title: 'Web Browser',
    icon: <BrowserIcon className="w-8 h-8" />,
    component: Browser,
    defaultSize: { width: 900, height: 650 },
    minSize: { width: 500, height: 400 },
  },
];

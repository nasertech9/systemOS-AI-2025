
import React, { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';
import { WindowManagerProvider } from './context/WindowManagerContext';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('ai-os-session');
    if (session) {
      setLoggedIn(true);
    }

    const timer = setTimeout(() => {
      setBooting(false);
    }, 4000); // Simulate boot time

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('ai-os-session', JSON.stringify({ username, loginTime: Date.now() }));
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('ai-os-session');
    setLoggedIn(false);
  };

  if (booting) {
    return <BootScreen />;
  }

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <WindowManagerProvider>
      <Desktop onLogout={handleLogout} />
    </WindowManagerProvider>
  );
};

export default App;

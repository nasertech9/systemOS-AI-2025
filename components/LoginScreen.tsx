
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=5')"}}>
        <div className="w-full max-w-sm p-8 space-y-6 bg-black/60 backdrop-blur-md rounded-lg border border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
            <div className="text-center">
                <h1 className="text-4xl font-orbitron text-cyan-300">AURA OS</h1>
                <p className="text-cyan-100/80">Login to continue</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-cyan-200">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 mt-1 text-white bg-gray-800/50 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                        placeholder="Enter username"
                        autoFocus
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 text-lg font-bold text-gray-900 bg-cyan-400 rounded-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 shadow-glow-cyan transition duration-300 transform hover:scale-105"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
  );
};

export default LoginScreen;

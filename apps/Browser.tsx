
import React from 'react';

const Browser: React.FC = () => {
  return (
    <div className="bg-gray-900/50 w-full h-full flex flex-col text-white rounded-b-lg overflow-hidden">
        <div className="flex-shrink-0 p-2 border-b border-cyan-500/30 flex items-center space-x-2 bg-gray-800">
            <button className="p-1 rounded-full hover:bg-white/10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            <button className="p-1 rounded-full hover:bg-white/10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" /></svg>
            </button>
            <input
            type="text"
            value="https://www.google.com"
            readOnly
            className="w-full bg-gray-900/70 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
        </div>
        <div className="flex-grow bg-white text-black p-8">
            <h1 className="text-3xl font-bold">Welcome to Aura Browser</h1>
            <p className="mt-2 text-gray-600">This is a simulated web browser environment.</p>
            <p className="mt-4">Search and navigation are disabled in this simulation.</p>
        </div>
    </div>
  );
};

export default Browser;

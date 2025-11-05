
import React, { useState, useRef, useEffect } from 'react';
import { processTerminalCommand } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface TerminalProps {
  onLogout: () => void;
}

interface HistoryItem {
  command: string;
  output: string;
  isProcessing?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ onLogout }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([{ command: 'help', output: 'Welcome to AURA OS. Type "help" to see available commands.' }]);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    const newHistoryItem: HistoryItem = { command, output: '', isProcessing: true };
    setHistory(prev => [...prev, newHistoryItem]);
    setInput('');

    if (command.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (command.toLowerCase() === 'shutdown' || command.toLowerCase() === 'logout') {
      onLogout();
      return;
    }

    const response = await processTerminalCommand(command);
    
    setHistory(prev =>
      prev.map(item =>
        item.command === command && item.isProcessing
          ? { ...item, output: response, isProcessing: false }
          : item
      )
    );
  };

  return (
    <div className="bg-black/80 w-full h-full font-roboto-mono text-sm text-white p-2 rounded-b-lg flex flex-col" onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement).focus()}>
      <div className="flex-grow overflow-y-auto pr-2">
        {history.map((item, index) => (
          <div key={index}>
            <div className="flex items-center">
              <span className="text-cyan-400">user@aura</span>
              <span className="text-gray-400 mx-1">:~$</span>
              <span>{item.command}</span>
            </div>
            {item.isProcessing ? (
                <div className="text-gray-400 animate-pulse">Processing...</div>
            ) : (
                <div className="whitespace-pre-wrap">
                    <ReactMarkdown className="prose prose-sm prose-invert"
                        components={{
                            p: ({node, ...props}) => <p className="my-1" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside my-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-1" {...props} />,
                        }}
                    >
                        {item.output}
                    </ReactMarkdown>
                </div>
            )}
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center mt-2">
          <span className="text-cyan-400">user@aura</span>
          <span className="text-gray-400 mx-1">:~$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent border-none focus:ring-0 text-white outline-none pl-2"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;

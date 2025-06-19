import React, { useState, useRef, useEffect } from 'react';
import { TerminalHistoryItem } from '../../types/terminal';

interface TerminalInputProps {
  currentDirectory: string;
  onExecuteCommand: (command: string) => void;
  history: TerminalHistoryItem[];
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  currentDirectory,
  onExecuteCommand,
  history
}) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle command history navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (input.trim()) {
          onExecuteCommand(input.trim());
          setInput('');
          setHistoryIndex(-1);
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]?.command || '');
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex]?.command || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
        break;
        
      case 'Tab':
        e.preventDefault();
        // Basic tab completion for common commands
        const commonCommands = [
          'ls', 'cd', 'mkdir', 'rm', 'cp', 'mv', 'clear', 'pwd', 'cat', 'nano', 'vi', 'vim',
          'git', 'docker', 'kubectl', 'terraform', 'ansible', 'jenkins'
        ];
        const matches = commonCommands.filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        }
        break;
        
      case 'ArrowLeft':
        setCursorPosition(Math.max(0, cursorPosition - 1));
        break;
        
      case 'ArrowRight':
        setCursorPosition(Math.min(input.length, cursorPosition + 1));
        break;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-cyan-400">➜</span>
      <span className="text-blue-400">~{currentDirectory}</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-white outline-none font-mono"
          placeholder="Type a command..."
          autoComplete="off"
          spellCheck={false}
        />
        
        {/* Blinking cursor */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <span className="invisible">{input.slice(0, cursorPosition)}</span>
          <span className="animate-pulse bg-white w-2 h-5 inline-block" />
        </div>
      </div>
    </div>
  );
};

export default TerminalInput;
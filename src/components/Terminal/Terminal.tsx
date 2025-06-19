import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { Rnd } from 'react-rnd';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import TextEditor from './TextEditor';
import { useTerminal } from '../../hooks/useTerminal';
import { TerminalCommand, FileSystem } from '../../types/terminal';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const {
    history,
    currentDirectory,
    fileSystem,
    isEditorOpen,
    currentFile,
    executeCommand,
    openEditor,
    closeEditor,
    saveFile
  } = useTerminal();

  // Auto-focus terminal when opened
  useEffect(() => {
    if (isOpen && terminalRef.current) {
      const input = terminalRef.current.querySelector('input');
      input?.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'w':
            e.preventDefault();
            onClose();
            break;
          case 'm':
            e.preventDefault();
            setIsMaximized(!isMaximized);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMaximized, onClose]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setSize({ width: window.innerWidth - 40, height: window.innerHeight - 40 });
      setPosition({ x: 20, y: 20 });
    } else {
      setSize({ width: 800, height: 600 });
      setPosition({ x: 100, y: 100 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Rnd
          size={isMaximized ? { width: window.innerWidth - 40, height: window.innerHeight - 40 } : size}
          position={isMaximized ? { x: 20, y: 20 } : position}
          onDragStop={(e, d) => !isMaximized && setPosition({ x: d.x, y: d.y })}
          onResizeStop={(e, direction, ref, delta, position) => {
            if (!isMaximized) {
              setSize({
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
              });
              setPosition(position);
            }
          }}
          minWidth={400}
          minHeight={300}
          bounds="window"
          dragHandleClassName="terminal-header"
          className="pointer-events-auto"
          style={{ zIndex: 1000 }}
        >
          <motion.div
            ref={terminalRef}
            className={`bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden ${
              isMinimized ? 'h-12' : 'h-full'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Terminal Header */}
            <div className="terminal-header bg-gray-800 px-4 py-3 flex items-center justify-between cursor-move select-none">
              <div className="flex items-center space-x-3">
                {/* Traffic Light Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Close terminal"
                  />
                  <button
                    onClick={handleMinimize}
                    className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                    aria-label="Minimize terminal"
                  />
                  <button
                    onClick={handleMaximize}
                    className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                    aria-label="Maximize terminal"
                  />
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <TerminalIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {isEditorOpen ? `${currentFile?.name || 'untitled'} - nano` : 'zsh'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-mono">
                  {currentDirectory}
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
              <div className="h-full flex flex-col bg-gray-900 text-green-400 font-mono text-sm">
                {isEditorOpen ? (
                  <TextEditor
                    file={currentFile}
                    onSave={saveFile}
                    onClose={closeEditor}
                  />
                ) : (
                  <>
                    {/* Terminal Output */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-1">
                      <TerminalOutput history={history} />
                    </div>

                    {/* Terminal Input */}
                    <div className="border-t border-gray-700 p-4">
                      <TerminalInput
                        currentDirectory={currentDirectory}
                        onExecuteCommand={executeCommand}
                        history={history}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileItem } from '../../types/terminal';

interface TextEditorProps {
  file: FileItem | null;
  onSave: (filename: string, content: string) => void;
  onClose: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ file, onSave, onClose }) => {
  const [content, setContent] = useState(file?.content || '');
  const [filename, setFilename] = useState(file?.name || 'untitled.txt');
  const [mode, setMode] = useState<'insert' | 'command'>('insert');
  const [commandInput, setCommandInput] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'insert' && textareaRef.current) {
      textareaRef.current.focus();
    } else if (mode === 'command' && commandRef.current) {
      commandRef.current.focus();
    }
  }, [mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'insert') {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setMode('command');
          break;
        case 'Tab':
          e.preventDefault();
          const start = e.currentTarget.selectionStart;
          const end = e.currentTarget.selectionEnd;
          const newContent = content.substring(0, start) + '  ' + content.substring(end);
          setContent(newContent);
          // Set cursor position after the inserted spaces
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
            }
          }, 0);
          break;
      }
    }
  };

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput);
      setCommandInput('');
    } else if (e.key === 'Escape') {
      setMode('insert');
      setCommandInput('');
    }
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'w':
      case 'wq':
        onSave(filename, content);
        if (cmd === 'wq') {
          onClose();
        }
        break;
      case 'q':
        onClose();
        break;
      case 'q!':
        onClose();
        break;
      case 'help':
        setShowHelp(!showHelp);
        break;
      default:
        // Handle filename changes
        if (cmd.startsWith('w ')) {
          const newFilename = cmd.substring(2).trim();
          if (newFilename) {
            setFilename(newFilename);
            onSave(newFilename, content);
          }
        }
    }
    setMode('insert');
  };

  const getFileTemplate = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'json':
        return JSON.stringify({
          name: "",
          email: "",
          phone: "",
          message: "",
          project_type: "",
          budget: "",
          timeline: ""
        }, null, 2);
      case 'yaml':
      case 'yml':
        return `name: ""
email: ""
phone: ""
message: ""
project_details:
  type: ""
  budget: ""
  timeline: ""
  requirements: []`;
      case 'md':
        return `# Contact Information

**Name:** 
**Email:** 
**Phone:** 

## Project Details

**Type:** 
**Budget:** 
**Timeline:** 

## Message

`;
      default:
        return `Full Name: 
Email Address: 
Phone Number: 
Message/Description: 

Project Requirements:
- 
- 
- 

Additional Notes:
`;
    }
  };

  // Auto-populate template for new files
  useEffect(() => {
    if (!file && content === '') {
      setContent(getFileTemplate(filename));
    }
  }, [filename, file, content]);

  return (
    <div className="h-full flex flex-col bg-gray-900 text-green-400">
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              File: <span className="text-cyan-400">{filename}</span>
            </span>
            <span className="text-xs text-gray-400">
              Mode: {mode === 'insert' ? 'INSERT' : 'COMMAND'}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            ESC: Command mode | :wq: Save & Exit | :q!: Exit without saving
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="bg-gray-800 border-b border-gray-700 p-4 text-xs"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-cyan-400 mb-2">Navigation:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>ESC - Enter command mode</li>
                <li>TAB - Insert spaces (indent)</li>
                <li>Arrow keys - Move cursor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 mb-2">Commands:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>:w - Save file</li>
                <li>:wq - Save and exit</li>
                <li>:q - Exit</li>
                <li>:q! - Exit without saving</li>
                <li>:w filename - Save as filename</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Editor Content */}
      <div className="flex-1 relative">
        {mode === 'insert' ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
            placeholder="Start typing your content..."
            spellCheck={false}
          />
        ) : (
          <div className="h-full p-4">
            <div className="h-full bg-gray-800 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {content}
              </pre>
            </div>
          </div>
        )}

        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 p-4 text-xs text-gray-500 font-mono">
          {content.split('\n').map((_, index) => (
            <div key={index} className="leading-5">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Command Line */}
      {mode === 'command' && (
        <div className="bg-gray-800 border-t border-gray-700 p-2">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400">:</span>
            <input
              ref={commandRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleCommandKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none font-mono"
              placeholder="Enter command..."
            />
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-t border-gray-700">
        <div className="flex justify-between">
          <span>Lines: {content.split('\n').length} | Characters: {content.length}</span>
          <span>nano 6.2 | Modified: {content !== (file?.content || '')}</span>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
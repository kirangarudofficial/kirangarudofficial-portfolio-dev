import { useState, useCallback } from 'react';
import { TerminalHistoryItem, FileItem, FileSystem } from '../types/terminal';
import { executeTerminalCommand } from '../utils/terminalCommands';
import { sendContactForm } from '../utils/emailService';

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      command: 'welcome',
      directory: '',
      output: [
        '🚀 Welcome to Kiran Garud\'s Interactive Terminal!',
        '',
        '💡 This terminal simulates a real DevOps environment with:',
        '   • System commands (ls, cd, mkdir, rm, etc.)',
        '   • Text editors (nano, vi, vim)',
        '   • DevOps tools (git, docker, kubectl, terraform)',
        '   • File operations and contact forms',
        '',
        '📝 Try creating a contact file:',
        '   nano contact.json',
        '   nano info.yaml',
        '   nano message.txt',
        '',
        '🔧 Available commands: help, ls, clear, git status, docker ps',
        '───────────────────────────────────────────────────────────',
        ''
      ],
      timestamp: new Date()
    }
  ]);

  const [currentDirectory, setCurrentDirectory] = useState('/home/kiran');
  const [fileSystem, setFileSystem] = useState<FileSystem>({
    '/home/kiran': {
      type: 'directory',
      children: {
        'projects': { type: 'directory', children: {} },
        'documents': { type: 'directory', children: {} },
        'scripts': { type: 'directory', children: {} }
      }
    }
  });
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null);

  const executeCommand = useCallback(async (command: string) => {
    const result = await executeTerminalCommand(command, currentDirectory, fileSystem);
    
    // Add command to history
    const historyItem: TerminalHistoryItem = {
      command,
      directory: currentDirectory,
      output: result.output,
      error: result.error,
      timestamp: new Date()
    };
    
    setHistory(prev => [...prev, historyItem]);

    // Handle special commands
    if (result.action) {
      switch (result.action.type) {
        case 'changeDirectory':
          setCurrentDirectory(result.action.path);
          break;
        case 'openEditor':
          setIsEditorOpen(true);
          setCurrentFile(result.action.file);
          break;
        case 'updateFileSystem':
          setFileSystem(result.action.fileSystem);
          break;
      }
    }
  }, [currentDirectory, fileSystem]);

  const openEditor = useCallback((filename: string, content: string = '') => {
    setCurrentFile({
      name: filename,
      content,
      path: `${currentDirectory}/${filename}`
    });
    setIsEditorOpen(true);
  }, [currentDirectory]);

  const closeEditor = useCallback(() => {
    setIsEditorOpen(false);
    setCurrentFile(null);
  }, []);

  const saveFile = useCallback(async (filename: string, content: string) => {
    // Update file system
    const newFileSystem = { ...fileSystem };
    const pathParts = currentDirectory.split('/').filter(Boolean);
    let current = newFileSystem;
    
    for (const part of pathParts) {
      if (current[part] && current[part].type === 'directory') {
        current = current[part].children!;
      }
    }
    
    current[filename] = {
      type: 'file',
      content,
      size: content.length,
      modified: new Date()
    };
    
    setFileSystem(newFileSystem);

    // If it's a contact form, try to send email
    if (filename.includes('contact') || filename.includes('info') || filename.includes('message')) {
      try {
        await sendContactForm(filename, content);
        setHistory(prev => [...prev, {
          command: `save ${filename}`,
          directory: currentDirectory,
          output: [
            `✅ File saved: ${filename}`,
            '📧 Contact information sent successfully!',
            '🎉 Thank you for reaching out. I\'ll get back to you soon!'
          ],
          timestamp: new Date()
        }]);
      } catch (error) {
        setHistory(prev => [...prev, {
          command: `save ${filename}`,
          directory: currentDirectory,
          output: [
            `✅ File saved: ${filename}`,
            '⚠️  Email service temporarily unavailable.',
            '💾 Your information has been saved locally.'
          ],
          timestamp: new Date()
        }]);
      }
    } else {
      setHistory(prev => [...prev, {
        command: `save ${filename}`,
        directory: currentDirectory,
        output: [`✅ File saved: ${filename}`],
        timestamp: new Date()
      }]);
    }

    setCurrentFile(prev => prev ? { ...prev, name: filename, content } : null);
  }, [currentDirectory, fileSystem]);

  return {
    history,
    currentDirectory,
    fileSystem,
    isEditorOpen,
    currentFile,
    executeCommand,
    openEditor,
    closeEditor,
    saveFile
  };
};
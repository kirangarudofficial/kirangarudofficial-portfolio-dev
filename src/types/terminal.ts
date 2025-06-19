export interface TerminalHistoryItem {
  command: string;
  directory: string;
  output?: string | string[];
  error?: boolean;
  timestamp: Date;
}

export interface FileItem {
  name: string;
  content: string;
  path: string;
  size?: number;
  modified?: Date;
}

export interface FileSystemItem {
  type: 'file' | 'directory';
  content?: string;
  size?: number;
  modified?: Date;
  children?: { [key: string]: FileSystemItem };
}

export interface FileSystem {
  [path: string]: FileSystemItem;
}

export interface TerminalCommand {
  command: string;
  args: string[];
  flags: string[];
}

export interface CommandResult {
  output?: string | string[];
  error?: boolean;
  action?: {
    type: 'changeDirectory' | 'openEditor' | 'updateFileSystem';
    path?: string;
    file?: FileItem;
    fileSystem?: FileSystem;
  };
}

export interface ContactFormData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  requirements?: string[];
}
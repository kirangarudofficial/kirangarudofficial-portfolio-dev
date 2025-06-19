import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface TerminalButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({ onClick, isOpen }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed top-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${
        isOpen 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isOpen ? 'Close terminal' : 'Open terminal'}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Terminal className="h-6 w-6 text-white" />
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isOpen ? 'Close Terminal' : 'Open Terminal'}
      </div>
    </motion.button>
  );
};

export default TerminalButton;
import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ 
  isOpen, 
  onToggle, 
  className = '' 
}) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:text-cyan-400 dark:hover:text-cyan-400 transition-all duration-300 group ${className}`}
      whileHover={{ 
        scale: 1.1, 
        y: -2,
        boxShadow: "0 10px 20px -5px rgba(6, 182, 212, 0.3)"
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      {/* Animated menu icon */}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Menu className="h-5 w-5" />
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isOpen ? 'Close menu' : 'Open menu'}
      </div>
    </motion.button>
  );
};

export default SidebarToggle;
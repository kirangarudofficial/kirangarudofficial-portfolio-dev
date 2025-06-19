import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  MapPin, 
  Briefcase, 
  Bot, 
  Network, 
  Settings, 
  BookOpen, 
  Mail, 
  X,
  ChevronRight
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  id: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <Home className="h-5 w-5" />, id: 'home' },
  { path: '/about', label: 'About', icon: <User className="h-5 w-5" />, id: 'about' },
  { path: '/journey', label: 'Journey', icon: <MapPin className="h-5 w-5" />, id: 'journey' },
  { path: '/projects', label: 'Solutions', icon: <Briefcase className="h-5 w-5" />, id: 'projects' },
  { path: '/ai-stack', label: 'AI Stack', icon: <Bot className="h-5 w-5" />, id: 'ai-stack' },
  { path: '/architecture', label: 'Architecture', icon: <Network className="h-5 w-5" />, id: 'architecture' },
  { path: '/services', label: 'Services', icon: <Settings className="h-5 w-5" />, id: 'services' },
  { path: '/blog', label: 'Insights', icon: <BookOpen className="h-5 w-5" />, id: 'blog' },
  { path: '/contact', label: 'Contact', icon: <Mail className="h-5 w-5" />, id: 'contact' }
];

const SidebarNavigation: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  activeSection, 
  onNavigate 
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    onToggle();
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      x: -20
    }
  };

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onToggle}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            ref={sidebarRef}
            className="fixed left-0 top-0 h-full w-80 md:w-64 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 z-50 shadow-2xl"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    kirangarudofficial
                  </span>
                  <div className="text-xs text-gray-400 font-medium">
                    DevOps Engineer
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={onToggle}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close navigation"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.4 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Navigation Items */}
            <motion.nav
              className="flex-1 px-4 py-6 space-y-2"
              variants={containerVariants}
              initial="closed"
              animate="open"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`group relative w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      x: 5
                    }}
                    whileTap={{ scale: 0.98 }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* Icon */}
                    <div className={`flex-shrink-0 ${isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'} transition-colors duration-200`}>
                      {item.icon}
                    </div>

                    {/* Label */}
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>

                    {/* Arrow indicator */}
                    <ChevronRight className={`ml-auto h-4 w-4 transition-all duration-200 ${
                      isActive 
                        ? 'text-cyan-400 opacity-100' 
                        : 'text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-white'
                    }`} />

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.button>
                );
              })}
            </motion.nav>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-medium">
                    Available for opportunities
                  </span>
                </div>
                <motion.button
                  onClick={() => handleNavClick('contact')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get in Touch
                </motion.button>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarNavigation;
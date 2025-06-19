import React, { useState, useEffect } from 'react';
import { Zap, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import SidebarToggle from './SidebarToggle';
import SidebarNavigation from './SidebarNavigation';
import { useSidebar } from '../../hooks/useSidebar';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebar = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
    onNavigate(sectionId);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-900/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => handleNavClick('home')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg">
                  <Zap className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  kirangarudofficial
                </span>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                  DevOps Engineer
                </div>
              </div>
            </motion.div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* CTA Button - Hidden on mobile */}
              <motion.button
                onClick={() => handleNavClick('contact')}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25 border border-cyan-400/20"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.4)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ChevronDown className="h-4 w-4 rotate-[-90deg] transition-transform duration-300" />
              </motion.button>

              {/* Sidebar Toggle */}
              <SidebarToggle 
                isOpen={sidebar.isOpen} 
                onToggle={sidebar.toggle}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Navigation */}
      <SidebarNavigation
        isOpen={sidebar.isOpen}
        onToggle={sidebar.toggle}
        activeSection={activeSection}
        onNavigate={handleNavClick}
      />
    </>
  );
};

export default Header;
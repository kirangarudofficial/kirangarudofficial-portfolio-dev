import { useState, useEffect } from 'react';

interface UseSidebarReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useSidebar = (initialState: boolean = false): UseSidebarReturn => {
  const [isOpen, setIsOpen] = useState(() => {
    // Check localStorage for persisted state
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-open');
      return saved ? JSON.parse(saved) : initialState;
    }
    return initialState;
  });

  // Persist state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
    }
  }, [isOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggle = () => setIsOpen(prev => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    toggle,
    open,
    close
  };
};
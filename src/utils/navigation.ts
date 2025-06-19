// Navigation utilities for sidebar component

export interface NavigationItem {
  id: string;
  path: string;
  label: string;
  icon?: React.ReactNode;
  external?: boolean;
  disabled?: boolean;
}

export const scrollToSection = (sectionId: string, offset: number = 80) => {
  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const elementTop = element.offsetTop - offset;
    window.scrollTo({ 
      top: elementTop, 
      behavior: 'smooth' 
    });
  }
};

export const getCurrentSection = (sections: string[], offset: number = 100): string => {
  const scrollPosition = window.scrollY + offset;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const element = section === 'home' 
      ? { offsetTop: 0 } 
      : document.getElementById(section);
    
    if (element && scrollPosition >= element.offsetTop) {
      return section;
    }
  }

  return sections[0] || 'home';
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Keyboard navigation helpers
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  items: NavigationItem[],
  currentIndex: number,
  onSelect: (item: NavigationItem) => void,
  onClose?: () => void
) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      // Focus next item logic here
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      // Focus previous item logic here
      break;
      
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (items[currentIndex]) {
        onSelect(items[currentIndex]);
      }
      break;
      
    case 'Escape':
      event.preventDefault();
      onClose?.();
      break;
  }
};

// Local storage helpers for sidebar state
export const getSidebarState = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const saved = localStorage.getItem('sidebar-open');
    return saved ? JSON.parse(saved) : false;
  } catch {
    return false;
  }
};

export const setSidebarState = (isOpen: boolean): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('sidebar-open', JSON.stringify(isOpen));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Accessibility helpers
export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};
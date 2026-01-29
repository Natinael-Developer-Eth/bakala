import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
  showSafeArea?: boolean;
}

export function MobileLayout({ 
  children, 
  className = '',
  showSafeArea = true 
}: MobileLayoutProps) {
  return (
    <div className={`mobile-container bg-background ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen ${showSafeArea ? 'safe-top safe-bottom' : ''}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useApp();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-secondary text-foreground"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </motion.button>
  );
}

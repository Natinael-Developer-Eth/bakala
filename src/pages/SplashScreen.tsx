import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import logo from '@/assets/logo.png';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { hasSeenOnboarding } = useApp();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (hasSeenOnboarding) {
        navigate('/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, hasSeenOnboarding]);

  return (
    <div className="mobile-container bg-primary min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-light/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary-dark/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
      </div>

      {/* Logo and content */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <motion.div
              className="w-32 h-32 rounded-3xl bg-card/10 backdrop-blur-sm p-4 flex items-center justify-center"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <img 
                src={logo} 
                alt="Bakala Everywhere" 
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* App name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                Bakala Everywhere
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Your nearest grocery, delivered fast.
              </p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="flex gap-1 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Powered by text */}
      <motion.p
        className="absolute bottom-8 text-primary-foreground/60 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Powered by HararMarket.com
      </motion.p>
    </div>
  );
}

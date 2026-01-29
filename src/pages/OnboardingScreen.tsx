import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ShoppingCart, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const slides = [
  {
    id: 1,
    icon: MapPin,
    title: 'Find Nearby Bakalas',
    description: 'Discover local grocery shops in your neighborhood. Support your community while getting fresh products.',
    color: 'bg-primary',
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: 'Order Anything Fast',
    description: 'Browse products, add to cart, and checkout in seconds. Your daily essentials delivered with ease.',
    color: 'bg-accent',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Delivered by Trusted Runners',
    description: 'Verified delivery runners bring your order to your door. Fast, safe, and reliable every time.',
    color: 'bg-primary',
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { setHasSeenOnboarding } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    setHasSeenOnboarding(true);
    navigate('/login', { replace: true });
  };

  const handleSkip = () => {
    setHasSeenOnboarding(true);
    navigate('/home', { replace: true });
  };

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleSkip}
          className="text-muted-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              className={`w-32 h-32 mx-auto mb-8 rounded-3xl ${slides[currentSlide].color} flex items-center justify-center`}
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon size={56} className="text-primary-foreground" />;
              })()}
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {slides[currentSlide].title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/30'
            }`}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 px-6 pb-8">
        {currentSlide > 0 && (
          <motion.button
            onClick={handlePrev}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-secondary text-secondary-foreground font-semibold"
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={20} />
            Back
          </motion.button>
        )}

        {currentSlide < slides.length - 1 ? (
          <motion.button
            onClick={handleNext}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Next
            <ArrowRight size={20} />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleGetStarted}
            className="flex-1 btn-accent flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Get Started
            <ArrowRight size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
}

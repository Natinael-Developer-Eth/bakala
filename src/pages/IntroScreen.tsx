import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const slides = [
    {
        id: 1,
        title: "Fresh Groceries",
        description: "Get the freshest produce from your local Bakala delivered to your doorstep.",
        icon: ShoppingBag,
        color: "bg-green-100 text-green-600",
    },
    {
        id: 2,
        title: "Fast Delivery",
        description: "Our runners ensure your order reaches you within minutes, not hours.",
        icon: Truck,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        id: 3,
        title: "Support Local",
        description: "Every order supports small businesses and runners in your community.",
        icon: Heart,
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: 4,
        title: "You're All Set!",
        description: "Start shopping now and experience the convenience of Bakala Everywhere.",
        icon: Check,
        color: "bg-primary text-primary-foreground",
    }
];

export default function IntroScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const { setHasSeenOnboarding } = useApp();

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            completeOnboarding();
        }
    };

    const completeOnboarding = () => {
        // Determine where to go - if we had persistent storage for "hasSeenOnboarding", we'd set it here
        // For now, let's assume we go to login or home
        navigate('/login');
    };

    const CurrentIcon = slides[currentIndex].icon;

    return (
        <div className="flex flex-col h-screen bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* Skip Button */}
            <div className="flex justify-end p-6">
                {currentIndex < slides.length - 1 && (
                    <button
                        onClick={completeOnboarding}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        Skip
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        <div className={`w-32 h-32 rounded-3xl ${slides[currentIndex].color} flex items-center justify-center mb-8 shadow-xl`}>
                            <CurrentIcon size={48} />
                        </div>

                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            {slides[currentIndex].title}
                        </h2>

                        <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                            {slides[currentIndex].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Controls */}
            <div className="p-8 pb-12 w-full max-w-md mx-auto">
                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 bg-primary"
                                : "w-2 bg-primary/20"
                                }`}
                        />
                    ))}
                </div>

                {/* Action Button */}
                <motion.button
                    onClick={handleNext}
                    className="w-full btn-primary flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
                    <ArrowRight size={20} />
                </motion.button>
            </div>
        </div>
    );
}

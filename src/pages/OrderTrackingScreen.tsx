import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Package, Bike, MapPin, Home } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { sampleOrder } from '@/data/mockData';
import runnerImage from '@/assets/runner-placeholder.jpg';

const orderSteps = [
  { id: 'placed', label: 'Order Placed', icon: CheckCircle, time: 'Just now' },
  { id: 'accepted', label: 'Shop Accepted', icon: Package, time: '2 min ago' },
  { id: 'preparing', label: 'Preparing', icon: Package, time: 'Now' },
  { id: 'picked_up', label: 'Picked Up', icon: Bike, time: '' },
  { id: 'delivered', label: 'Delivered', icon: Home, time: '' },
];

export default function OrderTrackingScreen() {
  const [currentStep, setCurrentStep] = useState(2); // "preparing" step
  
  // Simulate order progress
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < orderSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <MobileLayout>
      <div className="pb-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-4 flex items-center gap-4">
          <Link to="/home" className="p-2 -ml-2">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Order #{sampleOrder.id}</h1>
            <p className="text-xs text-muted-foreground">Estimated delivery: {sampleOrder.estimatedDelivery}</p>
          </div>
        </div>

        {/* Success message */}
        <motion.div
          className="px-4 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-success/10 rounded-2xl p-4 text-center">
            <motion.div
              className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <CheckCircle size={32} className="text-success-foreground" />
            </motion.div>
            <h2 className="text-lg font-bold text-foreground mb-1">Order Confirmed!</h2>
            <p className="text-sm text-muted-foreground">
              Your order is being prepared by {sampleOrder.shop.name}
            </p>
          </div>
        </motion.div>

        {/* Map placeholder */}
        <div className="px-4 mb-6">
          <div className="h-48 rounded-2xl bg-muted overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="absolute top-4 left-4 bg-card rounded-xl px-3 py-2 shadow-md">
                <p className="text-xs text-muted-foreground">Shop</p>
                <p className="text-sm font-medium text-foreground">{sampleOrder.shop.name}</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-card rounded-xl px-3 py-2 shadow-md">
                <p className="text-xs text-muted-foreground">Your location</p>
                <p className="text-sm font-medium text-foreground">{sampleOrder.deliveryAddress}</p>
              </div>
              {/* Animated dot on "route" */}
              <motion.div
                className="absolute w-4 h-4 bg-primary rounded-full shadow-glow"
                animate={{
                  left: ['30%', '70%'],
                  top: ['40%', '60%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Order Status</h3>
          <div className="space-y-0">
            {orderSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div key={step.id} className="relative flex gap-4">
                  {/* Line */}
                  {index < orderSteps.length - 1 && (
                    <div
                      className={`absolute left-[19px] top-10 w-0.5 h-8 ${
                        isCompleted ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                  
                  {/* Dot */}
                  <motion.div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted || isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Icon size={18} />
                  </motion.div>

                  {/* Content */}
                  <div className="pb-6 flex-1">
                    <p className={`font-medium ${
                      isCompleted || isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </p>
                    {step.time && (
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    )}
                    {isActive && step.id === 'preparing' && (
                      <p className="text-xs text-primary font-medium mt-1">In progress...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Runner Info (show when picked up) */}
        {currentStep >= 3 && sampleOrder.runner && (
          <motion.div
            className="px-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-semibold text-foreground mb-3">Your Runner</h3>
            <div className="card-elevated flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-muted">
                <img
                  src={runnerImage}
                  alt={sampleOrder.runner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{sampleOrder.runner.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bike size={14} />
                  <span>⭐ {sampleOrder.runner.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-primary text-primary-foreground rounded-xl">
                  <Phone size={18} />
                </button>
                <button className="p-3 bg-secondary text-foreground rounded-xl">
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Details */}
        <div className="px-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Order Details</h3>
          <div className="card-flat space-y-3">
            {sampleOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-foreground">{item.price * item.quantity} ETB</span>
              </div>
            ))}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{sampleOrder.total} ETB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery fee</span>
                <span className="text-foreground">{sampleOrder.deliveryFee} ETB</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{sampleOrder.total + sampleOrder.deliveryFee} ETB</span>
              </div>
            </div>
            <div className="border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-foreground">{sampleOrder.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="px-4">
          <Link to="/home" className="block">
            <motion.button
              className="w-full btn-secondary"
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ChevronRight, CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';

const paymentMethods = [
  { id: 'cash', name: 'Cash on Delivery', icon: Banknote, available: true },
  { id: 'telebirr', name: 'Telebirr', icon: Wallet, available: false, soon: true },
  { id: 'cbe', name: 'CBE Card', icon: CreditCard, available: false, soon: true },
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart, currentLocation } = useApp();
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [isPlacing, setIsPlacing] = useState(false);
  
  const deliveryFee = 35;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    clearCart();
    navigate('/order-tracking');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <MobileLayout>
      <div className="pb-32">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-4 flex items-center gap-4">
          <Link to="/cart" className="p-2 -ml-2">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Delivery Address */}
        <div className="px-4 mb-4">
          <h3 className="font-semibold text-foreground mb-3">Delivery Address</h3>
          <motion.button
            className="card-flat w-full flex items-center gap-3"
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin size={24} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{currentLocation}</p>
              <p className="text-sm text-muted-foreground">Near Friendship Hotel</p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </motion.button>

          {/* Map placeholder */}
          <div className="mt-3 h-32 rounded-xl bg-muted overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-primary mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Tap to pin exact location</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="px-4 mb-4">
          <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={method.id}
                  onClick={() => method.available && setSelectedPayment(method.id)}
                  className={`card-flat w-full flex items-center gap-3 ${
                    !method.available ? 'opacity-50' : ''
                  }`}
                  whileTap={method.available ? { scale: 0.99 } : {}}
                  disabled={!method.available}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedPayment === method.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{method.name}</p>
                    {method.soon && (
                      <span className="text-xs text-accent font-medium">Coming soon</span>
                    )}
                  </div>
                  {selectedPayment === method.id && (
                    <CheckCircle size={20} className="text-primary" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="px-4 mb-4">
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="card-flat">
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-foreground">{item.price * item.quantity} ETB</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{cartTotal} ETB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span className="text-foreground">{deliveryFee} ETB</span>
                </div>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{total} ETB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-lg border-t border-border px-4 py-4 safe-bottom"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <motion.button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="w-full btn-accent flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          {isPlacing ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Placing Order...
            </>
          ) : (
            <>
              Place Order • {total} ETB
            </>
          )}
        </motion.button>
      </motion.div>
    </MobileLayout>
  );
}

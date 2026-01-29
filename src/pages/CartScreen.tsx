import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Trash2, MapPin, MessageSquare } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import fruitsImage from '@/assets/category-fruits.jpg';

export default function CartScreen() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, currentLocation } = useApp();
  const deliveryFee = cart.length > 0 ? 35 : 0;
  const total = cartTotal + deliveryFee;

  return (
    <MobileLayout>
      <div className="pb-44">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-4 flex items-center gap-4">
          <Link to="/home" className="p-2 -ml-2">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <h1 className="text-xl font-bold text-foreground flex-1">Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-destructive text-sm font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-state mt-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4"
            >
              <span className="text-4xl">🛒</span>
            </motion.div>
            <h3 className="font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add items from a nearby Bakala to get started
            </p>
            <Link to="/home" className="btn-primary">
              Browse Shops
            </Link>
          </div>
        ) : (
          <>
            {/* Delivery info */}
            <div className="px-4 mb-4">
              <div className="card-flat flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Delivery in 15-25 mins</p>
                  <p className="text-xs text-muted-foreground">{currentLocation}</p>
                </div>
                <button className="text-primary text-sm font-medium">Change</button>
              </div>
            </div>

            {/* Cart items */}
            <div className="px-4 space-y-3 mb-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="card-flat flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Product image */}
                  <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={fruitsImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    {item.unit && (
                      <p className="text-xs text-muted-foreground mb-2">{item.unit}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {item.price * item.quantity} ETB
                      </span>

                      {/* Quantity controls */}
                      <div className="quantity-stepper">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 size={14} className="text-destructive" />
                          ) : (
                            <Minus size={14} />
                          )}
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add note */}
            <div className="px-4 mb-4">
              <div className="card-flat flex items-center gap-3">
                <MessageSquare size={20} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Add a note (e.g., bring change, call me)"
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout footer */}
      {cart.length > 0 && (
        <motion.div
          className="fixed bottom-20 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-lg border-t border-border px-4 py-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-medium">{cartTotal} ETB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery fee</span>
              <span className="text-foreground font-medium">{deliveryFee} ETB</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{total} ETB</span>
            </div>
          </div>

          <Link to="/checkout" className="block">
            <motion.button
              className="w-full btn-accent"
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
            </motion.button>
          </Link>
        </motion.div>
      )}

      <BottomNav />
    </MobileLayout>
  );
}

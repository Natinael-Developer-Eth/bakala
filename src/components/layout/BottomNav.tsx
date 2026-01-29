import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/cart', icon: ShoppingBag, label: 'Cart', isCart: true },
  { path: '/messages', icon: MessageCircle, label: 'Messages' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const location = useLocation();
  const { cartItemsCount } = useApp();

  return (
    <nav className="bottom-nav max-w-md mx-auto">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        if (item.isCart) {
          return (
            <Link key={item.path} to={item.path} className="relative">
              <motion.div
                className="bottom-nav-item cart-active"
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        }

        return (
          <Link key={item.path} to={item.path}>
            <motion.div
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}

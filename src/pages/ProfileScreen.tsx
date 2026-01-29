import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  Heart,
  Package,
  Gift
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MenuRow } from '@/components/features/MenuRow';

const menuItems = [
  { icon: Package, label: 'My Orders', path: '/orders' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
  { icon: MapPin, label: 'Saved Addresses', path: '/addresses' },
  { icon: CreditCard, label: 'Payment Methods', path: '/payments', badge: 'Coming soon' },
  { icon: Gift, label: 'Promo Codes', path: '/promos' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: HelpCircle, label: 'Help & Support', path: '/support' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function ProfileScreen() {
  const { user, isGuest, setUser } = useApp();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Modern Header */}
        <div className="pt-8 pb-6 px-4 bg-background sticky top-0 z-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-background shadow-sm">
              {/* Avatar Placeholder */}
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={32} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {isGuest ? 'Guest' : user?.name || 'Happy Shopper'}
              </h2>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                {isGuest ? 'Sign in to sync data' : `+251 ${user?.phone || '*** *** ***'}`}
              </p>
            </div>
            {!isGuest && (
              <button onClick={() => { }} className="p-2 text-primary">
                <Settings size={20} />
              </button>
            )}
          </div>

          {/* Guest Sign In CTA */}
          {isGuest && (
            <Link to="/login" className="mt-4 flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/20">
              <div className="flex flex-col">
                <span className="font-bold">Sign in or Register</span>
                <span className="text-xs opacity-90">Get synchronized history and offers</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ChevronRight size={16} />
              </div>
            </Link>
          )}

          {/* Stats Row */}
          {!isGuest && (
            <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-green-50 p-3 rounded-2xl border border-green-100">
                <span className="block text-2xl font-bold text-green-700">12</span>
                <span className="text-xs font-medium text-green-600">Orders</span>
              </div>
              <div className="flex-1 bg-orange-50 p-3 rounded-2xl border border-orange-100">
                <span className="block text-2xl font-bold text-orange-700">4.8</span>
                <span className="text-xs font-medium text-orange-600">Rating</span>
              </div>
              <div className="flex-1 bg-blue-50 p-3 rounded-2xl border border-blue-100">
                <span className="block text-2xl font-bold text-blue-700">Pro</span>
                <span className="text-xs font-medium text-blue-600">Member</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu Section */}
        <div className="px-4 space-y-6">

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">Account</h3>
            <div className="bg-card rounded-2xl border border-border/50 divide-y divide-border/50 overflow-hidden shadow-sm">
              {menuItems.slice(0, 3).map((item) => (
                <MenuRow key={item.path} item={item} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">General</h3>
            <div className="bg-card rounded-2xl border border-border/50 divide-y divide-border/50 overflow-hidden shadow-sm">
              {menuItems.slice(3).map((item) => (
                <MenuRow key={item.path} item={item} />
              ))}
            </div>
          </section>

          {!isGuest && (
            <button
              onClick={handleLogout}
              className="w-full p-4 text-red-500 font-medium bg-red-50 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}

          <p className="text-center text-xs text-muted-foreground pt-4 pb-8">
            Version 2.0.0 • Bakala Delivered
          </p>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Bakala Everywhere v1.0.0
        </p>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

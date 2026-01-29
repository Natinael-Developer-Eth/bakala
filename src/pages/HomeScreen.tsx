import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Bell, ChevronDown, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ShopCard } from '@/components/features/ShopCard';
import { ProductCard } from '@/components/features/ProductCard';
import { CategoryCard } from '@/components/features/CategoryCard';
import { shops, products, categories } from '@/data/mockData';
import heroImage from '@/assets/hero-groceries.jpg';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const { user, currentLocation, cartItemsCount } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-lg font-semibold text-foreground">
                {greeting()}, {user?.name || 'Guest'} 👋
              </p>
              <button className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <MapPin size={14} className="text-primary" />
                <span>{currentLocation}</span>
                <ChevronDown size={14} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button className="relative p-2 rounded-xl bg-secondary">
                <Bell size={20} className="text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <Link to="/search">
            <div className="search-bar cursor-pointer">
              <Search size={20} />
              <span className="text-sm">Search products or shops...</span>
            </div>
          </Link>
        </div>

        {/* Hero Banner */}
        <motion.div
          className="px-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="hero-banner relative overflow-hidden">
            <img
              src={heroImage}
              alt="Fresh groceries"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full mb-3">
                🚀 Fast Delivery
              </span>
              <h2 className="text-xl font-bold mb-1">
                Fresh Grocery Delivery in Addis
              </h2>
              <p className="text-sm opacity-90 mb-4">
                Support local Bakalas 💚
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-semibold">
                Shop Now
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
            {categories.slice(0, 6).map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isActive={selectedCategory === category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              />
            ))}
          </div>
        </div>

        {/* Nearby Shops */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">Nearby Bakalas</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-2">
            {shops.filter(s => s.isOpen).map((shop, index) => (
              <ShopCard key={shop.id} shop={shop} index={index} />
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">
              {selectedCategory || 'Popular Today'}
            </h3>
            {selectedCategory && (
              <button
                className="text-sm text-primary font-medium"
                onClick={() => setSelectedCategory(null)}
              >
                Clear filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {filteredProducts.slice(0, 6).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* Fresh & Fruits Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">Fresh & Fruits 🍎</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
            {products
              .filter(p => p.category === 'Vegetables & Fruits')
              .map((product, index) => (
                <div key={product.id} className="min-w-[140px]">
                  <ProductCard product={product} index={index} size="small" />
                </div>
              ))}
          </div>
        </div>

        {/* Daily Essentials */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">Daily Essentials</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {products
              .filter(p => p.category === 'Dairy & Eggs' || p.category === 'Bread & Bakery')
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

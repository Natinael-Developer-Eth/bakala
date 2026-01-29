import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, CheckCircle, MessageCircle, Phone, Share2 } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/features/ProductCard';
import { shops, products, categories } from '@/data/mockData';
import shopImage from '@/assets/shop-placeholder.jpg';

export default function ShopScreen() {
  const { id } = useParams();
  const shop = shops.find(s => s.id === id) || shops[0];
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'products' | 'info' | 'reviews'>('products');

  const shopProducts = products.filter(p => p.shopId === shop.id || true); // Mock: show all products

  const filteredProducts = activeCategory === 'All'
    ? shopProducts
    : shopProducts.filter(p => p.category === activeCategory);

  const categoryList = ['All', ...categories.map(c => c.name)];

  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Header Image */}
        <div className="relative h-48 bg-muted">
          <img
            src={shopImage}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Back button */}
          <Link
            to="/home"
            className="absolute top-4 left-4 p-2 bg-card/80 backdrop-blur-sm rounded-xl"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>

          {/* Share button */}
          <button className="absolute top-4 right-4 p-2 bg-card/80 backdrop-blur-sm rounded-xl">
            <Share2 size={20} className="text-foreground" />
          </button>
        </div>

        {/* Shop Info */}
        <div className="px-4 -mt-12 relative z-10">
          <motion.div
            className="card-elevated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-foreground">{shop.name}</h1>
                  {shop.isVerified && (
                    <CheckCircle size={18} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{shop.address}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${shop.isOpen
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive'
                }`}>
                {shop.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-accent fill-accent" />
                <span className="font-medium text-foreground">{shop.rating}</span>
                <span>(128 reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{shop.deliveryTime}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Chat with Shop
              </button>
              <button className="p-3 bg-secondary rounded-xl">
                <Phone size={18} className="text-foreground" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 mt-4 mb-4">
          {(['products', 'info', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === tab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <>
            {/* Category pills */}
            <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar mb-4">
              {categoryList.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-pill whitespace-nowrap ${activeCategory === category ? 'active' : ''
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 gap-3 px-4">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'info' && (
          <div className="px-4 space-y-4">
            <div className="card-flat">
              <h3 className="font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground">
                Local neighborhood grocery shop serving fresh products and daily essentials.
                We've been serving the community for over 10 years.
              </p>
            </div>

            <div className="card-flat">
              <h3 className="font-semibold text-foreground mb-2">Opening Hours</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mon - Sat</span>
                  <span className="text-foreground">7:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground">8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="px-4">
            <div className="empty-state">
              <Star size={48} className="text-muted-foreground/30 mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No reviews yet</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to review this shop
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

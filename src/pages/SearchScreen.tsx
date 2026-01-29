import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/features/ProductCard';
import { ShopCard } from '@/components/features/ShopCard';
import { products, shops, categories } from '@/data/mockData';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('products');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredShops = shops.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const recentSearches = ['Tomatoes', 'Milk', 'Bread', 'Eggs'];
  const popularCategories = categories.slice(0, 4);

  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Search Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/home" className="p-2 -ml-2">
              <ArrowLeft size={24} className="text-foreground" />
            </Link>
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products or shops..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field pl-12 pr-10"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          {query && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'products'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                  }`}
              >
                Products ({filteredProducts.length})
              </button>
              <button
                onClick={() => setActiveTab('shops')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'shops'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                  }`}
              >
                Shops ({filteredShops.length})
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {!query ? (
          <div className="px-4 mt-4">
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Popular Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setQuery(category.name)}
                    className="p-4 bg-card rounded-2xl flex items-center gap-3 text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 mt-4">
            {activeTab === 'products' ? (
              filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="empty-state mt-12">
                  <span className="text-4xl mb-4">🔍</span>
                  <h3 className="font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try searching for something else
                  </p>
                </div>
              )
            ) : (
              filteredShops.length > 0 ? (
                <div className="space-y-4">
                  {filteredShops.map((shop, index) => (
                    <ShopCard key={shop.id} shop={shop} index={index} />
                  ))}
                </div>
              ) : (
                <div className="empty-state mt-12">
                  <span className="text-4xl mb-4">🏪</span>
                  <h3 className="font-semibold text-foreground mb-2">No shops found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try searching for a different shop name
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

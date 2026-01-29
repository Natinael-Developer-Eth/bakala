import { motion } from 'framer-motion';
import { Plus, Heart } from 'lucide-react';
import { Product } from '@/types/app';
import { useApp } from '@/contexts/AppContext';
import fruitsImage from '@/assets/category-fruits.jpg';
import vegetablesImage from '@/assets/category-vegetables.jpg';

interface ProductCardProps {
  product: Product;
  index?: number;
  size?: 'small' | 'medium';
}

export function ProductCard({ product, index = 0, size = 'medium' }: ProductCardProps) {
  const { addToCart, cart } = useApp();
  const cartItem = cart.find(item => item.id === product.id);

  const getProductImage = () => {
    if (product.category.includes('Fruit')) return fruitsImage;
    if (product.category.includes('Vegetable')) return vegetablesImage;
    return fruitsImage;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product, 1);
    }
  };

  return (
    <motion.div
      className={`relative bg-card rounded-2xl overflow-hidden border border-border/50 ${size === 'small' ? 'p-2' : 'p-3'} flex flex-col h-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
    >
      {/* Product Image Area */}
      <div className={`relative mb-3 flex items-center justify-center bg-gray-50 rounded-xl ${size === 'small' ? 'h-24' : 'h-36'}`}>
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-contain p-2 mix-blend-multiply"
        />

        {/* Badges Container */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Best Sale
            </span>
          )}
          {/* Example tag - in real app this would come from product data */}
          <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Frozen
          </span>
        </div>

        {/* Favorite Button (top right) */}
        <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors text-muted-foreground hover:text-red-500 shadow-sm">
          <Heart size={16} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col space-y-1">
        <h4 className={`font-semibold text-foreground line-clamp-2 leading-tight ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
          {product.name}
        </h4>

        <p className="text-xs text-muted-foreground font-medium">
          {product.unit || '1000g'}
        </p>

        {/* Rating Mockup */}
        <div className="flex items-center gap-1">
          <span className="text-orange-400 text-xs text-[10px]">★ 4.8</span>
          <span className="text-muted-foreground text-[10px]">(5)</span>
        </div>
      </div>

      {/* Price & Action */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className={`font-bold text-foreground ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-red-500/50">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <motion.button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`
            flex items-center justify-center rounded-full shadow-lg
            ${product.inStock
              ? 'bg-primary text-primary-foreground hover:bg-primary-dark'
              : 'bg-muted text-muted-foreground cursor-not-allowed'}
            ${size === 'small' ? 'w-8 h-8' : 'w-10 h-10'}
          `}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {cartItem ? (
            <span className="text-xs font-bold">{cartItem.quantity}</span>
          ) : (
            <Plus size={size === 'small' ? 16 : 20} strokeWidth={3} />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

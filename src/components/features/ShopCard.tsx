import { motion } from 'framer-motion';
import { Star, Clock, CheckCircle } from 'lucide-react';
import { Shop } from '@/types/app';
import { Link } from 'react-router-dom';
import shopImage from '@/assets/shop-placeholder.jpg';

interface ShopCardProps {
  shop: Shop;
  index?: number;
}

export function ShopCard({ shop, index = 0 }: ShopCardProps) {
  return (
    <Link to={`/shop/${shop.id}`}>
      <motion.div
        className="shop-card min-w-[180px] sm:min-w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shop Image */}
        <div className="relative w-full h-24 rounded-xl overflow-hidden mb-3 bg-muted">
          <img
            src={shopImage}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          {!shop.isOpen && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Closed</span>
            </div>
          )}
        </div>

        {/* Shop Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-1">
              {shop.name}
            </h3>
            {shop.isVerified && (
              <CheckCircle size={14} className="text-primary flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-accent fill-accent" />
              <span className="font-medium">{shop.rating}</span>
            </div>
            <span>•</span>
            <span>{shop.distance}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{shop.deliveryTime}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

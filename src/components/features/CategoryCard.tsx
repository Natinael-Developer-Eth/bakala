import { motion } from 'framer-motion';
import { Category } from '@/types/app';

interface CategoryCardProps {
  category: Category;
  index?: number;
  onClick?: () => void;
  isActive?: boolean;
}

export function CategoryCard({ category, index = 0, onClick, isActive }: CategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-2xl min-w-[80px] transition-all ${
        isActive 
          ? 'bg-primary text-primary-foreground shadow-glow' 
          : 'bg-card text-foreground hover:bg-secondary'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="text-xs font-medium text-center leading-tight line-clamp-2">
        {category.name}
      </span>
    </motion.button>
  );
}

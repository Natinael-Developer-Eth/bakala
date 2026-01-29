import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const MenuRow = ({ item }: { item: any }) => {
    const Icon = item.icon;
    return (
        <Link to={item.path} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors active:bg-muted">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
                <Icon size={18} />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            {item.badge && (
                <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent-dark text-[10px] font-bold uppercase tracking-wide mr-2">
                    {item.badge}
                </span>
            )}
            <ChevronRight size={16} className="text-muted-foreground/50" />
        </Link>
    );
};

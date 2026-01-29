import { motion } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { BottomNav } from '@/components/layout/BottomNav';
import { chatThreads } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import shopImage from '@/assets/shop-placeholder.jpg';
import runnerImage from '@/assets/runner-placeholder.jpg';

export default function MessagesScreen() {
  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-foreground">Messages</h1>
            <button className="p-2 bg-secondary rounded-xl">
              <Search size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Chat List */}
        {chatThreads.length > 0 ? (
          <div className="px-4 space-y-2">
            {chatThreads.map((thread, index) => (
              <motion.button
                key={thread.id}
                className="w-full card-flat flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img
                      src={thread.type === 'shop' ? shopImage : runnerImage}
                      alt={thread.participantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {thread.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">
                      {thread.participantName}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatDistanceToNow(thread.lastMessageTime, { addSuffix: false })}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    thread.unreadCount > 0 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    {thread.lastMessage}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="empty-state mt-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4"
            >
              <MessageCircle size={32} className="text-muted-foreground" />
            </motion.div>
            <h3 className="font-semibold text-foreground mb-2">No messages yet</h3>
            <p className="text-sm text-muted-foreground">
              Start a conversation with a shop or runner
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

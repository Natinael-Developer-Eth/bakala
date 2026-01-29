// App-wide type definitions for Bakala Everywhere

export interface Shop {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  isVerified: boolean;
  isOpen: boolean;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  shopId: string;
  unit?: string;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shop: Shop;
  status: OrderStatus;
  total: number;
  deliveryFee: number;
  createdAt: Date;
  estimatedDelivery: string;
  runner?: Runner;
  deliveryAddress: string;
  paymentMethod: string;
}

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface Runner {
  id: string;
  name: string;
  phone: string;
  image: string;
  rating: number;
  vehicleType: 'bike' | 'scooter';
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantImage: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  type: 'shop' | 'runner';
}

export interface User {
  id: string;
  name: string;
  phone: string;
  image?: string;
  email?: string;
  address: string;
  location: {
    lat: number;
    lng: number;
    area: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

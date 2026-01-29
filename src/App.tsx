import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Screens
import SplashScreen from "./pages/SplashScreen";
import IntroScreen from "./pages/IntroScreen";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import ShopScreen from "./pages/ShopScreen";
import CartScreen from "./pages/CartScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import OrderTrackingScreen from "./pages/OrderTrackingScreen";
import SearchScreen from "./pages/SearchScreen";
import MessagesScreen from "./pages/MessagesScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/intro" element={<IntroScreen />} />
            <Route path="/onboarding" element={<IntroScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/shop/:id" element={<ShopScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/order-tracking" element={<OrderTrackingScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/messages" element={<MessagesScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />

            {/* Placeholder routes */}
            <Route path="/orders" element={<ProfileScreen />} />
            <Route path="/favorites" element={<ProfileScreen />} />
            <Route path="/addresses" element={<ProfileScreen />} />
            <Route path="/payments" element={<ProfileScreen />} />
            <Route path="/promos" element={<ProfileScreen />} />
            <Route path="/notifications" element={<ProfileScreen />} />
            <Route path="/support" element={<ProfileScreen />} />
            <Route path="/settings" element={<ProfileScreen />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

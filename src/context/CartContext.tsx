'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getCart,
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  updateCartItem,
  clearCart as clearCartApi,
} from '@/lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartItem {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  subtotal: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: Cart;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], total: 0 });
      return;
    }

    try {
      setLoading(true);
      const res = await getCart();
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity = 1): Promise<boolean> => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      await addToCartApi(productId, quantity);
      await fetchCart();
      toast.success('Added to cart!');
      return true;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || 'Failed to add to cart');
      return false;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await removeFromCartApi(productId);
      await fetchCart();
      toast.success('Removed from cart');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await updateCartItem(productId, quantity);
      await fetchCart();
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

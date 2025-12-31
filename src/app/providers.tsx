'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { CompareProvider } from '@/context/CompareContext';
import CompareBar from '@/components/CompareBar';
import CompareModal from '@/components/CompareModal';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CompareProvider>
          {children}
          <CompareBar />
          <CompareModal />
          <Toaster position="top-right" />
        </CompareProvider>
      </CartProvider>
    </AuthProvider>
  );
}

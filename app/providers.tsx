"use client";

import { FloatingPlayer } from "@/components/FloatingPlayer";
import { CartProvider } from "@/lib/cart";
import { ToastProvider } from "@/lib/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        {children}
        <FloatingPlayer />
      </CartProvider>
    </ToastProvider>
  );
}

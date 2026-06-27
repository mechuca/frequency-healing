"use client";

import { FloatingPlayer } from "@/components/FloatingPlayer";
import { CartProvider } from "@/lib/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <FloatingPlayer />
    </CartProvider>
  );
}

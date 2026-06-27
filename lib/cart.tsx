"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { useToast } from "@/lib/toast";

type CartLine = {
  slug: string;
  qty: number;
};

type ResolvedLine = CartLine & {
  product: Product;
};

type CartContextValue = {
  items: CartLine[];
  resolved: ResolvedLine[];
  count: number;
  totalUsd: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "frequency-healing.cart.v1";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [storageWarned, setStorageWarned] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      setItems([]);
      if (!storageWarned) {
        showToast({ title: "cart saved for this session only", description: "Your browser blocked local storage.", kind: "error" });
        setStorageWarned(true);
      }
    }
    setHydrated(true);
  }, [showToast, storageWarned]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      if (!storageWarned) {
        showToast({ title: "cart saved for this session only", description: "Your browser blocked local storage.", kind: "error" });
        setStorageWarned(true);
      }
    }
  }, [hydrated, items, showToast, storageWarned]);

  const resolved = useMemo(
    () =>
      items
        .map((line) => {
          const product = PRODUCTS.find((item) => item.slug === line.slug);
          return product ? { ...line, product } : null;
        })
        .filter((line): line is ResolvedLine => line !== null),
    [items],
  );

  const value: CartContextValue = {
    items,
    resolved,
    count: resolved.reduce((sum, line) => sum + line.qty, 0),
    totalUsd: resolved.reduce((sum, line) => sum + line.qty * line.product.priceUsd, 0),
    add: (slug) =>
      setItems((prev) => {
        const existing = prev.find((line) => line.slug === slug);
        if (!existing) return [...prev, { slug, qty: 1 }];
        return prev.map((line) => (line.slug === slug ? { ...line, qty: line.qty + 1 } : line));
      }),
    remove: (slug) => setItems((prev) => prev.filter((line) => line.slug !== slug)),
    setQty: (slug, qty) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((line) => line.slug !== slug) : prev.map((line) => (line.slug === slug ? { ...line, qty } : line)),
      ),
    clear: () => setItems([]),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

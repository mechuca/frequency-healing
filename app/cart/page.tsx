import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartClient } from "./CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your tones.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-6 md:px-10">
        <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Cart</div>
        <h1 className="mt-3 font-display text-5xl lowercase leading-none md:text-7xl">your cart.</h1>
        <CartClient />
      </main>
      <Footer />
    </div>
  );
}

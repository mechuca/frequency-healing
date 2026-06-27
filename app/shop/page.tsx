import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse pure tones.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Catalogue</div>
          <h1 className="mt-3 font-display text-5xl lowercase leading-none md:text-7xl">every tone, ready to preview.</h1>
          <p className="mt-6 max-w-xl leading-7 text-ink-2">
            Tap any cover to hear the first tone live in your browser. Open a product page to preview every track in the set.
          </p>
        </div>
        <ShopClient />
      </main>
      <Footer />
    </div>
  );
}

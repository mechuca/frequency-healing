import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Success",
  description: "Order complete.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto flex min-h-[65svh] max-w-3xl flex-col justify-center px-5 py-24 text-center sm:px-6 md:px-10">
        <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Checkout preview</div>
        <h1 className="mt-3 font-display text-5xl lowercase leading-none md:text-7xl">almost ready.</h1>
        <p className="mx-auto mt-6 max-w-xl leading-7 text-ink-2">
          Checkout is still in preview mode. Stripe Checkout, order storage, and delivery email endpoints now fail loudly if required environment variables or backend implementation are missing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="pill-solid tap">Back to shop</Link>
          <Link href="/science" className="pill-outline tap">Read the science</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

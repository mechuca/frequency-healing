"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";
import { WaveformMark } from "./WaveformMark";

type HeaderProps = {
  variant?: "dark" | "light";
};

export function Header({ variant = "light" }: HeaderProps) {
  const { count } = useCart();
  const dark = variant === "dark";

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-2xl ${dark ? "border-white/5 bg-graphite/42 text-paper" : "border-ink/5 bg-paper/78 text-ink"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 md:px-10">
        <Link href="/" onClick={() => haptic()} className="tap flex items-center gap-2 rounded-full" aria-label="StillTones home">
          <WaveformMark />
          <span className="font-display text-2xl tracking-tight">StillTones</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          <NavLink href="/shop" dark={dark}>Shop</NavLink>
          <NavLink href="/science" dark={dark}>The Science</NavLink>
          <NavLink href="/about" dark={dark}>About</NavLink>
        </nav>

        <Link href="/cart" onClick={() => haptic()} className={dark ? "pill-glass tap" : "pill-outline tap"} aria-label={`Cart with ${count} items`}>
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Cart</span>
          <span className="data-num opacity-70">[{count}]</span>
        </Link>
      </div>
    </header>
  );
}

function NavLink({ href, children, dark }: { href: string; children: React.ReactNode; dark: boolean }) {
  return (
    <Link
      href={href}
      onClick={() => haptic()}
      className={`tap rounded-full px-4 py-2 font-mono text-xs tracking-wide ${
        dark ? "text-paper/75 hover:text-paper" : "text-ink-2 hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { CATEGORY_CLASS } from "@/data/products";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";

export function CartClient() {
  const { resolved, totalUsd, setQty, remove, count } = useCart();

  if (resolved.length === 0) {
    return (
      <div className="mt-16 rounded-[2rem] bg-paper-2 px-6 py-16 text-center">
        <p className="text-ink-2">Nothing here yet.</p>
        <Link href="/shop" className="pill-solid tap mt-6">Browse the catalogue</Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        {resolved.map((line) => (
          <div key={line.slug} className={`${CATEGORY_CLASS[line.product.category]} hairline-b grid gap-4 py-5 transition-colors hover:bg-ink/[0.025] sm:grid-cols-[72px_1fr_auto] sm:items-center lg:grid-cols-[80px_1fr_auto_auto_auto]`}>
            <div className="tone-cover aspect-square w-20 rounded-2xl" />
            <div>
              <Link href={`/product/${line.product.slug}`} className="font-display text-2xl lowercase hover:underline">
                {line.product.title}
              </Link>
              <div className="data-num mt-1 text-[11px] uppercase tracking-widest text-ink-2">{line.product.tracks.length} {line.product.tracks.length === 1 ? "track" : "tracks"} · 11:11:11</div>
            </div>
            <div className="flex w-fit items-center gap-1 rounded-full bg-paper-2 p-1">
              <button onClick={() => { haptic(); setQty(line.slug, line.qty - 1); }} className="tap flex h-8 w-8 items-center justify-center rounded-full hover:bg-paper" aria-label={`Decrease ${line.product.title}`}>
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="data-num w-7 text-center text-sm">{line.qty}</span>
              <button onClick={() => { haptic(); setQty(line.slug, line.qty + 1); }} className="tap flex h-8 w-8 items-center justify-center rounded-full hover:bg-paper" aria-label={`Increase ${line.product.title}`}>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="data-num text-right text-sm lg:w-20">${line.product.priceUsd * line.qty}</div>
            <button onClick={() => { haptic("medium"); remove(line.slug); }} className="tap flex h-9 w-9 items-center justify-center rounded-full text-ink-2 hover:bg-paper-2" aria-label={`Remove ${line.product.title}`}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="hairline-t mt-8 flex flex-col gap-6 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Total · {count} item{count === 1 ? "" : "s"}</div>
          <div className="data-num mt-1 text-4xl">${totalUsd}</div>
        </div>
        <Link href="/success" onClick={() => haptic("success")} className="pill-solid tap w-fit" aria-label="Continue to checkout preview">
          Checkout preview
        </Link>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LABEL, PRODUCTS, type CategoryKey } from "@/data/products";

const FILTERS: CategoryKey[] = ["all", "focus", "sleep", "calm", "study", "energy"];

export function ShopClient() {
  const [active, setActive] = useState<CategoryKey>("all");
  const products = (active === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === active || product.category === "all")).toSorted((a, b) => {
    if (a.kind === "library") return -1;
    if (b.kind === "library") return 1;
    return 0;
  });

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`tap rounded-full px-4 py-2 font-mono text-xs tracking-wide transition ${active === filter ? "bg-ink text-paper" : "bg-paper-2 text-ink-2 hover:text-ink"}`}
            aria-pressed={active === filter}
          >
            {CATEGORY_LABEL[filter]}
          </button>
        ))}
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => <ProductCard key={product.slug} product={product} delay={index * 0.04} />)}
      </div>
    </>
  );
}

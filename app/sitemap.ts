import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/science", "/tools", "/about", "/cart", "/success"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}

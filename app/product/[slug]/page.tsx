import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProduct, PRODUCTS } from "@/data/products";
import { ProductDetail } from "./ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.blurb,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | StillTones`,
      description: product.blurb,
      url: `/product/${product.slug}`,
      images: [
        {
          url: `/product/${product.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${product.title} by StillTones`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | StillTones`,
      description: product.blurb,
      images: [`/product/${product.slug}/opengraph-image`],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  );
}

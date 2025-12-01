import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductCustomization } from "@/components/product/product-customization";
import { ProductReviews } from "@/components/product/product-reviews";
import { getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
import { ChevronRight, Home } from "lucide-react";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} | PrintMaania`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#555555] hover:text-[#222831] transition flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-[#555555]" />
            <span className="text-[#222831] font-medium">Product details</span>
          </nav>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Image Gallery (Mobile: Top) */}
          <div>
            <ImageGallery images={product.images} productTitle={product.title} />
          </div>

          {/* Right Side - Product Info & Customization (Mobile: Bottom) */}
          <div>
            <ProductCustomization product={product} />
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <ProductReviews product={product} />
      </div>
    </main>
  );
}


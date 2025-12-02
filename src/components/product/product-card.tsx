"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { formatPrice, getPriceRange } from "@/lib/pricing";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  showBadges?: boolean;
};

// Helper function to get card background color based on product
const getCardBackgroundColor = (productTitle: string): string => {
  const title = productTitle.toLowerCase();
  if (title.includes("mug")) return "#FFF8E6"; // Beige Cream
  if (title.includes("t-shirt") || title.includes("shirt") || title.includes("hoodie") || title.includes("sweat")) return "#F2F4F6"; // Cool Grey
  if (title.includes("frame")) return "#FFEFD5"; // Soft Brown
  if (title.includes("keychain")) return "#EAF3FF"; // Pale Blue
  if (title.includes("polaroid")) return "#FFE3D7"; // Peach
  // Default colors for other products
  if (title.includes("banner")) return "#E8F5E9"; // Light Green
  if (title.includes("poster")) return "#FFF3E0"; // Light Orange
  if (title.includes("puzzle")) return "#F3E5F5"; // Light Purple
  if (title.includes("sticker")) return "#E1F5FE"; // Light Cyan
  if (title.includes("diary")) return "#FFF9C4"; // Light Yellow
  if (title.includes("bag")) return "#FCE4EC"; // Light Pink
  if (title.includes("pen")) return "#E0F2F1"; // Light Teal
  if (title.includes("certificate")) return "#FFFDE7"; // Very Light Yellow
  if (title.includes("id card")) return "#F1F8E9"; // Light Green
  // Default fallback
  return "#FFFFFF"; // White fallback
};

export const ProductCard = ({ product, showBadges = true }: ProductCardProps) => {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const priceRange = product.pricing
    ? getPriceRange(product.pricing.basePrice, product.pricing.variants, product.pricing.bulkPricing)
    : null;

  // Use first image only - no carousel
  const displayImage = product.images[0];
  const cardBgColor = getCardBackgroundColor(product.title);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product.id, product.slug);
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Calculate unit price if pricing is available
    let unitPrice: number | undefined;
    if (product.pricing) {
      const { calculatePrice } = require("@/lib/pricing");
      const priceCalc = calculatePrice({
        basePrice: product.pricing.basePrice,
        quantity: 1,
      });
      unitPrice = priceCalc.unitPrice;
    }

    addToCart({
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      quantity: 1,
      unitPrice,
      designUploaded: false,
    });
    toast.success("Added to cart!");
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group relative overflow-hidden p-0 transition-all hover:scale-[1.05] hover:shadow-[0_18px_55px_rgba(0,0,0,0.15)]" style={{ backgroundColor: cardBgColor }}>
        <div className="relative h-[220px] overflow-hidden" style={{ backgroundColor: cardBgColor }}>
          {displayImage && (
            <img
              src={displayImage.url}
              alt={displayImage.alt || product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {/* Action Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={handleWishlistToggle}
              className={`rounded-full p-2 backdrop-blur-sm transition ${
                isWishlisted
                  ? "bg-[#FF6B35] text-white"
                  : "bg-[#FFFFFF] text-[#222831] shadow-sm hover:bg-[#FFF4EC]"
              }`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-[#FFD369] p-2 text-[#222831] shadow-sm transition hover:bg-[#FFC947]"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>

          {/* Badges */}
          {showBadges && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.isBestSeller && (
                <span className="rounded-full bg-[#FFD369] px-2 py-1 text-[10px] font-semibold text-[#222831]">
                  Best Seller
                </span>
              )}
              {product.isTrending && (
                <span className="rounded-full bg-[#FFD369] px-2 py-1 text-[10px] font-semibold text-[#222831]">
                  Trending
                </span>
              )}
              {!product.isBestSeller && !product.isTrending && (
                <span className="rounded-full bg-[#FFD369] px-2 py-1 text-[10px] font-semibold text-[#222831]">
                  Popular
                </span>
              )}
            </div>
          )}
        </div>

        <div className="space-y-1 px-4 py-3">
          <h3 className="text-[17px] font-semibold text-[#1A1A1A] line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-[#555555] line-clamp-1">{product.category}</p>
          {priceRange ? (
            <p className="text-[20px] font-bold text-[#1A1A1A]">
              {priceRange.min === priceRange.max
                ? formatPrice(priceRange.min)
                : `₹${priceRange.min.toLocaleString("en-IN")} – ₹${priceRange.max.toLocaleString(
                    "en-IN",
                  )}`}
            </p>
          ) : (
            <p className="text-[20px] font-bold text-[#1A1A1A]">Price on request</p>
          )}
        </div>
      </Card>
    </Link>
  );
};


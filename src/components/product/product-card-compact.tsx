"use client";

import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { formatPrice, getPriceRange } from "@/lib/pricing";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardCompactProps = {
  product: Product;
  showBadges?: boolean;
};

/**
 * Size controls
 */
const CARD_WIDTH = {
  base: "w-[150px]",
  sm: "sm:w-[165px]",
  lg: "lg:w-[170px]",
};
const IMAGE_HEIGHT = "h-[95px]";
const BODY_PADDING = "px-3 py-2.5";

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

// Helper to determine tag label
const getTagLabel = (product: Product): string | null => {
  if (product.isTrending) return "Trending";
  if (product.isBestSeller) return "Best Seller";
  if (product.reviews && product.reviews.rating > 4.5) return "Hot";
  // Check if it's a new product (could use createdAt or array position)
  return null;
};

export const ProductCardCompact = ({ product, showBadges = true }: ProductCardCompactProps) => {
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const priceRange = product.pricing
    ? getPriceRange(product.pricing.basePrice, product.pricing.variants, product.pricing.bulkPricing)
    : null;

  // Use first image only - no carousel
  const displayImage = product.images[0];
  const cardBgColor = getCardBackgroundColor(product.title);
  const tagLabel = getTagLabel(product);

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
  const rating = product.reviews?.rating || 0;

  return (
    <Link href={`/products/${product.slug}`} className={`${CARD_WIDTH.base} ${CARD_WIDTH.sm} ${CARD_WIDTH.lg} block`}>
      <Card className="group relative h-[240px] overflow-hidden p-0 transition-all duration-300 hover:scale-[1.05] border-[#E5E7EB] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(255,107,53,0.25)]" style={{ backgroundColor: cardBgColor }}>
        {/* Gradient Shadow Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#FF6B35]/10 via-transparent to-[#FFD369]/10 pointer-events-none" />
        
        <div className={`relative ${IMAGE_HEIGHT} overflow-hidden`} style={{ backgroundColor: cardBgColor }}>
          {displayImage && (
            <img
              src={displayImage.url}
              alt={displayImage.alt || product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}

          {/* Tag Label Badge */}
          {showBadges && tagLabel && (
            <div className="absolute left-1 top-1 z-10">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-md ${
                tagLabel === "Trending" ? "bg-[#FF6B35]" :
                tagLabel === "Best Seller" ? "bg-[#FFD369] text-[#222831]" :
                tagLabel === "Hot" ? "bg-red-500" :
                "bg-[#FFD369] text-[#222831]"
              }`}>
                {tagLabel}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute right-1 top-1 flex flex-col gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
            <button
              onClick={handleWishlistToggle}
              className={`rounded-full p-1.5 backdrop-blur-sm transition shadow-md ${
                isWishlisted
                  ? "bg-red-500/90 text-white"
                  : "bg-white/90 text-[#222831] hover:bg-white"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-[#FFD369] p-1.5 text-[#222831] backdrop-blur-sm transition hover:bg-[#FFC947] shadow-md"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className={`${BODY_PADDING} space-y-1.5 relative z-10`}>
          <h3 className="text-[0.8rem] font-bold leading-4 text-[#222831] line-clamp-1">{product.title}</h3>
          <p className="text-[0.65rem] uppercase tracking-wide text-[#555555]">{product.category}</p>
          
          {/* Rating Stars */}
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.floor(rating)
                      ? "fill-[#FFD700] text-[#FFD700]"
                      : star <= rating
                      ? "fill-[#FFD700]/50 text-[#FFD700]/50"
                      : "fill-[#E5E7EB] text-[#E5E7EB]"
                  }`}
                />
              ))}
              {product.reviews?.count && (
                <span className="text-[0.65rem] text-[#555555] ml-1">({product.reviews.count})</span>
              )}
            </div>
          )}
          
          {priceRange ? (
            <p className="text-sm font-bold text-[#222831]">
              {priceRange.min === priceRange.max
                ? formatPrice(priceRange.min)
                : `From ${formatPrice(priceRange.min)}`}
            </p>
          ) : (
            <p className="text-sm font-bold text-[#222831]">Price on request</p>
          )}
        </div>
      </Card>
    </Link>
  );
};

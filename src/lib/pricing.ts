export type PriceVariant = {
  color?: string;
  size?: string;
  material?: string;
  price: number;
};

export type BulkPricingTier = {
  minQuantity: number;
  pricePerUnit: number;
  discountPercent?: number;
};

export type ProductPricing = {
  basePrice: number;
  variants?: PriceVariant[];
  bulkPricing?: BulkPricingTier[];
  setupFee?: number; // One-time setup/design fee
};

export type PriceCalculationParams = {
  basePrice: number;
  quantity: number;
  color?: string;
  size?: string;
  material?: string;
  variants?: PriceVariant[];
  bulkPricing?: BulkPricingTier[];
  setupFee?: number;
  couponDiscount?: number; // Percentage or fixed amount
};

/**
 * Calculate price for a product with variants and quantity-based discounts
 */
export const calculatePrice = ({
  basePrice,
  quantity,
  color,
  size,
  material,
  variants,
  bulkPricing,
  setupFee = 0,
  couponDiscount = 0,
}: PriceCalculationParams): {
  unitPrice: number;
  subtotal: number;
  discount: number;
  setupFee: number;
  total: number;
  savings?: number;
} => {
  // Find variant-specific price if available
  let unitPrice = basePrice;
  if (variants && variants.length > 0) {
    const matchingVariant = variants.find(
      (v) =>
        (!color || v.color === color) &&
        (!size || v.size === size) &&
        (!material || v.material === material),
    );
    if (matchingVariant) {
      unitPrice = matchingVariant.price;
    }
  }

  // Apply bulk pricing if available
  let finalUnitPrice = unitPrice;
  let discount = 0;
  let savings = 0;

  if (bulkPricing && bulkPricing.length > 0) {
    // Sort by minQuantity descending to find the best tier
    const sortedTiers = [...bulkPricing].sort((a, b) => b.minQuantity - a.minQuantity);
    const applicableTier = sortedTiers.find((tier) => quantity >= tier.minQuantity);

    if (applicableTier) {
      finalUnitPrice = applicableTier.pricePerUnit;
      if (applicableTier.discountPercent) {
        discount = (unitPrice * applicableTier.discountPercent) / 100;
        savings = (unitPrice - finalUnitPrice) * quantity;
      } else {
        savings = (unitPrice - finalUnitPrice) * quantity;
      }
    }
  }

  const subtotal = finalUnitPrice * quantity;

  // Apply coupon discount
  let couponDiscountAmount = 0;
  if (couponDiscount > 0) {
    // If discount is > 1, treat as fixed amount, else as percentage
    couponDiscountAmount =
      couponDiscount >= 1
        ? couponDiscount
        : (subtotal + setupFee) * couponDiscount;
  }

  const total = Math.max(0, subtotal + setupFee - couponDiscountAmount);

  return {
    unitPrice: finalUnitPrice,
    subtotal,
    discount: discount * quantity + couponDiscountAmount,
    setupFee,
    total: Math.round(total),
    savings: savings > 0 ? Math.round(savings) : undefined,
  };
};

/**
 * Format price for display
 */
export const formatPrice = (price: number, currency = "₹"): string => {
  return `${currency} ${price.toLocaleString("en-IN")}`;
};

/**
 * Get price range for a product (min and max possible prices)
 */
export const getPriceRange = (
  basePrice: number,
  variants?: PriceVariant[],
  bulkPricing?: BulkPricingTier[],
): { min: number; max: number } => {
  let minPrice = basePrice;
  let maxPrice = basePrice;

  if (variants && variants.length > 0) {
    const variantPrices = variants.map((v) => v.price);
    minPrice = Math.min(...variantPrices, basePrice);
    maxPrice = Math.max(...variantPrices, basePrice);
  }

  // Apply bulk pricing if available (lowest tier for max savings)
  if (bulkPricing && bulkPricing.length > 0) {
    const highestTier = bulkPricing.reduce((prev, current) =>
      prev.minQuantity > current.minQuantity ? prev : current,
    );
    minPrice = Math.min(minPrice, highestTier.pricePerUnit);
  }

  return { min: minPrice, max: maxPrice };
};


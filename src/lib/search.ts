import type { Product } from "./products";

export type FilterOptions = {
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  tags?: string[];
  inStock?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
};

export type SortOption = "relevance" | "price-low" | "price-high" | "rating" | "newest" | "popular";

/**
 * Search products by query string
 */
export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) return products;

  const searchTerm = query.toLowerCase();
  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.shortDescription,
      product.fullDescription,
      product.category,
      ...(product.tags || []),
      ...(product.printingMethods || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });
};

/**
 * Filter products by criteria
 */
export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  return products.filter((product) => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(product.category)) {
        return false;
      }
    }

    // Price filter
    if (product.pricing) {
      const { min, max } = getProductPriceRange(
        product.pricing.basePrice,
        product.pricing.variants?.map((v) => ({
          color: v.color,
          size: v.size,
          material: v.material,
          price: v.price,
        })),
        product.pricing.bulkPricing,
      );
      if (filters.minPrice && max < filters.minPrice) return false;
      if (filters.maxPrice && min > filters.maxPrice) return false;
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      if (!product.sizes || !product.sizes.some((size) => filters.sizes!.includes(size))) {
        return false;
      }
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      if (!product.colors || !product.colors.some((color) => filters.colors!.includes(color.name))) {
        return false;
      }
    }

    // Material filter
    if (filters.materials && filters.materials.length > 0) {
      if (!product.materials || !product.materials.some((material) => filters.materials!.includes(material))) {
        return false;
      }
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      if (!product.tags || !product.tags.some((tag) => filters.tags!.includes(tag))) {
        return false;
      }
    }

    // Best seller filter
    if (filters.isBestSeller !== undefined && product.isBestSeller !== filters.isBestSeller) {
      return false;
    }

    // Trending filter
    if (filters.isTrending !== undefined && product.isTrending !== filters.isTrending) {
      return false;
    }

    return true;
  });
};

/**
 * Sort products
 */
export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => {
        const aPrice = a.pricing?.basePrice || 0;
        const bPrice = b.pricing?.basePrice || 0;
        return aPrice - bPrice;
      });

    case "price-high":
      return sorted.sort((a, b) => {
        const aPrice = a.pricing?.basePrice || 0;
        const bPrice = b.pricing?.basePrice || 0;
        return bPrice - aPrice;
      });

    case "rating":
      return sorted.sort((a, b) => {
        const aRating = a.reviews?.rating || 0;
        const bRating = b.reviews?.rating || 0;
        return bRating - aRating;
      });

    case "newest":
      // Assuming newer products have higher IDs or we track creation date
      return sorted.reverse();

    case "popular":
      return sorted.sort((a, b) => {
        const aCount = a.reviews?.count || 0;
        const bCount = b.reviews?.count || 0;
        return bCount - aCount;
      });

    case "relevance":
    default:
      return sorted;
  }
};


/**
 * Combined search, filter, and sort
 */
export const searchFilterSortProducts = (
  products: Product[],
  query?: string,
  filters?: FilterOptions,
  sortBy: SortOption = "relevance",
): Product[] => {
  let result = products;

  // Apply search
  if (query) {
    result = searchProducts(result, query);
  }

  // Apply filters
  if (filters) {
    result = filterProducts(result, filters);
  }

  // Apply sort
  result = sortProducts(result, sortBy);

  return result;
};


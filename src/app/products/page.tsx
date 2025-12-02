"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import {
  searchFilterSortProducts,
  type FilterOptions,
  type SortOption,
} from "@/lib/search";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { formatPrice, getPriceRange } from "@/lib/pricing";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-low");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = activeSuggestion ?? searchQuery;
    return searchFilterSortProducts(products, q, filters, sortBy);
  }, [searchQuery, filters, sortBy, activeSuggestion]);

  const suggestions = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      )
      .slice(0, 5);
  }, [searchQuery]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const highlight = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "ig");
    return text.split(regex).map((part, idx) =>
      regex.test(part) ? (
        <span key={idx} className="bg-yellow-200/60 text-gray-900">
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      ),
    );
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-[#222831]">All Products</h1>
          <p className="text-[#555555]">
            Search and filter your favourite PrintMania products.
          </p>
        </div>

        {/* Large search bar + sort */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveSuggestion(null);
              }}
              placeholder="Search by product name or category..."
              className="h-12 rounded-xl border border-gray-300 bg-white pl-12 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-20 mt-2 w-full rounded-xl bg-white py-2 text-sm text-gray-800 shadow-xl border border-gray-200">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setActiveSuggestion(s.title);
                      setSearchQuery(s.title);
                    }}
                  >
                    <span className="truncate">{highlight(s.title)}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      in {highlight(s.category)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <select
              value={filters.category?.[0] || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value ? [e.target.value] : undefined,
                })
              }
              className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 shadow-sm focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 shadow-sm focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="popular">Trending</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-[#555555]">
          Showing <span className="font-semibold text-[#222831]">{filteredProducts.length}</span> of <span className="font-semibold text-[#222831]">{products.length}</span> products
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-gray-200 shadow-sm">
            <p className="text-[#555555]">
              No products found. Try a different search or category.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const priceRange = product.pricing
                ? getPriceRange(
                    product.pricing.basePrice,
                    product.pricing.variants,
                    product.pricing.bulkPricing,
                  )
                : null;

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-200">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.images[0]?.url || "/placeholder.png"}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {product.isBestSeller && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#FFD369] px-2 py-1 text-xs font-semibold text-[#222831] shadow-md">
                          Best Seller
                        </span>
                      )}
                      {product.isTrending && (
                        <span className="absolute right-2 top-2 rounded-full bg-[#FF6B35] px-2 py-1 text-xs font-semibold text-white shadow-md">
                          Trending
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-1 text-base font-semibold text-[#222831] line-clamp-2 min-h-[2.5rem]">
                        {highlight(product.title)}
                      </h3>
                      <p className="mb-2 text-xs uppercase tracking-wide text-[#555555]">
                        {highlight(product.category)}
                      </p>
                      {product.reviews && (
                        <div className="mb-2 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                          <span className="text-xs text-[#555555]">
                            {product.reviews.rating} ({product.reviews.count})
                          </span>
                        </div>
                      )}
                      {priceRange ? (
                        <p className="mt-2 text-lg font-bold text-[#222831]">
                          {priceRange.min === priceRange.max
                            ? formatPrice(priceRange.min)
                            : `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm font-semibold text-[#555555]">Price on request</p>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}


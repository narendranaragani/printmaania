"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { products } from "@/lib/products";
import { formatPrice, getPriceRange } from "@/lib/pricing";
import { Star, Plus, Minus, ShoppingCart, Zap, Truck, Shield, CheckCircle2, Package, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Mock product for demo - in real app, get from URL params or state
const mockProduct = products[0] || {
  id: "1",
  title: "Custom Printed Mug",
  slug: "custom-mug",
  images: [{ url: "/placeholder.png", alt: "Mug", type: "mockup" }],
  pricing: { basePrice: 299 },
  reviews: { rating: 4.5, count: 128 },
  estimatedDelivery: "5-7 business days",
  shortDescription: "High-quality ceramic mug with custom printing",
  colors: [{ name: "White" }, { name: "Black" }],
  sizes: ["11oz", "15oz"],
  materials: ["Ceramic"],
  isBestSeller: true,
};

export default function NormalOrderPage() {
  const router = useRouter();
  const { addItem, getTotalItems } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(mockProduct.sizes?.[0] || "");
  const [selectedMaterial, setSelectedMaterial] = useState(mockProduct.materials?.[0] || "");
  const [stockStatus] = useState<"in_stock" | "low_stock">("in_stock");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const basePrice = mockProduct.pricing?.basePrice || 299;
  const totalPrice = basePrice * quantity;
  const shipping = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shipping;

  const handleAddToCart = () => {
    addItem({
      id: mockProduct.id,
      title: mockProduct.title,
      price: basePrice,
      quantity,
      image: mockProduct.images[0]?.url || "",
    });
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const recommendedProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#FF6B35]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#FF6B35]">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{mockProduct.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Product Image & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                    <img
                      src={mockProduct.images[0]?.url || "/placeholder.png"}
                      alt={mockProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {mockProduct.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockProduct.title}</h1>
                    <p className="text-gray-600 text-sm">{mockProduct.shortDescription}</p>
                  </div>

                  {/* Rating */}
                  {mockProduct.reviews && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{mockProduct.reviews.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({mockProduct.reviews.count} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">{formatPrice(basePrice)}</span>
                      <span className="text-gray-500 line-through text-lg">₹399</span>
                      <span className="text-green-600 text-sm font-semibold">25% off</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    {stockStatus === "in_stock" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-semibold">In Stock</span>
                      </>
                    ) : (
                      <>
                        <Package className="h-5 w-5 text-orange-600" />
                        <span className="text-orange-600 font-semibold">Low Stock - Only 3 left!</span>
                      </>
                    )}
                  </div>

                  {/* Variants */}
                  {mockProduct.colors && mockProduct.colors.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Color: <span className="text-gray-600">{selectedColor}</span>
                      </label>
                      <div className="flex gap-2">
                        {mockProduct.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`h-10 w-10 rounded-full border-2 transition ${
                              selectedColor === color.name
                                ? "border-[#FF6B35] scale-110"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{ backgroundColor: color.hex || "#fff" }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {mockProduct.sizes && mockProduct.sizes.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Size</label>
                      <div className="flex gap-2">
                        {mockProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                              selectedSize === size
                                ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {mockProduct.materials && mockProduct.materials.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Material</label>
                      <div className="flex gap-2">
                        {mockProduct.materials.map((material) => (
                          <button
                            key={material}
                            onClick={() => setSelectedMaterial(material)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                              selectedMaterial === material
                                ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                                : "border-gray-300 text-gray-700 hover:border-gray-400"
                            }`}
                          >
                            {material}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#FF6B35] text-[#FF6B35] rounded-xl font-semibold hover:bg-[#FF6B35]/5 transition"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#e45d2f] transition shadow-md"
                    >
                      <Zap className="h-5 w-5" />
                      Buy Now
                    </button>
                  </div>

                  {/* Delivery Estimate */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Delivery Estimate</p>
                      <p className="text-sm text-gray-600">{mockProduct.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p>{mockProduct.fullDescription || mockProduct.shortDescription}</p>
                {mockProduct.printingMethods && (
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Printing Methods:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {mockProduct.printingMethods.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            {mockProduct.reviews && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-gray-900">{mockProduct.reviews.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(mockProduct.reviews!.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{mockProduct.reviews.count} verified reviews</p>
                  </div>
                </div>
                <button className="text-[#FF6B35] font-semibold text-sm hover:underline">
                  View all reviews →
                </button>
              </div>
            )}

            {/* Recommended Products */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for You</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedProducts.map((product) => {
                  const priceRange = product.pricing
                    ? getPriceRange(
                        product.pricing.basePrice,
                        product.pricing.variants,
                        product.pricing.bulkPricing,
                      )
                    : null;
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group"
                    >
                      <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden mb-2">
                        <img
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                        {product.title}
                      </p>
                      {priceRange && (
                        <p className="text-sm font-bold text-[#FF6B35]">
                          {formatPrice(priceRange.min)}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
                  <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={mockProduct.images[0]?.url || "/placeholder.png"}
                      alt={mockProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{mockProduct.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedColor && `Color: ${selectedColor}`}
                      {selectedSize && ` • Size: ${selectedSize}`}
                      {selectedMaterial && ` • ${selectedMaterial}`}
                    </p>
                    <p className="text-xs text-gray-500">Qty: {quantity}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({quantity} items)</span>
                    <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping === 0 && totalPrice < 500 && (
                    <p className="text-xs text-green-600">
                      Add ₹{500 - totalPrice} more for free shipping
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Payable</span>
                    <span className="text-2xl font-bold text-[#FF6B35]">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure payment • 7-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Free delivery on orders above ₹500</span>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#e45d2f] transition shadow-md mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Add to Cart {mounted && `(${getTotalItems()})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


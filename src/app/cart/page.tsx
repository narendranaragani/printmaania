"use client";

import { useCartStore, type CartItem } from "@/store/cart-store";
import { useSaveForLaterStore } from "@/store/save-for-later-store";
import { getProductBySlug } from "@/lib/products";
import { calculatePrice, formatPrice } from "@/lib/pricing";
import { Trash2, Plus, Minus, ShoppingBag, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateItem, getTotalItems } = useCartStore();
  const { addItem: addToSaveLater, items: savedItems } = useSaveForLaterStore();
  const [savedForLater, setSavedForLater] = useState<string[]>([]);

  // Calculate totals
  const calculations = items.map((item) => {
    const product = getProductBySlug(item.productSlug || item.productId);
    if (!product || !product.pricing) {
      return {
        item,
        subtotal: item.unitPrice ? item.unitPrice * item.quantity : 0,
        discount: 0,
        setupFee: 0,
      };
    }

    const priceCalc = calculatePrice({
      basePrice: product.pricing.basePrice,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      material: item.material,
      variants: product.pricing.variants,
      bulkPricing: product.pricing.bulkPricing,
      setupFee: product.pricing.setupFee,
    });

    return {
      item,
      subtotal: priceCalc.subtotal,
      discount: priceCalc.discount ?? 0,
      setupFee: priceCalc.setupFee ?? 0,
    };
  });

  const subtotal = calculations.reduce((sum, calc) => sum + calc.subtotal, 0);
  const totalDiscount = calculations.reduce(
    (sum, calc) => sum + (calc.discount ?? 0),
    0
  );
  const totalSetupFee = calculations.reduce(
    (sum, calc) => sum + (calc.setupFee ?? 0),
    0
  );
  const deliveryCharge = subtotal > 500 ? 0 : 50; // Free delivery above ₹500
  const total = subtotal + totalSetupFee + deliveryCharge - totalDiscount;

  const handleQuantityChange = (
    productId: string,
    currentQty: number,
    delta: number
  ) => {
    const newQty = Math.max(1, currentQty + delta);
    updateItem(productId, { quantity: newQty });
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast.success("Item removed from cart");
  };

  const handleSaveForLater = (item: CartItem) => {
    addToSaveLater(item);
    removeItem(item.productId);
    setSavedForLater([...savedForLater, item.productId]);
    toast.success("Saved for later");
  };

  const handleMoveToCart = (item: CartItem) => {
    const { addItem } = useCartStore.getState();
    addItem(item);
    const { removeItem: removeSaved } = useSaveForLaterStore.getState();
    removeSaved(item.productId);
    toast.success("Moved to cart");
  };

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-[#555555]" />
              <h1 className="mb-2 text-2xl font-bold text-[#222831]">
                Your cart is empty
              </h1>
              <p className="mb-6 text-[#555555]">
                Add some products to get started!
              </p>
              <Link href="/#services">
                <button className="rounded-full bg-[#FFD369] px-6 py-2.5 font-semibold text-[#222831] transition hover:bg-[#FFC947]">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#222831]">Shopping Cart</h1>
          {items.length > 0 && (
            <p className="mt-1 text-sm text-[#555555]">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = getProductBySlug(
                item.productSlug || item.productId
              );
              const calc = calculations.find(
                (c) => c.item.productId === item.productId
              );
              const productImage =
                product?.images[0]?.url || "/placeholder.png";

              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-4"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-[#F3F3F3]">
                      <img
                        src={productImage}
                        alt={item.productTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#222831] line-clamp-2 mb-1">
                        {item.productTitle}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-[#555555] mb-2">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                        {item.material && <span>Material: {item.material}</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity,
                                -1
                              )
                            }
                            className="h-8 w-8 flex items-center justify-center border border-[#E5E7EB] rounded-md hover:bg-[#F8F8F8] transition"
                          >
                            <Minus className="h-4 w-4 text-[#555555]" />
                          </button>
                          <span className="text-sm font-medium text-[#222831] min-w-[30px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity,
                                1
                              )
                            }
                            className="h-8 w-8 flex items-center justify-center border border-[#E5E7EB] rounded-md hover:bg-[#F8F8F8] transition"
                          >
                            <Plus className="h-4 w-4 text-[#555555]" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#222831]">
                            {formatPrice(calc?.subtotal ?? 0)}
                          </p>
                          {calc?.discount && calc.discount > 0 && (
                            <p className="text-xs text-[#4CAF50]">
                              Save {formatPrice(calc.discount)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E5E7EB]">
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="flex items-center gap-1 text-xs text-[#FF6B35] hover:text-[#E85A24] transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="flex items-center gap-1 text-xs text-[#555555] hover:text-[#222831] transition"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          Save for Later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Save for Later Section */}
            {savedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#222831] mb-4">
                  Saved for Later ({savedItems.length})
                </h2>
                <div className="space-y-4">
                  {savedItems.map((item) => {
                    const product = getProductBySlug(
                      item.productSlug || item.productId
                    );
                    const productImage =
                      product?.images[0]?.url || "/placeholder.png";

                    return (
                      <div
                        key={item.productId}
                        className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-4 opacity-75"
                      >
                        <div className="flex gap-4">
                          <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-[#F3F3F3]">
                            <img
                              src={productImage}
                              alt={item.productTitle}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-[#222831] line-clamp-1 mb-2">
                              {item.productTitle}
                            </h3>
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="text-xs font-medium text-[#FF6B35] hover:text-[#E85A24] transition"
                            >
                              Move to Cart
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              const { removeItem: removeSaved } =
                                useSaveForLaterStore.getState();
                              removeSaved(item.productId);
                              toast.success("Removed");
                            }}
                            className="text-[#555555] hover:text-[#FF6B35] transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/#services"
                className="text-sm font-medium text-[#FF6B35] hover:text-[#E85A24] transition inline-flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Side - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-4 sticky top-24">
              <h2 className="text-lg font-semibold text-[#222831] mb-4">
                Price Details
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#555555]">
                    Price ({getTotalItems()} items)
                  </span>
                  <span className="text-[#222831]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {totalSetupFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#555555]">Setup Fee</span>
                    <span className="text-[#222831]">
                      {formatPrice(totalSetupFee)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#555555]">Delivery Charges</span>
                  <span
                    className={
                      deliveryCharge === 0
                        ? "text-[#4CAF50]"
                        : "text-[#222831]"
                    }
                  >
                    {deliveryCharge === 0
                      ? "FREE"
                      : formatPrice(deliveryCharge)}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Discount</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-[#E5E7EB] pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-[#222831]">
                      Total Amount
                    </span>
                    <span className="text-lg font-bold text-[#222831]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                {deliveryCharge === 0 && (
                  <p className="text-xs text-[#4CAF50] mt-2">
                    You saved ₹50 on delivery!
                  </p>
                )}
              </div>

              <Link href="/checkout" className="block mt-6">
                <button className="w-full bg-[#FF6B35] hover:bg-[#E85A24] text-white font-semibold py-3 rounded-lg transition text-sm">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Checkout Button */}
        {items.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] p-4 shadow-lg z-50">
            <Link href="/checkout" className="block">
              <button className="w-full bg-[#FF6B35] hover:bg-[#E85A24] text-white font-semibold py-3 rounded-lg transition text-sm">
                Place Order ({formatPrice(total)})
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

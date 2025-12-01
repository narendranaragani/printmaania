"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { getProductBySlug } from "@/lib/products";
import { calculatePrice, formatPrice } from "@/lib/pricing";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Upload, MessageSquare, Wallet, CreditCard, MessageCircle } from "lucide-react";
import Link from "next/link";

type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  isDefault: boolean;
};

type PaymentMethod = "cod" | "whatsapp" | "upi";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalItems } = useCartStore();
  const { addOrder } = useOrderStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  // Address form state
  const [newAddress, setNewAddress] = useState<Omit<Address, "id" | "isDefault">>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  // Mock saved addresses (in real app, this would come from API/store)
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      phone: "+91 98765 43210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      pincode: "400001",
      state: "Maharashtra",
      isDefault: true,
    },
  ]);

  // Calculate totals
  const calculations = items.map((item) => {
    const product = getProductBySlug(item.productSlug || item.productId);
    if (!product || !product.pricing) {
      return { item, subtotal: item.unitPrice ? item.unitPrice * item.quantity : 0, discount: 0, setupFee: 0 };
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
      discount: priceCalc.discount || 0,
      setupFee: priceCalc.setupFee || 0,
    };
  });

  const subtotal = calculations.reduce((sum, calc) => sum + calc.subtotal, 0);
  const totalDiscount = calculations.reduce((sum, calc) => sum + calc.discount, 0);
  const totalSetupFee = calculations.reduce((sum, calc) => sum + calc.setupFee, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + totalSetupFee + deliveryCharge - totalDiscount;

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses.find((a) => a.isDefault);

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      toast.error("Please fill all required fields");
      return;
    }

    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: savedAddresses.length === 0,
    };

    setSavedAddresses([...savedAddresses, address]);
    setSelectedAddressId(address.id);
    setShowAddAddress(false);
    setNewAddress({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      state: "",
    });
    toast.success("Address added successfully");
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
      return;
    }

    try {
      // Create order
      const orderItems = calculations.map((calc) => ({
        productId: calc.item.productId,
        productTitle: calc.item.productTitle,
        quantity: calc.item.quantity,
        unitPrice: calc.item.unitPrice || calc.subtotal / calc.item.quantity,
        color: calc.item.color,
        size: calc.item.size,
        material: calc.item.material,
        customOptions: calc.item.customOptions,
        subtotal: calc.subtotal,
      }));

      const order = addOrder({
        customerName: selectedAddress.name,
        phone: selectedAddress.phone,
        email: undefined,
        address: `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
        items: orderItems,
        subtotal,
        discount: totalDiscount,
        setupFee: totalSetupFee,
        total: Math.round(total),
        status: "order_received",
        paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "whatsapp" ? "WhatsApp Order" : "UPI",
      });

      // Generate WhatsApp message if WhatsApp payment method
      if (paymentMethod === "whatsapp") {
        const intro = "*Order Confirmation* 🛒";
        const lines = [
          `*Order Number:* ${order.orderNumber}`,
          `*Total Amount:* ${formatPrice(total)}`,
          "",
          `*Customer:* ${selectedAddress.name}`,
          `*Phone:* ${selectedAddress.phone}`,
          `*Address:* ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
          "",
          "*Items:*",
        ];

        items.forEach((item, index) => {
          lines.push(`${index + 1}. *${item.productTitle}*`);
          lines.push(`   Quantity: ${item.quantity}`);
          if (item.color) lines.push(`   Color: ${item.color}`);
          if (item.size) lines.push(`   Size: ${item.size}`);
        });

        lines.push("");
        lines.push("---------------------------");
        lines.push("*Please attach your design files in this WhatsApp chat*");

        const message = [intro, ...lines].join("\n");
        const link = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(link, "_blank");
      }

      toast.success(`Order ${order.orderNumber} placed successfully!`);
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-2 text-2xl font-bold text-[#222831]">Your cart is empty</h1>
              <p className="mb-6 text-[#555555]">Add some products to checkout!</p>
              <Link href="/cart">
                <button className="rounded-full bg-[#FFD369] px-6 py-2.5 font-semibold text-[#222831] transition hover:bg-[#FFC947]">
                  Go to Cart
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
        <h1 className="mb-6 text-2xl font-bold text-[#222831]">Checkout</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#222831] flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#FF6B35]" />
                  Delivery Address
                </h2>
                {!showAddAddress && (
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="text-sm font-medium text-[#FF6B35] hover:text-[#E85A24] transition"
                  >
                    + Add New
                  </button>
                )}
              </div>

              {showAddAddress ? (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                    />
                  </div>
                  <textarea
                    placeholder="Address *"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    rows={2}
                    className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                  />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <input
                      type="text"
                      placeholder="City *"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                    />
                    <input
                      type="text"
                      placeholder="State *"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                    />
                    <input
                      type="text"
                      placeholder="Pincode *"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddAddress}
                      className="flex-1 bg-[#FF6B35] text-white font-semibold py-2 rounded-md text-sm hover:bg-[#E85A24] transition"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 border border-[#E5E7EB] rounded-md text-sm hover:bg-[#F8F8F8] transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex items-start gap-3 p-4 rounded-md border-2 cursor-pointer transition ${
                        selectedAddressId === address.id || (selectedAddressId === null && address.isDefault)
                          ? "border-[#FF6B35] bg-[#FFF5F2]"
                          : "border-[#E5E7EB] hover:border-[#FFD369]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address.id || (selectedAddressId === null && address.isDefault)}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-[#222831] text-sm">{address.name}</p>
                          {address.isDefault && (
                            <span className="text-xs bg-[#FF6B35] text-white px-2 py-0.5 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-xs text-[#555555] mb-1">{address.address}</p>
                        <p className="text-xs text-[#555555]">{address.city}, {address.state} - {address.pincode}</p>
                        <p className="text-xs text-[#555555] mt-1">{address.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Design / Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
              <h2 className="text-lg font-semibold text-[#222831] mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#FF6B35]" />
                Design & Notes
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#222831] mb-2">Upload Design File (Optional)</label>
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-[#E5E7EB] rounded-md p-4 cursor-pointer hover:border-[#FF6B35] transition">
                    <Upload className="h-4 w-4 text-[#555555]" />
                    <span className="text-sm text-[#555555]">
                      {designFile ? designFile.name : "Click to upload JPG/PNG/PDF"}
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setDesignFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222831] mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#555555]" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions..."
                    rows={3}
                    className="w-full rounded-md border border-[#E5E7EB] px-3 py-2 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
              <h2 className="text-lg font-semibold text-[#222831] mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-[#FF6B35] bg-[#FFF5F2]"
                      : "border-[#E5E7EB] hover:border-[#FFD369]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4"
                  />
                  <Wallet className="h-5 w-5 text-[#FF6B35]" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#222831] text-sm">Cash on Delivery</p>
                    <p className="text-xs text-[#555555]">Pay when your order is delivered</p>
                  </div>
                  <span className="text-xs font-semibold text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-1 rounded">RECOMMENDED</span>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition ${
                    paymentMethod === "whatsapp"
                      ? "border-[#FF6B35] bg-[#FFF5F2]"
                      : "border-[#E5E7EB] hover:border-[#FFD369]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    checked={paymentMethod === "whatsapp"}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4"
                  />
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#222831] text-sm">WhatsApp Order</p>
                    <p className="text-xs text-[#555555]">Send order details via WhatsApp (No payment required)</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition ${
                    paymentMethod === "upi"
                      ? "border-[#FF6B35] bg-[#FFF5F2]"
                      : "border-[#E5E7EB] hover:border-[#FFD369]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="w-4 h-4"
                  />
                  <CreditCard className="h-5 w-5 text-[#555555]" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#222831] text-sm">UPI / QR Code</p>
                    <p className="text-xs text-[#555555]">Pay via UPI, PhonePe, Google Pay (Coming Soon)</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5 sticky top-24">
              <h2 className="text-lg font-semibold text-[#222831] mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm mb-4">
                {items.slice(0, 3).map((item, index) => {
                  const calc = calculations[index];
                  return (
                    <div key={item.productId} className="flex justify-between text-xs">
                      <span className="text-[#555555] line-clamp-1">{item.productTitle} x{item.quantity}</span>
                      <span className="text-[#222831] font-medium">{formatPrice(calc?.subtotal || 0)}</span>
                    </div>
                  );
                })}
                {items.length > 3 && (
                  <p className="text-xs text-[#555555]">+ {items.length - 3} more items</p>
                )}
              </div>

              <div className="border-t border-[#E5E7EB] pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Subtotal</span>
                  <span className="text-[#222831]">{formatPrice(subtotal)}</span>
                </div>
                {totalSetupFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#555555]">Setup Fee</span>
                    <span className="text-[#222831]">{formatPrice(totalSetupFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#555555]">Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-[#4CAF50]" : "text-[#222831]"}>
                    {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-[#4CAF50]">
                    <span>Discount</span>
                    <span>-{formatPrice(totalDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-[#E5E7EB] pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-[#222831]">Total</span>
                    <span className="text-lg font-bold text-[#222831]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!selectedAddress}
                className="w-full bg-[#FF6B35] hover:bg-[#E85A24] disabled:bg-[#E5E7EB] disabled:text-[#555555] text-white font-semibold py-3 rounded-lg transition text-sm mt-6"
              >
                {paymentMethod === "cod" ? "Place Order" : paymentMethod === "whatsapp" ? "Send WhatsApp Order" : "Pay Now"}
              </button>

              <p className="text-xs text-[#555555] text-center mt-3">
                By placing order, you agree to our terms & conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/store/order-store";
import { getStatusInfo, type OrderStatus } from "@/lib/orders";
import { formatPrice } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";
import { CheckCircle2, Circle, Package, Truck, Home, ArrowLeft, Download, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/orders";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { toast } from "sonner";

const statusOrder: OrderStatus[] = ["order_received", "printing", "packed", "shipped", "delivered"];

const statusLabels: Record<OrderStatus, string> = {
  order_received: "Order Placed",
  printing: "Confirmed",
  packed: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  order_received: <CheckCircle2 className="h-5 w-5" />,
  printing: <CheckCircle2 className="h-5 w-5" />,
  packed: <Package className="h-5 w-5" />,
  shipped: <Truck className="h-5 w-5" />,
  delivered: <Home className="h-5 w-5" />,
  cancelled: <Circle className="h-5 w-5" />,
};

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const { getOrderById } = useOrderStore();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4 text-2xl font-bold text-[#222831]">Order Not Found</h1>
              <p className="mb-6 text-[#555555]">The order you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/dashboard">
                <button className="rounded-full bg-[#FFD369] px-6 py-2.5 font-semibold text-[#222831] transition hover:bg-[#FFC947]">
                  <ArrowLeft className="mr-2 inline h-4 w-4" />
                  Back to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentStatusIndex = statusOrder.indexOf(order.status);
  const statusInfo = getStatusInfo(order.status);

  const handleWhatsAppSupport = () => {
    const message = `Hello! I need support for my order ${order.orderNumber}.`;
    const link = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(link, "_blank");
  };

  const handleDownloadInvoice = () => {
    // In real app, this would generate/download PDF invoice
    toast.success("Invoice download will be available soon!");
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="mb-6 inline-flex items-center text-sm text-[#555555] hover:text-[#222831] transition">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-[#222831]">Order #{order.orderNumber}</h1>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    order.status === "delivered"
                      ? "bg-[#4CAF50]/10 text-[#4CAF50]"
                      : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#FF6B35]/10 text-[#FF6B35]"
                  }`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
              <p className="text-sm text-[#555555]">
                Placed on {order.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleWhatsAppSupport}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-md text-sm font-medium hover:bg-[#20BA5A] transition"
              >
                <MessageCircle className="h-4 w-4" />
                Support
              </button>
              <button
                onClick={handleDownloadInvoice}
                className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-md text-sm font-medium text-[#222831] hover:bg-[#F8F8F8] transition"
              >
                <Download className="h-4 w-4" />
                Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#222831] mb-6">Track Your Order</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-6 w-0.5 bg-[#E5E7EB]" />
            <div
              className="absolute left-6 top-0 w-0.5 bg-[#FF6B35] transition-all duration-500"
              style={{ height: `${(currentStatusIndex / (statusOrder.length - 1)) * 100}%` }}
            />

            {/* Status Steps */}
            <div className="space-y-6">
              {statusOrder.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;
                const timelineItem = order.timeline.find((t) => t.status === status);

                return (
                  <div key={status} className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition ${
                        isCompleted
                          ? "border-[#FF6B35] bg-[#FF6B35] text-white"
                          : "border-[#E5E7EB] bg-white text-[#E5E7EB]"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1 pt-2 pb-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={`text-base font-semibold ${
                            isCompleted ? "text-[#222831]" : "text-[#9CA3AF]"
                          }`}
                        >
                          {statusLabels[status]}
                        </h3>
                        {isCurrent && (
                          <span className="px-2 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded text-xs font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      {timelineItem && (
                        <p className="text-xs text-[#555555] mt-1">
                          {timelineItem.timestamp.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                      {isCurrent && timelineItem?.message && (
                        <p className="text-xs text-[#555555] mt-1">{timelineItem.message}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
            <h2 className="text-lg font-semibold text-[#222831] mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#555555]">Order ID</span>
                <span className="font-semibold text-[#222831]">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555555]">Date Placed</span>
                <span className="font-semibold text-[#222831]">
                  {order.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-[#555555]">Tracking Number</span>
                  <span className="font-semibold text-[#222831]">{order.trackingNumber}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-[#E5E7EB]">
                <span className="text-[#555555] flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Estimated Delivery
                </span>
                <span className="font-semibold text-[#FF6B35]">
                  {order.estimatedDelivery
                    ? order.estimatedDelivery.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                    : "TBD"}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
            <h2 className="text-lg font-semibold text-[#222831] mb-4">Delivery Address</h2>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-[#222831]">{order.customerName}</p>
              <p className="text-[#555555]">{order.address}</p>
              <p className="text-[#555555]">Phone: {order.phone}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5 mb-6">
          <h2 className="text-lg font-semibold text-[#222831] mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => {
              const product = getProductBySlug(item.productId);
              const productImage = product?.images[0]?.url || "/placeholder.png";

              return (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0"
                >
                  <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-[#F3F3F3]">
                    <img
                      src={productImage}
                      alt={item.productTitle}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#222831] text-sm mb-1">{item.productTitle}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-[#555555] mb-2">
                      <span>Qty: {item.quantity}</span>
                      {item.color && <span>• Color: {item.color}</span>}
                      {item.size && <span>• Size: {item.size}</span>}
                      {item.material && <span>• Material: {item.material}</span>}
                    </div>
                    <p className="text-sm font-semibold text-[#222831]">{formatPrice(item.subtotal)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-5">
          <h2 className="text-lg font-semibold text-[#222831] mb-4">Payment Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#555555]">Subtotal</span>
              <span className="text-[#222831]">{formatPrice(order.subtotal)}</span>
            </div>
            {order.setupFee > 0 && (
              <div className="flex justify-between">
                <span className="text-[#555555]">Setup Fee</span>
                <span className="text-[#222831]">{formatPrice(order.setupFee)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="flex justify-between text-[#4CAF50]">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-[#E5E7EB] pt-3">
              <div className="flex justify-between">
                <span className="text-base font-bold text-[#222831]">Total Paid</span>
                <span className="text-lg font-bold text-[#222831]">{formatPrice(order.total)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-[#555555]">Payment Status</span>
              <span
                className={`font-semibold ${
                  order.paymentStatus === "paid"
                    ? "text-[#4CAF50]"
                    : order.paymentStatus === "pending"
                      ? "text-[#FF6B35]"
                      : "text-red-600"
                }`}
              >
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
            {order.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-[#555555]">Payment Method</span>
                <span className="text-[#222831]">{order.paymentMethod}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

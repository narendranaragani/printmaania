"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { fetchUserOrders, type UserOrderSummary } from "@/lib/user-orders";
import { formatDate } from "@/lib/date-utils";
import Link from "next/link";

const statusBadgeClasses: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-amber-100 text-amber-700",
  order_received: "bg-amber-100 text-amber-700",
  printing: "bg-amber-100 text-amber-700",
  packed: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<UserOrderSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setOrdersLoading(true);
      try {
        const data = await fetchUserOrders(user.uid);
        setOrders(data);
      } finally {
        setOrdersLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading || !user) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6B35]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Greeting + profile */}
        <section className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
          <div className="rounded-2xl bg-white px-6 py-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Welcome back,</p>
              <h1 className="text-2xl font-bold text-gray-900">{user.name || "PrintMania User"}</h1>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
            {user.photo && (
              <img
                src={user.photo}
                alt={user.name}
                className="h-16 w-16 rounded-full border border-orange-200 object-cover shadow-sm"
              />
            )}
          </div>
          <div className="rounded-2xl bg-white px-6 py-5 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-700 mb-1">Quick Actions</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/products"
                className="rounded-full bg-[#FF6B35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e45d2f] transition"
              >
                Shop Products
              </Link>
              <Link
                href="/cart"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                View Cart
              </Link>
            </div>
          </div>
        </section>

        {/* Orders section */}
        <section className="rounded-2xl bg-white px-6 py-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Your Orders</h2>
            {orders.length > 0 && (
              <span className="text-xs text-gray-500">
                Showing {Math.min(orders.length, 5)} of {orders.length} recent orders
              </span>
            )}
          </div>

          {ordersLoading ? (
            <div className="flex min-h-[120px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6B35]" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 h-20 w-20 rounded-full bg-orange-50 flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">No orders yet</h3>
              <p className="mb-4 text-sm text-gray-500">
                When you place an order, it will appear here with live tracking.
              </p>
              <Link
                href="/products"
                className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e45d2f] transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-3 hover:border-orange-200 hover:bg-orange-50/40 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Items</p>
                      <p className="font-semibold text-gray-900">{order.itemCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Placed on</p>
                      <p className="font-semibold text-gray-900">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`mb-1 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          statusBadgeClasses[order.status] ?? "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status === "delivered"
                          ? "Delivered"
                          : order.status === "shipped"
                            ? "Shipped"
                            : order.status === "cancelled"
                              ? "Cancelled"
                              : "Processing"}
                      </span>
                      <p className="text-xs font-semibold text-gray-900">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-xs text-gray-500">
                      Track your delivery status and reorder items in one click.
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition"
                      >
                        Track Order
                      </Link>
                      <button
                        type="button"
                        className="rounded-full bg-[#FF6B35] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#e45d2f] transition"
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent purchases simple section (reusing same orders) */}
        {orders.length > 0 && (
          <section className="rounded-2xl bg-white px-6 py-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Recent Purchases</h2>
            <p className="text-sm text-gray-500">
              Use the Reorder button from your orders above to repeat your favourite custom gifts.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}



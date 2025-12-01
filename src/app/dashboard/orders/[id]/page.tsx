"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { fetchUserOrderById, type UserOrderDetail } from "@/lib/user-orders";
import { formatDate, formatDateTime } from "@/lib/date-utils";
import Link from "next/link";

export default function DashboardOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [order, setOrder] = useState<UserOrderDetail | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const orderId = params?.id as string;

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !orderId) return;
    const load = async () => {
      setLoadingOrder(true);
      const data = await fetchUserOrderById(user.uid, orderId);
      setOrder(data);
      setLoadingOrder(false);
    };
    load();
  }, [user, orderId]);

  if (loading || !user || loadingOrder) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#FF6B35]" />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] px-4 py-8">
        <div className="mx-auto max-w-4xl flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Order not found</h1>
          <p className="mb-4 text-sm text-gray-500">
            We couldn&apos;t find this order for your account.
          </p>
          <Link
            href="/dashboard"
            className="rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e45d2f] transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Order</p>
            <h1 className="text-xl font-semibold text-gray-900">#{order.orderNumber}</h1>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500">Placed on</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Items</p>
              <p className="text-sm font-semibold text-gray-900">{order.itemCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-sm font-semibold text-gray-900">
                ₹{order.total.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </section>

        {order.timeline && order.timeline.length > 0 && (
          <section className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">Order Timeline</h2>
            <ol className="relative border-l border-gray-200 pl-4 space-y-3">
              {order.timeline.map((t, idx) => (
                <li key={idx} className="ml-1">
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-[#FF6B35]" />
                  <p className="text-xs font-semibold text-gray-900">{t.label}</p>
                  <p className="text-[11px] text-gray-500">
                    {formatDateTime(t.at)}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Items in this order</h2>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.productTitle}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  ₹{item.subtotal.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}



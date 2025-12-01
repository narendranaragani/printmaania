"use client";

import Link from "next/link";
import { ShoppingCart, Factory, ArrowRight, CheckCircle2 } from "lucide-react";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Place Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the order type that best fits your needs. Individual purchases or bulk corporate orders - we've got you covered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Normal Order Card */}
          <Link
            href="/order/normal"
            className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-[#FF6B35] hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Normal Order</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Perfect for individual purchases, gifts, or small quantities. Quick checkout with secure payment.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Add to cart & checkout",
                "Multiple payment options",
                "Fast delivery (5-7 days)",
                "Easy returns & support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all">
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>

          {/* Bulk Order Card */}
          <Link
            href="/order/bulk"
            className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-[#FF6B35] hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Factory className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Bulk Order</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Ideal for businesses, events, and large quantities. Competitive pricing with dedicated support.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Volume discounts (10+ units)",
                "Custom quotes available",
                "Dedicated sales support",
                "GST billing & corporate branding",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all">
              <span>Request Quote</span>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

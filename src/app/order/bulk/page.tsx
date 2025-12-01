"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Upload,
  Phone,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Package,
  Factory,
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Quote,
  Truck,
  Headphones,
  Receipt,
  Award,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const bulkOrderSchema = z.object({
  productType: z.string().min(1, "Select a product type"),
  quantity: z.coerce.number().min(10, "Minimum order is 10 units"),
  artworkFile: z.any().optional(),
  material: z.string().min(1, "Select a material"),
  customRequirements: z.string().min(10, "Please describe your requirements"),
  deliveryLocation: z.string().min(5, "Enter delivery location"),
  deliveryDate: z.string().min(1, "Select delivery date"),
  contactNumber: z.string().min(10, "Enter valid contact number"),
  email: z.string().email("Enter valid email"),
  companyName: z.string().optional(),
});

type BulkOrderFormValues = z.infer<typeof bulkOrderSchema>;

const productTypes = [
  "T-Shirts",
  "Mugs",
  "Banners",
  "Corporate Gifts",
  "Hoodies",
  "Sweatshirts",
  "ID Cards",
  "Photo Frames",
  "Posters",
  "Stickers",
  "Bags",
  "Pens",
  "Diaries",
  "Keychains",
  "Other",
];

const materials = [
  "Cotton",
  "Poly-Cotton",
  "Dry-Fit",
  "Ceramic",
  "Plastic",
  "Metal",
  "Paper",
  "Fabric",
  "Vinyl",
  "Other",
];

const bulkPricingTable = [
  { range: "10-50", pricePerUnit: 120, discount: "5%" },
  { range: "50-200", pricePerUnit: 110, discount: "12%" },
  { range: "200-1000", pricePerUnit: 95, discount: "20%" },
  { range: "1000+", pricePerUnit: "Custom", discount: "Quote" },
];

export default function BulkOrderPage() {
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Set min date on client only to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
  }, []);

  const form = useForm<BulkOrderFormValues>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      productType: "",
      quantity: 0,
      material: "",
      customRequirements: "",
      deliveryLocation: "",
      deliveryDate: "",
      contactNumber: "",
      email: "",
      companyName: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArtworkPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = (qty: number) => {
    if (qty >= 1000) return "Custom Quote";
    if (qty >= 200) return { price: 95, discount: "20%" };
    if (qty >= 50) return { price: 110, discount: "12%" };
    if (qty >= 10) return { price: 120, discount: "5%" };
    return null;
  };

  const onSubmit = (values: BulkOrderFormValues) => {
    const pricing = calculatePrice(values.quantity);
    const message = `Bulk Order Request:
Product: ${values.productType}
Quantity: ${values.quantity}
Material: ${values.material}
Location: ${values.deliveryLocation}
Date: ${values.deliveryDate}
Contact: ${values.contactNumber}
Email: ${values.email}
${values.companyName ? `Company: ${values.companyName}` : ""}
Requirements: ${values.customRequirements}`;

    const link = generateWhatsAppLink({
      kind: "bulk",
      data: { message },
    });

    window.open(link, "_blank");
    toast.success("WhatsApp enquiry opened!");
    form.reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/20 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Factory className="h-4 w-4" />
            B2B Bulk Orders
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Corporate & Bulk Printing Solutions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Premium quality printing for businesses, events, and large-scale orders. Get competitive pricing and dedicated support.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-gray-700 p-6 md:p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Product Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...form.register("productType")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                  >
                    <option value="">Select Product Type</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.productType && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.productType.message}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    {...form.register("quantity", { valueAsNumber: true })}
                    onChange={(e) => {
                      form.setValue("quantity", Number(e.target.value));
                      setSelectedQuantity(Number(e.target.value));
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                    placeholder="Minimum 10 units"
                  />
                  {form.formState.errors.quantity && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.quantity.message}</p>
                  )}
                  {mounted && selectedQuantity > 0 && (
                    <p className="mt-2 text-sm font-semibold text-[#FF6B35]">
                      {(() => {
                        const pricing = calculatePrice(selectedQuantity);
                        const priceText = typeof pricing === "object" && pricing?.price ? `₹${pricing.price}` : "Custom";
                        return `Estimated: ${priceText} per unit`;
                      })()}
                    </p>
                  )}
                </div>

                {/* Material */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Material <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...form.register("material")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                  >
                    <option value="">Select Material</option>
                    {materials.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.material && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.material.message}</p>
                  )}
                </div>

                {/* Artwork Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Upload Artwork / Logo / Design
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#FF6B35] transition">
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai,.psd"
                      onChange={handleFileChange}
                      className="hidden"
                      id="artwork-upload"
                    />
                    <label
                      htmlFor="artwork-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        Click to upload or drag & drop
                      </span>
                      <span className="text-xs text-gray-500">PNG, JPG, PDF, AI, PSD (Max 10MB)</span>
                    </label>
                    {artworkPreview && (
                      <div className="mt-4">
                        <img
                          src={artworkPreview}
                          alt="Preview"
                          className="max-h-32 mx-auto rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Requirements */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Custom Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...form.register("customRequirements")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-medium focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                    placeholder="Specify print type, colors, sizes, special instructions..."
                  />
                  {form.formState.errors.customRequirements && (
                    <p className="mt-1 text-xs text-red-600">
                      {form.formState.errors.customRequirements.message}
                    </p>
                  )}
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...form.register("deliveryLocation")}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                      placeholder="Enter complete delivery address"
                    />
                  </div>
                  {form.formState.errors.deliveryLocation && (
                    <p className="mt-1 text-xs text-red-600">
                      {form.formState.errors.deliveryLocation.message}
                    </p>
                  )}
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Required Delivery Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      {...form.register("deliveryDate")}
                      min={mounted ? minDate : undefined}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                    />
                  </div>
                  {form.formState.errors.deliveryDate && (
                    <p className="mt-1 text-xs text-red-600">{form.formState.errors.deliveryDate.message}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        {...form.register("contactNumber")}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                        placeholder="+91 90000 00000"
                      />
                    </div>
                    {form.formState.errors.contactNumber && (
                      <p className="mt-1 text-xs text-red-600">
                        {form.formState.errors.contactNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        {...form.register("email")}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    {form.formState.errors.email && (
                      <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Company Name (Optional) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    {...form.register("companyName")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 font-semibold focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
                    placeholder="Your company name"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="grid gap-3 md:grid-cols-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                  >
                    <Quote className="h-5 w-5" />
                    Request Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const link = generateWhatsAppLink({
                        kind: "bulk",
                        data: { message: "I need a bulk order quote" },
                      });
                      window.open(link, "_blank");
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open("tel:+919876543210", "_self")}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-xl font-bold hover:bg-[#e45d2f] transition shadow-lg"
                  >
                    <PhoneCall className="h-5 w-5" />
                    Call Sales Team
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Pricing & Trust Badges */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bulk Pricing Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-gray-700 p-6">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-6 w-6 text-[#FF6B35]" />
                Bulk Pricing
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 font-bold text-gray-900">Quantity</th>
                      <th className="text-right py-2 font-bold text-gray-900">Price/Unit</th>
                      <th className="text-right py-2 font-bold text-gray-900">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkPricingTable.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 font-semibold text-gray-900">{row.range}</td>
                        <td className="py-3 text-right font-semibold text-gray-900">
                          {typeof row.pricePerUnit === "number" ? `₹${row.pricePerUnit}` : row.pricePerUnit}
                        </td>
                        <td className="py-3 text-right font-semibold text-green-600">{row.discount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <p className="text-xs font-semibold text-gray-900">
                  💡 For orders 1000+, contact us for custom pricing and volume discounts
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-gray-700 p-6">
              <h3 className="text-lg font-black text-gray-900 mb-4">Why Choose Us</h3>
              <div className="space-y-3">
                {[
                  { icon: Headphones, text: "24/7 Support", color: "blue" },
                  { icon: Truck, text: "Fast Dispatch", color: "green" },
                  { icon: Receipt, text: "GST Billing", color: "purple" },
                  { icon: Award, text: "Corporate Branding", color: "orange" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className={`p-2 bg-${badge.color}-100 rounded-lg`}>
                      <badge.icon className={`h-5 w-5 text-${badge.color}-600`} />
                    </div>
                    <span className="font-bold text-gray-900">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#e45d2f] rounded-2xl shadow-2xl p-6 text-white">
              <h3 className="text-xl font-black mb-3">Need Immediate Help?</h3>
              <p className="text-sm mb-4 opacity-90">
                Our sales team is ready to assist you with custom quotes and bulk order solutions.
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  <PhoneCall className="h-4 w-4" />
                  +91 98765 43210
                </a>
                <a
                  href="mailto:sales@printmaania.com"
                  className="flex items-center gap-2 text-sm font-semibold hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  sales@printmaania.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


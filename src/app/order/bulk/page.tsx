"use client";

import { useState, useEffect } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Upload,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Package,
  Factory,
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

type BulkOrderSchemaType = z.infer<typeof bulkOrderSchema>;

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
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [mounted, setMounted] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMounted(true);
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const form = useForm<BulkOrderSchemaType>({
    // @ts-expect-error resolver type mismatch fix
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      productType: "",
      quantity: 10,
      material: "",
      customRequirements: "",
      deliveryLocation: "",
      deliveryDate: "",
      contactNumber: "",
      email: "",
      companyName: "",
    },
  }) as unknown as UseFormReturn<BulkOrderSchemaType>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setArtworkPreview(reader.result as string);
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

  const onSubmit = (values: BulkOrderSchemaType) => {
    // Convert to BulkOrderData format expected by WhatsApp generator
    const link = generateWhatsAppLink({
      kind: "bulk",
      data: {
        productCategory: values.productType,
        quantity: values.quantity,
        type: values.material || "Standard",
        color: "Custom",
        fabric: values.material || "Standard",
        notes: `${values.customRequirements}\nDelivery Location: ${values.deliveryLocation}\nDelivery Date: ${values.deliveryDate}\nContact: ${values.contactNumber}\nEmail: ${values.email}${values.companyName ? `\nCompany: ${values.companyName}` : ""}`,
      },
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
            Premium quality printing for businesses, events, and large-scale orders.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 rounded-2xl shadow-xl border p-6 md:p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Product Type */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Product Type *
                  </label>
                  <select
                    {...form.register("productType")}
                    className="w-full px-4 py-3 rounded-xl border bg-white text-gray-900"
                  >
                    <option value="">Select Product Type</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {form.formState.errors.productType && (
                    <p className="mt-1 text-xs text-red-600">
                      {form.formState.errors.productType.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="10"
                    {...form.register("quantity", { valueAsNumber: true })}
                    onChange={(e) => {
                      form.setValue("quantity", Number(e.target.value));
                      setSelectedQuantity(Number(e.target.value));
                    }}
                    className="w-full px-4 py-3 rounded-xl border bg-white text-gray-900"
                    placeholder="min 10 units"
                  />
                  {form.formState.errors.quantity && (
                    <p className="mt-1 text-xs text-red-600">
                      {form.formState.errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Upload Artwork
                  </label>
                  <div className="border-2 border-dashed rounded-xl p-6 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai"
                      onChange={handleFileChange}
                      className="hidden"
                      id="art-upload"
                    />
                    <label htmlFor="art-upload" className="cursor-pointer flex flex-col gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm">Click to upload</span>
                    </label>
                    {artworkPreview && (
                      <img src={artworkPreview} className="mt-3 max-h-32 mx-auto rounded-lg" />
                    )}
                  </div>
                </div>

                {/* Other Inputs */}
                <div>
                  <label className="block font-bold mb-2">Material *</label>
                  <select {...form.register("material")} className="w-full px-4 py-3 rounded-xl border">
                    <option value="">Select Material</option>
                    {materials.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-2">Custom Requirements *</label>
                  <textarea
                    {...form.register("customRequirements")}
                    className="w-full px-4 py-3 rounded-xl border"
                    placeholder="Details about prints, sizes, etc"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Delivery Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      {...form.register("deliveryLocation")}
                      className="w-full pl-10 px-4 py-3 rounded-xl border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-2">Delivery Date *</label>
                  <input
                    type="date"
                    min={mounted ? minDate : undefined}
                    {...form.register("deliveryDate")}
                    className="w-full px-4 py-3 rounded-xl border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-2">Contact Number *</label>
                    <input
                      type="tel"
                      {...form.register("contactNumber")}
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      {...form.register("email")}
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-2">Company Name (optional)</label>
                  <input
                    type="text"
                    {...form.register("companyName")}
                    className="w-full px-4 py-3 rounded-xl border"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-xl">
                    <Quote className="h-5 w-5 inline-block" />
                    Request Quote
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const link = generateWhatsAppLink({
                        kind: "bulk",
                        data: {
                          productCategory: "General Inquiry",
                          quantity: 0,
                          type: "Standard",
                          color: "Custom",
                          fabric: "Standard",
                          notes: "I need a bulk order quote",
                        },
                      });
                      window.open(link, "_blank");
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl"
                  >
                    <MessageCircle className="h-5 w-5 inline-block" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open("tel:+919876543210")}
                    className="px-6 py-3 bg-[#FF6B35] text-white rounded-xl"
                  >
                    <PhoneCall className="h-5 w-5 inline-block" />
                    Call
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Sidebar - Pricing & Trust */}
          <div className="space-y-6">

            <div className="bg-white rounded-xl shadow-xl border p-6">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Package className="h-6 w-6 text-[#FF6B35]" />
                Bulk Pricing
              </h3>

              <table className="w-full text-sm">
                <tbody>
                  {bulkPricingTable.map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-3 text-gray-900 font-semibold">{row.range}</td>
                      <td className="py-3 text-right text-gray-900 font-semibold">
                        {typeof row.pricePerUnit === "number"
                          ? `₹${row.pricePerUnit}`
                          : row.pricePerUnit}
                      </td>
                      <td className="py-3 text-right font-semibold text-green-600">
                        {row.discount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs mt-3 bg-orange-50 p-3 rounded-xl">
                💡 Orders 1000+, contact us for custom pricing
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl border p-6">
              <h3 className="text-lg font-black mb-4">Why Choose Us</h3>
              <p className="text-sm">✔ Fast Delivery ✔ GST Billing ✔ Corporate Support</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

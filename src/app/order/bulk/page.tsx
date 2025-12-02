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
  const [selectedQuantity, setSelectedQuantity] = useState(10);
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
      quantity: 10, // 🔥 updated value
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
      {/* Rest of your JSX remains unchanged */}
    </main>
  );
}

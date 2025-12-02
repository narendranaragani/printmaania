"use client";

import { useState } from "react";
import { Minus, Plus, Upload, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";
import { toast } from "sonner";
import Link from "next/link";

export const ProductCustomization = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore();

  //––– STATE –––//
  const [quantity, setQuantity] = useState(product.minQuantity || 1);
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | undefined>();
  const [notes, setNotes] = useState("");

  const addToCart = () => {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productTitle: product.title,
      quantity,
      color,
      size,
      designUploaded: !!file,
      designFileName: fileName,
      notes,
    });
    toast.success("Product added to cart");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["image/jpeg", "image/png", "application/pdf"].includes(f.type))
      return toast.error("Only JPG, PNG, PDF allowed");
    setFile(f);
    setFileName(f.name);
  };

  const stars = (rating: number) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));

  return (
    <div className="rounded-xl border p-4 bg-white flex flex-col gap-4">

      {/* Title + Rating */}
      <div>
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="flex items-center gap-1 mt-1">{stars(product.reviews?.rating || 4)}</div>
        <p className="text-sm text-gray-500 mt-1">{product.shortDescription}</p>
      </div>

      {/* Colors */}
      {product.colors && (
        <div>
          <p className="text-xs font-semibold mb-1">Select Color</p>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map(c => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`px-3 py-1 text-xs border rounded-md ${
                  color === c.name ? "border-black font-medium" : "border-gray-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes && (
        <div>
          <p className="text-xs font-semibold mb-1">Size</p>
          <div className="flex gap-2">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 text-xs border rounded-md ${
                  size === s ? "border-black font-medium" : "border-gray-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-xs font-semibold mb-1">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(q => Math.max((product.minQuantity || 1), q - 1))}
            className="h-8 w-8 flex items-center justify-center border rounded-md"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="h-8 w-8 flex items-center justify-center border rounded-md"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Upload */}
      <div>
        <p className="text-xs font-semibold mb-1">Upload Design</p>
        {!file ? (
          <label className="w-full border rounded-lg p-3 cursor-pointer text-xs text-gray-600 hover:bg-gray-50 flex justify-center items-center gap-2">
            <Upload size={15} /> Upload File
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        ) : (
          <div className="flex justify-between items-center border p-2 rounded-md text-xs">
            {fileName}
            <button onClick={() => (setFile(null), setFileName(undefined))} className="text-red-500">
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <p className="text-xs font-semibold mb-1">Notes (Optional)</p>
        <Textarea rows={3} className="text-sm" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button onClick={addToCart} className="text-sm flex-1 bg-black text-white">Add to Cart</Button>
        <Button className="text-sm flex-1 border border-black">Buy Now</Button>
      </div>
    </div>
  );
};

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { DesignUploadHint } from "@/components/order/design-upload-hint";
import { normalDefaults, useFormStore } from "@/store/form-store";

const normalSchema = z.object({
  product: z.string().min(2, "Select a product"),
  customerName: z.string().min(2, "Enter your name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone")
    .regex(/^[0-9+\-()\s]+$/, "Phone number should contain digits only"),
  notes: z.string().max(400).optional(),
});

type NormalFormValues = z.infer<typeof normalSchema>;

const productOptions = [
  "Custom Mug",
  "Photo Frame",
  "Polaroid Photos",
  "Key Chain",
  "Banner",
  "Custom T-Shirt",
  "Hoodie",
  "Sweat Shirt",
  "Poster",
  "Signature Day T-Shirt",
  "Puzzle Board",
  "Sticker Set",
  "Diary",
  "Bag",
  "Pen",
  "Certificate",
  "Other Gift Article",
];

type NormalOrderFormProps = {
  isVisible: boolean;
};

export const NormalOrderForm = ({ isVisible }: NormalOrderFormProps) => {
  const { normalOrder, updateNormalOrder, resetNormalOrder } = useFormStore();

  const normalForm = useForm<NormalFormValues>({
    resolver: zodResolver(normalSchema),
    defaultValues: normalOrder,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = normalForm.watch((value) => updateNormalOrder(value as NormalFormValues));
    return () => subscription.unsubscribe();
  }, [normalForm, updateNormalOrder]);

  const onSubmit = (values: NormalFormValues) => {
    const link = generateWhatsAppLink({
      kind: "normal",
      data: values,
    });

    window.open(link, "_blank");
    toast.success("WhatsApp chat opened. Attach your design file there.");
    resetNormalOrder();
    normalForm.reset(normalDefaults);
  };

  return (
    <form
      onSubmit={normalForm.handleSubmit(onSubmit)}
      className={cn(!isVisible && "hidden", "space-y-6")}
      aria-hidden={!isVisible}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[#222831]">Product</label>
          <select
            {...normalForm.register("product")}
            className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#222831] focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
          >
            {productOptions.map((option) => (
              <option key={option} value={option} className="text-[#222831]">
                {option}
              </option>
            ))}
          </select>
          {normalForm.formState.errors.product && (
            <p className="mt-2 text-xs text-[#FF6B35]">{normalForm.formState.errors.product.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[#222831]">Customer Name</label>
          <Input className="mt-2" {...normalForm.register("customerName")} />
          {normalForm.formState.errors.customerName && (
            <p className="mt-2 text-xs text-[#FF6B35]">
              {normalForm.formState.errors.customerName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[#222831]">Mobile Number</label>
          <Input
            className="mt-2"
            placeholder="+91 90000 00000"
            {...normalForm.register("phone")}
          />
          {normalForm.formState.errors.phone && (
            <p className="mt-2 text-xs text-[#FF6B35]">{normalForm.formState.errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-[#222831]">Notes</label>
          <Textarea
            rows={3}
            className="mt-2"
            placeholder="Color, size, or delivery preference"
            {...normalForm.register("notes")}
          />
          {normalForm.formState.errors.notes && (
            <p className="mt-2 text-xs text-[#FF6B35]">{normalForm.formState.errors.notes.message}</p>
          )}
        </div>
      </div>

      <DesignUploadHint label="Upload Your Reference" />

      <Button type="submit" className="w-full">
        Send Normal Order on WhatsApp
      </Button>
    </form>
  );
};


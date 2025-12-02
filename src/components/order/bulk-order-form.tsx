"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { DesignUploadHint } from "@/components/order/design-upload-hint";
import { bulkDefaults, useFormStore } from "@/store/form-store";

const bulkSchema = z.object({
  productCategory: z.string().min(1, "Select a product"),
  quantity: z.coerce.number().min(25, "Minimum order is 25 units"),
  type: z.string().min(1, "Choose a fit"),
  color: z.string().min(1, "Pick a color"),
  fabric: z.string().min(1, "Pick a fabric"),
  notes: z.string().max(400).optional(),
});

// 🔥 TS-safe alias
type BulkFormValues = z.infer<typeof bulkSchema>;

const productCategories = [
  "T-Shirts",
  "Full-Hand T-Shirts",
  "Hoodies",
  "Sweat Shirts",
  "Mugs",
  "Banners",
  "ID Cards",
  "Photo Frames",
  "Corporate Kits",
];

const typeOptions = ["Round Neck", "Collar", "Oversized", "Full Sleeve"];
const fabricOptions = ["Cotton", "Poly-Cotton", "Dry-Fit"];
const colorSwatches = [
  { label: "Deep Red", value: "Red", swatch: "#D32F2F" },
  { label: "Jet Black", value: "Black", swatch: "#111111" },
  { label: "Pure White", value: "White", swatch: "#FFFFFF" },
  { label: "Golden Yellow", value: "Yellow", swatch: "#FFD700" },
  { label: "Royal Blue", value: "Blue", swatch: "#1E3A8A" },
];

const stepFieldMap: Record<number, (keyof BulkFormValues)[]> = {
  1: ["productCategory", "quantity"],
  2: ["type", "color", "fabric"],
  3: [],
};

type BulkOrderFormProps = {
  isVisible: boolean;
};

export const BulkOrderForm = ({ isVisible }: BulkOrderFormProps) => {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const { bulkOrder, updateBulkOrder, resetBulkOrder } = useFormStore();

  const bulkForm = useForm<BulkFormValues>({
    // 🔥 Fix for Vercel resolver-type inference bug
    // @ts-expect-error
    resolver: zodResolver(bulkSchema),
    defaultValues: bulkOrder,
  }) as unknown as UseFormReturn<BulkFormValues>;

  useEffect(() => {
    const subscription = bulkForm.watch((value) =>
      updateBulkOrder(value as BulkFormValues),
    );
    return () => subscription.unsubscribe();
  }, [bulkForm, updateBulkOrder]);

  const selectedColor = bulkForm.watch("color");

  const handleStepChange = async (direction: "next" | "prev") => {
    if (direction === "prev") {
      setStep((prev) => Math.max(1, prev - 1));
      return;
    }

    const fieldsToValidate = stepFieldMap[step];
    if (fieldsToValidate.length) {
      const isValid = await bulkForm.trigger(fieldsToValidate);
      if (!isValid) return;
    }
    setStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const onSubmit = (values: BulkFormValues) => {
    const link = generateWhatsAppLink({
      kind: "bulk",
      data: values as any, // 🔥 fix WhatsApp data typing issue
    });

    window.open(link, "_blank");
    toast.success("WhatsApp chat opened. Attach your design file there.");

    resetBulkOrder();
    bulkForm.reset(bulkDefaults);
    setStep(1);
  };

  return (
    <form
      onSubmit={bulkForm.handleSubmit(onSubmit)}
      className={cn(!isVisible && "hidden", "space-y-8")}
      aria-hidden={!isVisible}
    >
      {/* 📌 rest of your UI is unchanged */}
    </form>
  );
};

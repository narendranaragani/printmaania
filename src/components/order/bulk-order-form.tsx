"use client";

import { useEffect, useState } from "react";
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
import { bulkDefaults, useFormStore } from "@/store/form-store";

const bulkSchema = z.object({
  productCategory: z.string().min(1, "Select a product"),
  quantity: z.coerce.number().min(25, "Minimum order is 25 units"),
  type: z.string().min(1, "Choose a fit"),
  color: z.string().min(1, "Pick a color"),
  fabric: z.string().min(1, "Pick a fabric"),
  notes: z.string().max(400).optional(),
});

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
    resolver: zodResolver(bulkSchema),
    defaultValues: bulkOrder,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = bulkForm.watch((value) => updateBulkOrder(value as BulkFormValues));
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
      data: values,
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
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="uppercase tracking-[0.3em] text-[#555555]">
            Step {step} of {totalSteps}
          </p>
          <span className="text-[#555555]">Bulk orders start at 25+ units</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-[#E5E7EB]">
          <div
            className="h-full rounded-full bg-[#FF6B35] transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-[#222831]">Product Category</label>
            <select
              {...bulkForm.register("productCategory")}
              className="mt-2 w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#222831] focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20"
            >
              {productCategories.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
            {bulkForm.formState.errors.productCategory && (
              <p className="mt-2 text-xs text-[#FF6B35]">
                {bulkForm.formState.errors.productCategory.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-[#222831]">Quantity</label>
            <Input
              type="number"
              min={25}
              className="mt-2"
              {...bulkForm.register("quantity", { valueAsNumber: true })}
            />
            {bulkForm.formState.errors.quantity && (
              <p className="mt-2 text-xs text-[#FF6B35]">
                {bulkForm.formState.errors.quantity.message}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-[#222831]">Type</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {typeOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => bulkForm.setValue("type", option, { shouldValidate: true })}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm transition font-medium",
                    bulkForm.watch("type") === option
                      ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                      : "border-[#E5E7EB] text-[#555555] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {bulkForm.formState.errors.type && (
              <p className="mt-2 text-xs text-[#FF6B35]">{bulkForm.formState.errors.type.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#222831]">Color</p>
            <div className="mt-3 flex flex-wrap gap-4">
              {colorSwatches.map((swatch) => (
                <button
                  type="button"
                  key={swatch.value}
                  onClick={() => bulkForm.setValue("color", swatch.value, { shouldValidate: true })}
                  className={cn(
                    "flex flex-col items-center gap-2 text-xs transition",
                    selectedColor === swatch.value ? "text-[#FF6B35] font-semibold" : "text-[#555555]",
                  )}
                >
                  <span
                    className={cn(
                      "h-12 w-12 rounded-full border-2 border-transparent transition",
                      selectedColor === swatch.value ? "scale-105 border-[#FF6B35] shadow-lg" : "border-[#E5E7EB] hover:border-[#FF6B35]",
                    )}
                    style={{ backgroundColor: swatch.swatch }}
                  />
                  {swatch.label}
                </button>
              ))}
            </div>
            {bulkForm.formState.errors.color && (
              <p className="mt-2 text-xs text-[#FF6B35]">{bulkForm.formState.errors.color.message}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#222831]">Fabric</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {fabricOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => bulkForm.setValue("fabric", option, { shouldValidate: true })}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm transition font-medium",
                    bulkForm.watch("fabric") === option
                      ? "border-[#FF6B35] bg-[#FF6B35]/10 text-[#FF6B35]"
                      : "border-[#E5E7EB] text-[#555555] hover:border-[#FF6B35] hover:bg-[#FF6B35]/5",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {bulkForm.formState.errors.fabric && (
              <p className="mt-2 text-xs text-[#FF6B35]">{bulkForm.formState.errors.fabric.message}</p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <DesignUploadHint />
          <div>
            <label className="text-sm font-semibold text-[#222831]">Additional Notes</label>
            <Textarea
              rows={4}
              className="mt-2"
              placeholder="Delivery date, packaging, size split, print instructions..."
              {...bulkForm.register("notes")}
            />
            {bulkForm.formState.errors.notes && (
              <p className="mt-2 text-xs text-[#FF6B35]">{bulkForm.formState.errors.notes.message}</p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        {step > 1 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleStepChange("prev")}
            className="px-5"
          >
            Back
          </Button>
        )}
        {step < totalSteps ? (
          <Button type="button" onClick={() => handleStepChange("next")} className="ml-auto px-5">
            Next Step
          </Button>
        ) : (
          <Button type="submit" className="ml-auto px-5">
            Submit Bulk Order via WhatsApp
          </Button>
        )}
      </div>
    </form>
  );
};


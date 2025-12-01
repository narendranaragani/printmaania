import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BulkOrderData, NormalOrderData } from "@/lib/whatsapp";

export const bulkDefaults: BulkOrderData = {
  productCategory: "T-Shirts",
  quantity: 25,
  type: "Round Neck",
  color: "Black",
  fabric: "Cotton",
  notes: "",
};

export const normalDefaults: NormalOrderData = {
  product: "Custom Mug",
  customerName: "",
  phone: "",
  notes: "",
};

type FormStore = {
  bulkOrder: BulkOrderData;
  normalOrder: NormalOrderData;
  updateBulkOrder: (payload: Partial<BulkOrderData>) => void;
  resetBulkOrder: () => void;
  updateNormalOrder: (payload: Partial<NormalOrderData>) => void;
  resetNormalOrder: () => void;
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      bulkOrder: bulkDefaults,
      normalOrder: normalDefaults,
      updateBulkOrder: (payload) =>
        set((state) => ({
          bulkOrder: { ...state.bulkOrder, ...payload },
        })),
      resetBulkOrder: () => set({ bulkOrder: bulkDefaults }),
      updateNormalOrder: (payload) =>
        set((state) => ({
          normalOrder: { ...state.normalOrder, ...payload },
        })),
      resetNormalOrder: () => set({ normalOrder: normalDefaults }),
    }),
    {
      name: "printmaania-form-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cart-store";

type SaveForLaterStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  moveToCart: (productId: string) => CartItem | undefined;
  clearAll: () => void;
};

export const useSaveForLaterStore = create<SaveForLaterStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (!existing) {
          set((state) => ({
            items: [...state.items, item],
          }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },
      moveToCart: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (item) {
          get().removeItem(productId);
          return item;
        }
        return undefined;
      },
      clearAll: () => {
        set({ items: [] });
      },
    }),
    {
      name: "printmaania-save-for-later",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);


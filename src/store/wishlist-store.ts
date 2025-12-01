import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";

type WishlistItem = {
  productId: string;
  productSlug: string;
  addedAt: Date;
};

type WishlistStore = {
  items: WishlistItem[];
  addItem: (productId: string, productSlug: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, productSlug) => {
        const existing = get().items.find((item) => item.productId === productId);
        if (!existing) {
          set((state) => ({
            items: [
              ...state.items,
              { productId, productSlug, addedAt: new Date() },
            ],
          }));
        }
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
      getWishlistCount: () => {
        return get().items.length;
      },
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "printmaania-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);


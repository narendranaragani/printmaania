import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  productId: string;
  productSlug: string; // Added for easier product lookup
  productTitle: string;
  quantity: number;
  color?: string;
  size?: string;
  material?: string;
  customOptions?: Record<string, string>;
  designUploaded: boolean;
  designFileName?: string;
  notes?: string;
  unitPrice?: number; // Optional for future pricing
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateItem: (productId: string, updates: Partial<CartItem>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartItem: (productId: string) => CartItem | undefined;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.productId === item.productId);
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          }));
        }
      },
      updateItem: (productId, updates) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, ...updates } : i,
          ),
        }));
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getCartItem: (productId) => {
        return get().items.find((i) => i.productId === productId);
      },
    }),
    {
      name: "printmaania-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/lib/orders";
import {
  generateOrderId,
  generateOrderNumber,
  createInitialTimeline,
  calculateEstimatedDelivery,
} from "@/lib/orders";

type OrderStore = {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "timeline" | "createdAt" | "updatedAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"], message?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];
  getAllOrders: () => Order[];
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: generateOrderId(),
          orderNumber: generateOrderNumber(),
          timeline: createInitialTimeline(),
          createdAt: new Date(),
          updatedAt: new Date(),
          estimatedDelivery: orderData.estimatedDelivery || calculateEstimatedDelivery("7 days"),
        };

        set((state) => ({
          orders: [order, ...state.orders],
        }));

        return order;
      },
      updateOrderStatus: (orderId, status, message) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === orderId) {
              return {
                ...order,
                status,
                updatedAt: new Date(),
                timeline: [
                  ...order.timeline,
                  {
                    status,
                    timestamp: new Date(),
                    message: message || `Order status updated to ${status}`,
                  },
                ],
              };
            }
            return order;
          }),
        }));
      },
      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
      getOrdersByPhone: (phone) => {
        return get()
          .orders.filter((order) => order.phone === phone)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },
      getAllOrders: () => {
        return get().orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      },
    }),
    {
      name: "printmaania-orders",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

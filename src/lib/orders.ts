export type OrderStatus =
  | "order_received"
  | "printing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderTimelineItem = {
  status: OrderStatus;
  timestamp: Date;
  message?: string;
};

export type OrderItem = {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  color?: string;
  size?: string;
  material?: string;
  customOptions?: Record<string, string>;
  subtotal: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  setupFee: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  timeline: OrderTimelineItem[];
  createdAt: Date;
  updatedAt: Date;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
};

/**
 * Generate unique order ID
 */
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate order number (human-readable)
 */
export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `PM${year}${month}${day}${random}`;
};

/**
 * Get status display information
 */
export const getStatusInfo = (status: OrderStatus) => {
  const statusMap: Record<
    OrderStatus,
    { label: string; color: string; description: string }
  > = {
    order_received: {
      label: "Order Received",
      color: "text-blue-400",
      description: "Your order has been received and is being processed",
    },
    printing: {
      label: "Printing",
      color: "text-purple-400",
      description: "Your items are being printed",
    },
    packed: {
      label: "Packed",
      color: "text-yellow-400",
      description: "Your order has been packed and ready to ship",
    },
    shipped: {
      label: "Shipped",
      color: "text-orange-400",
      description: "Your order is on its way",
    },
    delivered: {
      label: "Delivered",
      color: "text-green-400",
      description: "Your order has been delivered",
    },
    cancelled: {
      label: "Cancelled",
      color: "text-red-400",
      description: "Your order has been cancelled",
    },
  };

  return statusMap[status] || statusMap.order_received;
};

/**
 * Calculate estimated delivery date
 */
export const calculateEstimatedDelivery = (
  estimatedDays: string,
  startDate: Date = new Date(),
): Date => {
  const daysMatch = estimatedDays.match(/(\d+)/);
  const days = daysMatch ? parseInt(daysMatch[1]) : 7;
  const deliveryDate = new Date(startDate);
  deliveryDate.setDate(deliveryDate.getDate() + days);
  return deliveryDate;
};

/**
 * Create initial timeline for new order
 */
export const createInitialTimeline = (): OrderTimelineItem[] => {
  return [
    {
      status: "order_received",
      timestamp: new Date(),
      message: "Order received and payment confirmed",
    },
  ];
};


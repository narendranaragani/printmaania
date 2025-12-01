import { db } from "@/firebase.config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import type { OrderStatus } from "./orders";

export type UserOrderSummary = {
  id: string;
  orderNumber: string;
  itemCount: number;
  status: OrderStatus;
  total: number;
  createdAt: Date;
};

export type UserOrderDetail = UserOrderSummary & {
  items: {
    productTitle: string;
    quantity: number;
    subtotal: number;
  }[];
  timeline?: {
    status: OrderStatus;
    label: string;
    at: Date;
  }[];
  shippingAddress?: string;
};

export async function fetchUserOrders(uid: string): Promise<UserOrderSummary[]> {
  const ref = collection(db, "users", uid, "orders");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data() as any;
    return {
      id: d.id,
      orderNumber: data.orderNumber ?? d.id,
      itemCount: data.itemCount ?? (data.items?.length ?? 0),
      status: (data.status ?? "processing") as OrderStatus,
      total: data.total ?? 0,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    };
  });
}

export async function fetchUserOrderById(
  uid: string,
  orderId: string,
): Promise<UserOrderDetail | null> {
  const ref = doc(db, "users", uid, "orders", orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  return {
    id: snap.id,
    orderNumber: data.orderNumber ?? snap.id,
    itemCount: data.itemCount ?? (data.items?.length ?? 0),
    status: (data.status ?? "processing") as OrderStatus,
    total: data.total ?? 0,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    items:
      data.items?.map((i: any) => ({
        productTitle: i.productTitle ?? "Item",
        quantity: i.quantity ?? 1,
        subtotal: i.subtotal ?? 0,
      })) ?? [],
    timeline:
      data.timeline?.map((t: any) => ({
        status: (t.status ?? "processing") as OrderStatus,
        label: t.label ?? "",
        at: t.at?.toDate?.() ?? new Date(),
      })) ?? [],
    shippingAddress: data.shippingAddress ?? "",
  };
}



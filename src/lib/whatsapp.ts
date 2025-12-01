const ADMIN_WHATSAPP_NUMBER = "919876543210";

export type BulkOrderData = {
  productCategory: string;
  quantity: number;
  type: string;
  color: string;
  fabric: string;
  notes?: string;
};

export type NormalOrderData = {
  product: string;
  customerName: string;
  phone: string;
  notes?: string;
};

export type ProductOrderData = {
  productTitle: string;
  quantity: number;
  color?: string;
  size?: string;
  material?: string;
  customOptions?: Record<string, string>;
  designUploaded: boolean;
  designFileName?: string;
  notes?: string;
  customerName?: string;
  phone?: string;
  address?: string;
};

export type WhatsAppPayload =
  | { kind: "bulk"; data: BulkOrderData }
  | { kind: "normal"; data: NormalOrderData }
  | { kind: "product"; data: ProductOrderData };

export const generateWhatsAppLink = ({ kind, data }: WhatsAppPayload) => {
  let intro: string;
  let lines: string[];
  let footer: string[];

  if (kind === "bulk") {
    intro = "*New Bulk Order Request* 📦";
    const bulkData = data as BulkOrderData;
    lines = [
      `*Product:* ${bulkData.productCategory}`,
      `*Qty:* ${bulkData.quantity}`,
      `*Type:* ${bulkData.type}`,
      `*Color:* ${bulkData.color}`,
      `*Fabric:* ${bulkData.fabric}`,
      `*Customer Note:* ${bulkData.notes || "Not provided"}`,
    ];
    footer = [
      "---------------------------",
      "*Design File:* Please attach your artwork in WhatsApp chat",
    ];
  } else if (kind === "product") {
    intro = "*Order Request* 🛒";
    const productData = data as ProductOrderData;
    lines = [
      `*Product:* ${productData.productTitle}`,
      `*Quantity:* ${productData.quantity}`,
    ];

    if (productData.color) lines.push(`*Color:* ${productData.color}`);
    if (productData.size) lines.push(`*Size:* ${productData.size}`);
    if (productData.material) lines.push(`*Material:* ${productData.material}`);
    
    if (productData.customOptions) {
      Object.entries(productData.customOptions).forEach(([key, value]) => {
        lines.push(`*${key}:* ${value}`);
      });
    }

    lines.push(
      `*Design Uploaded:* ${productData.designUploaded ? "Yes" : "No"}`,
    );
    if (productData.designFileName) {
      lines.push(`*Design File:* ${productData.designFileName}`);
    }

    if (productData.customerName) lines.push(`*Customer Name:* ${productData.customerName}`);
    if (productData.phone) lines.push(`*Phone:* ${productData.phone}`);
    if (productData.address) lines.push(`*Address:* ${productData.address}`);
    if (productData.notes) lines.push(`*Notes:* ${productData.notes}`);

    footer = [
      "---------------------------",
      productData.designUploaded
        ? "*Please attach your design file in this WhatsApp chat*"
        : "*Please attach your artwork in WhatsApp chat",
    ];
  } else {
    intro = "*New Custom Order* 🎁";
    const normalData = data as NormalOrderData;
    lines = [
      `*Product:* ${normalData.product}`,
      `*Customer:* ${normalData.customerName}`,
      `*Phone:* ${normalData.phone}`,
      `*Customer Note:* ${normalData.notes || "Not provided"}`,
    ];
    footer = [
      "---------------------------",
      "*Design File:* Please attach your artwork in WhatsApp chat",
    ];
  }

  const message = [intro, "---------------------------", ...lines, ...footer].join("\n");

  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};


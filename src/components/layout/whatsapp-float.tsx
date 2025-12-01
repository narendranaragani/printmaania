"use client";

import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export const WhatsAppFloat = () => {
  const link = generateWhatsAppLink({
    kind: "normal",
    data: {
      product: "General enquiry",
      customerName: "Website Visitor",
      phone: "N/A",
      notes: "Quick question from PrintMaania website.",
    },
  });

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/40 transition hover:scale-105"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
        <span className="absolute inset-0 rounded-full border border-white/30 animate-[pulse_2.4s_ease-in-out_infinite]" />
        <MessageCircle className="h-4 w-4" />
      </span>
      WhatsApp
    </a>
  );
};


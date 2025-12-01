"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Coffee,
  Frame,
  Camera,
  KeyRound,
  PanelsTopLeft,
  Shirt,
  SwatchBook,
  Badge,
  Image as ImageIcon,
  IdCard,
  PenLine,
  Puzzle,
  Sticker,
  BookOpenCheck,
  ShoppingBag,
  PenTool,
  ScrollText,
  Sparkles,
} from "lucide-react";

const categorySlugMap: Record<string, string> = {
  "Mugs": "custom-mugs",
  "Photo Frames": "photo-frames",
  "Polaroid Photos": "polaroids",
  "Key Chains": "keychains",
  "Banners": "banners",
  "T-Shirts": "t-shirts",
  "Hoodies": "hoodies",
  "Sweat Shirts": "sweat-shirts",
  "Full-Hand T-Shirts": "full-hand-tees",
  "Posters": "posters",
  "ID Cards": "id-cards",
  "Signature Day T-Shirts": "signature-day-tees",
  "Puzzle Boards": "puzzle-boards",
  "Stickers": "stickers",
  "Diaries": "diaries",
  "Bags": "bags",
  "Pens": "pens",
  "Certificates": "certificates",
  "Other Gift Articles": "other-gifts",
};

const categories = [
  { label: "Mugs", description: "Matte, metallic, temperature, and inner-color mugs.", icon: Coffee },
  { label: "Photo Frames", description: "Textured frames, acrylic mounts, ready-to-hang.", icon: Frame },
  { label: "Polaroid Photos", description: "Retro mini prints with premium paper stock.", icon: Camera },
  { label: "Key Chains", description: "Acrylic, metallic, leather tags, laser engrave.", icon: KeyRound },
  { label: "Banners", description: "Vinyl, fabric, roll-up, die-cut, large format.", icon: PanelsTopLeft },
  { label: "T-Shirts", description: "DTF, screen, sublimation with cotton & blends.", icon: Shirt },
  { label: "Hoodies", description: "Oversized, zipper, fleece-lined premium hoodies.", icon: SwatchBook },
  { label: "Sweat Shirts", description: "Crew neck staples for college & corp drops.", icon: Badge },
  { label: "Full-Hand T-Shirts", description: "Raglan & full sleeve styles with stretch.", icon: Shirt },
  { label: "Posters", description: "A3–A0 prints, foam-board mounting, UV coat.", icon: ImageIcon },
  { label: "ID Cards", description: "PVC cards, lanyards, QR, RFID encoding.", icon: IdCard },
  { label: "Signature Day T-Shirts", description: "Washable fabric markers + tee kits.", icon: PenLine },
  { label: "Puzzle Boards", description: "Custom puzzle boards & game pieces.", icon: Puzzle },
  { label: "Stickers", description: "Kiss-cut, vinyl, holographic sticker sheets.", icon: Sticker },
  { label: "Diaries", description: "PU leather, hardbound, foil blocked diaries.", icon: BookOpenCheck },
  { label: "Bags", description: "Canvas totes, drawstring, backpacks & kits.", icon: ShoppingBag },
  { label: "Pens", description: "Metal, wooden, engraved pen collections.", icon: PenTool },
  { label: "Certificates", description: "Textured stock, foil seals, envelope sets.", icon: ScrollText },
  { label: "Other Gift Articles", description: "Crystal, tech swag, hampers, desk sets.", icon: Sparkles },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Product Catalog</p>
          <h2 className="mt-4 font-display text-3xl text-white lg:text-4xl">
            19 core categories covering gifts, apparel, print, and swag.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((service) => {
            const slug = categorySlugMap[service.label];
            return (
              <Link key={service.label} href={slug ? `/products/${slug}` : "/order"}>
                <motion.div
                  className="glass-panel flex flex-col gap-4 p-6 transition cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                >
                  <service.icon className="h-10 w-10 text-accent" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{service.label}</h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-accent">
                        {slug ? "View" : "Order"}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{service.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};


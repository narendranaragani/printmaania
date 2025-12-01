"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";


const galleryItems = [
  {
    id: 1,
    src: "https://i.pinimg.com/1200x/0a/e3/8d/0ae38dd567cd12d9f2757dd174b9f49b.jpg",
    label: "Custom T-Shirts Collection",
    category: "Apparel",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/1200x/f5/09/2f/f5092f38c247271dd1245b3cae42e5ef.jpg",
    label: "Premium Custom Mugs",
    category: "Drinkware",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/1200x/5b/84/8c/5b848ceacb12a4edc863257e9be188e4.jpg",
    label: "Photo Frames & Décor",
    category: "Frames",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/1200x/f2/54/ba/f254ba177bcfdcd0301840561d68c349.jpg",
    label: "Custom Hoodies",
    category: "Apparel",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/1200x/1e/dd/17/1edd17fec6b7ae3abb0e0515c3b4b08a.jpg",
    label: "Sweatshirts Collection",
    category: "Apparel",
  },
  {
    id: 6,
    src: "https://i.pinimg.com/1200x/be/8e/5a/be8e5acaeacc4a25804e7d6a69b0af32.jpg",
    label: "Custom Bags & Accessories",
    category: "Accessories",
  },
  {
    id: 7,
    src: "https://i.pinimg.com/1200x/f5/ac/46/f5ac468f4afc30288a200547cb87c2e8.jpg",
    label: "Banners & Signage",
    category: "Signage",
  },
  {
    id: 8,
    src: "https://i.pinimg.com/736x/47/8f/65/478f65f4e87060dee0c94e59d8c45e32.jpg",
    label: "Polaroid Prints",
    category: "Prints",
  },
  {
    id: 9,
    src: "https://i.pinimg.com/1200x/bc/3b/14/bc3b14894e76b28189127589d31a5891.jpg",
    label: "Photo Puzzle Boards",
    category: "Gifts",
  },
];

export const GallerySection = () => {
  const [activeImage, setActiveImage] = useState<(typeof galleryItems)[number] | undefined>();

  return (
    <section id="gallery" className="section-padding bg-[#F8F8F8]">
      <div className="mx-auto max-w-7xl space-y-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#555555]">Our Work</p>
          <h2 className="mt-4 font-display text-3xl text-[#222831] lg:text-4xl font-bold">
            Product Gallery
          </h2>
          <p className="mt-2 text-[#555555]">
            Real photos of our custom printing work and product showcases
          </p>
        </motion.div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.id}
              className="group mb-4 block w-full overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-[#FFD369] hover:shadow-[0_18px_55px_rgba(0,0,0,0.15)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveImage(item)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#222831]/95 px-4 py-3 text-left transition-transform group-hover:translate-y-0">
                  <p className="text-sm font-bold text-[#FFD369]">{item.label}</p>
                  <p className="text-xs text-white/80">{item.category}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#FFD369]/10 to-white px-4 py-3 text-left">
                <p className="text-sm font-bold text-[#222831]">{item.label}</p>
                <p className="text-xs text-[#555555]">{item.category}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Modal isOpen={!!activeImage} onClose={() => setActiveImage(undefined)}>
        {activeImage && (
          <div className="space-y-3">
            <Image
              src={activeImage.src}
              alt={activeImage.label}
              width={1200}
              height={1000}
              className="h-[60vh] w-full rounded-2xl object-cover"
            />
            <div>
              <p className="text-center text-lg font-bold text-[#222831]">{activeImage.label}</p>
              <p className="text-center text-sm text-[white]">{activeImage.category}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/lib/products";

type ImageGalleryProps = {
  images: ProductImage[];
  productTitle: string;
};

export const ImageGallery = ({ images, productTitle }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const mainImageRef = useRef<HTMLDivElement>(null);
  const selectedImage = images[selectedIndex];

  return (
    <div className="w-full space-y-3">

      {/* Smaller Main Image */}
      <div
        ref={mainImageRef}
        className="relative w-full aspect-[4/5] max-h-[350px] overflow-hidden rounded-2xl border border-gray-200"
      >
        <img
          src={selectedImage.url}
          alt={selectedImage.alt || productTitle}
          className={cn(
            "w-full h-full object-cover duration-300 transition-transform",
            isZoomed && "scale-150 cursor-zoom-out",
            !isZoomed && "cursor-zoom-in"
          )}
        />

        {/* Smaller Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-3 right-3 bg-black/40 p-1.5 rounded-full text-white text-xs"
        >
          {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
        </button>

        {/* Small Real Badge */}
        {selectedImage.type === "real" && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] px-2 py-[2px] rounded-full">
            Real Photo
          </span>
        )}

        {/* Smaller Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 p-1.5 rounded-full text-white text-xs disabled:opacity-30"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              onClick={() => setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === images.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 p-1.5 rounded-full text-white text-xs disabled:opacity-30"
            >
              <ChevronRight size={14} />
            </button>

            {/* Smaller Counter */}
            <div className="absolute bottom-2 left-1/2 text-[11px] px-2 py-1 bg-black/40 text-white rounded-full -translate-x-1/2">
              {selectedIndex + 1}/{images.length}
            </div>
          </>
        )}
      </div>

      {/* Smaller Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "border-2 rounded-md overflow-hidden transition-all",
                selectedIndex === i ? "border-[#FFB800]" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={img.url}
                className="h-14 w-14 object-cover rounded-[6px]"
                alt=""
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

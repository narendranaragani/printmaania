"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type AdBanner = {
  id: string;
  title: string;
  subtitle?: string;
  link?: string;
  bgGradient: string;
};

const ads: AdBanner[] = [
  {
    id: "1",
    title: "🔥 Festive Sale",
    subtitle: "Special discounts on all products. Limited time offer!",
    link: "/products",
    bgGradient: "from-red-600 to-orange-600",
  },
  {
    id: "2",
    title: "🎉 Flat 10% Off On Hoodies",
    subtitle: "Get your favorite hoodies at discounted prices",
    link: "/products/hoodies",
    bgGradient: "from-purple-600 to-pink-600",
  },
  {
    id: "3",
    title: "💼 Corporate Bulk Orders Discounts",
    subtitle: "Special pricing for bulk orders above 25 units",
    link: "/order",
    bgGradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "4",
    title: "🛍 Buy 2 Get 1 Free Deals",
    subtitle: "Amazing combo offers on select products",
    link: "/products",
    bgGradient: "from-green-600 to-emerald-600",
  },
];

export const SlidingAdsBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentAd = ads[currentIndex];

  const nextAd = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const content = (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex-1 text-center">
        <h3 className="text-2xl font-bold text-white">{currentAd.title}</h3>
        {currentAd.subtitle && (
          <p className="mt-1 text-sm text-white/90">{currentAd.subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-base-dark py-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`relative bg-gradient-to-r ${currentAd.bgGradient}`}
        >
          {/* Close Button */}
         

          {/* Navigation Arrows */}
          <button
            onClick={prevAd}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextAd}
            className="absolute right-12 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Ad Content */}
          {currentAd.link ? (
            <Link href={currentAd.link} className="block">
              {content}
            </Link>
          ) : (
            content
          )}

          {/* Indicator Dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};


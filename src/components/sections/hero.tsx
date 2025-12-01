"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
            PrintMaania Studios
          </p>
          <div>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              PrintMaania: <span className="text-accent">Your World</span>, Customized.
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/70 lg:text-lg">
              Premium custom T-shirts, mugs, banners, and corporate gifting with concierge-level
              support. Built for fast approvals, bulk-ready ops, and WhatsApp-first ordering.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/order">
              <Button>Start Your Order</Button>
            </Link>
            <Link href="#services">
              <Button variant="secondary">View All Categories</Button>
            </Link>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <div>
              <p className="text-3xl font-semibold text-white">700+</p>
              <p>Brand activations</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">24h</p>
              <p>Mockup delivery</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HeroCanvas />
        </motion.div>
      </div>
    </section>
  );
};


"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CtaSection = () => {
  return (
    <section className="section-padding">
      <motion.div
        className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[40px] border border-white/10 bg-gradient-to-r from-primary/70 via-primary/60 to-accent/60 p-10 text-center text-white shadow-soft"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">ARC Print inspired</p>
        <h3 className="text-3xl font-display">Let&apos;s build merch that converts browsers to buyers.</h3>
        <p className="text-white/80">
          Send us your brand kit, inspiration Pinterest boards, or even scribbles—we&apos;ll handle
          the rest and keep you updated every step of the way.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <a href="/order">Launch Order Desk</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#services">Browse Categories</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};


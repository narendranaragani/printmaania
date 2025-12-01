"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-6 rounded-[32px] border border-white/10 bg-grid-pattern bg-[length:32px_32px] p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">About PrintMaania</p>
          <h2 className="font-display text-3xl text-white lg:text-4xl">
            We turn ambitious ideas into merch that people keep, wear, and post about.
          </h2>
          <p className="text-white/70">
            From single-piece surprises to 5,000-piece corporate drops, PrintMaania handles
            everything—design proofing, premium fabrics, UV printing, QC, and tracked delivery.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "AVERAGE NPS", value: "92" },
              { label: "ON-TIME SHIPMENTS", value: "99%" },
            ].map((item) => (
              <div key={item.label} className="glass-panel p-6 text-center">
                <p className="text-sm text-white/50">{item.label}</p>
                <p className="mt-2 text-3xl font-semibold text-accent">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="h-full space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">Mission</p>
            <p className="text-lg text-white/80">
              Build an ARC Print-inspired experience that feels modern, mobile-first, and frictionless.
              Every CTA nudges visitors to WhatsApp, where a real strategist picks up within minutes.
            </p>
            <p className="text-sm text-white/60">
              • Bulk concierge desk • Sample packs in 72h • Pan-India shipping • Dedicated artwork review
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

